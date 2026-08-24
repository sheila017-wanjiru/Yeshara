import { z } from "zod";

/**
 * Every form is validated on the server. Client-side constraints are a
 * convenience; these schemas are the boundary that actually holds.
 */

/** Honeypot: a field a human never sees and never fills. */
export const HONEYPOT_FIELD = "company_website";

const email = z
  .string()
  .trim()
  .min(1, "Email address is required")
  .max(254, "Email address is too long")
  .email("Enter a valid email address");

const name = z
  .string()
  .trim()
  .min(2, "Enter your name")
  .max(120, "Name is too long");

const phone = z
  .string()
  .trim()
  .min(7, "Enter a valid phone number")
  .max(32, "Phone number is too long")
  .regex(/^[+()\d\s-]+$/, "Phone number may only contain digits, spaces, + ( ) and -");

export const contactSchema = z.object({
  name,
  email,
  phone,
  // Company is optional on the contact form.
  company: z.string().trim().max(160, "Company name is too long").optional().or(z.literal("")),
  message: z
    .string()
    .trim()
    .min(10, "Tell us a little more — at least 10 characters")
    .max(4000, "Message is too long"),
  role: z.enum(["investor", "asset-owner"]).optional(),
  [HONEYPOT_FIELD]: z.string().max(0).optional().or(z.literal("")),
});

export const newsletterSchema = z.object({
  email,
  [HONEYPOT_FIELD]: z.string().max(0).optional().or(z.literal("")),
});

export type ContactInput = z.infer<typeof contactSchema>;
export type NewsletterInput = z.infer<typeof newsletterSchema>;

/** Shape returned by every Server Action, consumed by useActionState. */
export type FormState = {
  status: "idle" | "success" | "error";
  message: string;
  /** Field-level errors, keyed by input name. */
  errors?: Record<string, string[]>;
};

export const IDLE_STATE: FormState = { status: "idle", message: "" };
