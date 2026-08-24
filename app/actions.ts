"use server";

import { randomBytes } from "node:crypto";
import { headers } from "next/headers";
import { contactSchema, newsletterSchema, HONEYPOT_FIELD, type FormState } from "@/lib/validation";
import { clientKey, rateLimit } from "@/lib/rate-limit";
import { isDatabaseConfigured, saveContactSubmission, saveNewsletterSignup } from "@/lib/db";
import {
  contactNotification,
  isMailConfigured,
  newsletterConfirmation,
  sendMail,
} from "@/lib/mailer";
import { SITE } from "@/lib/site";
import { absoluteUrl } from "@/lib/seo";

/**
 * A submission that cannot be stored or delivered must not report
 * success. Telling someone their message was sent when nothing was
 * written and nothing was emailed is the single worst failure mode a
 * contact form has, so an unconfigured environment surfaces the direct
 * email address instead.
 */
const UNAVAILABLE: FormState = {
  status: "error",
  message: `We could not deliver that just now. Please email ${SITE.email} directly and we will pick it up.`,
};

function fieldErrors(error: { issues: { path: PropertyKey[]; message: string }[] }) {
  const out: Record<string, string[]> = {};
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? "form");
    (out[key] ??= []).push(issue.message);
  }
  return out;
}

export async function submitContact(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  const requestHeaders = await headers();

  // Honeypot first: a filled hidden field is a bot, and it gets the
  // same shaped response a human gets so the probe learns nothing.
  if (String(formData.get(HONEYPOT_FIELD) ?? "").length > 0) {
    return { status: "success", message: "Thank you — we will be in touch shortly." };
  }

  const limit = rateLimit(clientKey(requestHeaders, "contact"), {
    limit: 5,
    windowMs: 10 * 60 * 1000,
  });
  if (!limit.ok) {
    return {
      status: "error",
      message: `Too many submissions. Try again in about ${Math.ceil(limit.retryAfterSeconds / 60)} minutes.`,
    };
  }

  const parsed = contactSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    company: formData.get("company") ?? "",
    message: formData.get("message"),
    role: formData.get("role") || undefined,
    [HONEYPOT_FIELD]: formData.get(HONEYPOT_FIELD) ?? "",
  });

  if (!parsed.success) {
    return {
      status: "error",
      message: "Please correct the highlighted fields.",
      errors: fieldErrors(parsed.error),
    };
  }

  const source = String(formData.get("source") ?? "/contact");
  const record = {
    name: parsed.data.name,
    email: parsed.data.email,
    phone: parsed.data.phone,
    company: parsed.data.company || null,
    message: parsed.data.message,
    role: parsed.data.role ?? null,
    source,
    userAgent: requestHeaders.get("user-agent"),
  };

  if (!isDatabaseConfigured() && !isMailConfigured()) {
    console.error("[contact] neither DATABASE_URL nor RESEND_API_KEY configured");
    return UNAVAILABLE;
  }

  // Persistence and notification are independent: if the mail provider
  // is down we still keep the enquiry, and vice versa. The submission
  // only fails if both routes fail.
  let stored = false;
  let notified = false;

  if (isDatabaseConfigured()) {
    try {
      await saveContactSubmission(record);
      stored = true;
    } catch (error) {
      console.error("[contact] database write failed", error);
    }
  }

  if (isMailConfigured()) {
    try {
      const mail = contactNotification(record);
      await sendMail({
        to: SITE.email,
        subject: mail.subject,
        text: mail.text,
        replyTo: record.email,
      });
      notified = true;
    } catch (error) {
      console.error("[contact] notification email failed", error);
    }
  }

  if (!stored && !notified) return UNAVAILABLE;

  return {
    status: "success",
    message: "Thank you — your message has reached us. We reply within two business days.",
  };
}

export async function subscribeNewsletter(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  const requestHeaders = await headers();

  if (String(formData.get(HONEYPOT_FIELD) ?? "").length > 0) {
    return { status: "success", message: "Check your inbox to confirm." };
  }

  const limit = rateLimit(clientKey(requestHeaders, "newsletter"), {
    limit: 5,
    windowMs: 10 * 60 * 1000,
  });
  if (!limit.ok) {
    return { status: "error", message: "Too many attempts. Try again shortly." };
  }

  const parsed = newsletterSchema.safeParse({
    email: formData.get("email"),
    [HONEYPOT_FIELD]: formData.get(HONEYPOT_FIELD) ?? "",
  });

  if (!parsed.success) {
    return {
      status: "error",
      message: "Enter a valid email address.",
      errors: fieldErrors(parsed.error),
    };
  }

  // Double opt-in requires both halves: somewhere to hold the pending
  // row, and a way to send the confirmation. Neither is optional.
  if (!isDatabaseConfigured() || !isMailConfigured()) {
    console.error("[newsletter] DATABASE_URL and RESEND_API_KEY are both required");
    return {
      status: "error",
      message: `Sign-up is unavailable just now. Email ${SITE.email} and we will add you.`,
    };
  }

  const confirmToken = randomBytes(32).toString("base64url");
  const unsubscribeToken = randomBytes(32).toString("base64url");

  try {
    await saveNewsletterSignup({
      email: parsed.data.email,
      confirmToken,
      unsubscribeToken,
    });
    const mail = newsletterConfirmation(
      absoluteUrl(`/newsletter/confirm?token=${confirmToken}`),
    );
    await sendMail({ to: parsed.data.email, subject: mail.subject, text: mail.text });
  } catch (error) {
    console.error("[newsletter] signup failed", error);
    return {
      status: "error",
      message: `Sign-up failed. Email ${SITE.email} and we will add you.`,
    };
  }

  return {
    status: "success",
    // Deliberately does not confirm whether the address was already on
    // the list — that would let the form be used to test addresses.
    message: "Almost there — open the confirmation link we just emailed you.",
  };
}
