import "server-only";
import { SITE } from "./site";

/**
 * Transactional email through Resend, over plain fetch rather than the
 * SDK — one less dependency for two endpoints.
 */

const RESEND_ENDPOINT = "https://api.resend.com/emails";

export function isMailConfigured(): boolean {
  return Boolean(process.env.RESEND_API_KEY && process.env.RESEND_FROM);
}

type SendInput = {
  to: string;
  subject: string;
  text: string;
  replyTo?: string;
};

export async function sendMail({ to, subject, text, replyTo }: SendInput): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM;
  if (!apiKey || !from) {
    throw new Error("RESEND_API_KEY and RESEND_FROM must both be set");
  }

  const response = await fetch(RESEND_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      subject,
      text,
      ...(replyTo ? { reply_to: replyTo } : {}),
    }),
    // A hung mail provider must not hold a Server Action open.
    signal: AbortSignal.timeout(10_000),
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    throw new Error(`Resend responded ${response.status}: ${detail.slice(0, 500)}`);
  }
}

export function contactNotification(input: {
  name: string;
  email: string;
  phone: string;
  company: string | null;
  message: string;
  role: string | null;
  source: string;
}): { subject: string; text: string } {
  const role = input.role ? ` · ${input.role}` : "";
  return {
    subject: `Website enquiry — ${input.name}${role}`,
    text: [
      `New enquiry from ${SITE.url}${input.source}`,
      "",
      `Name:     ${input.name}`,
      `Email:    ${input.email}`,
      `Phone:    ${input.phone}`,
      `Company:  ${input.company || "—"}`,
      `Role:     ${input.role || "—"}`,
      "",
      "Message:",
      input.message,
    ].join("\n"),
  };
}

export function newsletterConfirmation(confirmUrl: string): {
  subject: string;
  text: string;
} {
  return {
    subject: "Confirm your Yeshara Insights subscription",
    text: [
      "Thanks for signing up to Yeshara Insights.",
      "",
      "Confirm your subscription by opening this link:",
      confirmUrl,
      "",
      "If you did not request this, ignore this email — no subscription is",
      "created until the link above is opened.",
      "",
      SITE.legalName,
      SITE.address.inline,
    ].join("\n"),
  };
}
