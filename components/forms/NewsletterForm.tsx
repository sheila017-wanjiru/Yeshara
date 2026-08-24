"use client";

import Link from "next/link";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { subscribeNewsletter } from "@/app/actions";
import { IDLE_STATE } from "@/lib/validation";
import { Honeypot, FormResult } from "./Field";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="shrink-0 rounded-[10px] bg-tq-300 px-s5 font-display text-[.8125rem] font-bold text-on-tq transition-colors duration-200 hover:bg-tq-200 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending ? "Sending…" : "Subscribe"}
    </button>
  );
}

export function NewsletterForm() {
  const [state, action] = useActionState(subscribeNewsletter, IDLE_STATE);

  return (
    <form action={action} className="mt-s5">
      <span className="mono block text-tx-3">Yeshara Insights — monthly</span>
      <Honeypot />
      <div className="mt-s3 flex gap-s2">
        <label htmlFor="newsletter-email" className="sr-only absolute left-[-9999px]">
          Email address
        </label>
        <input
          id="newsletter-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="Email address"
          aria-invalid={state.errors?.email ? true : undefined}
          className="min-w-0 flex-1 rounded-[10px] border border-border-2 bg-bg px-[14px] py-[11px] font-body text-[.875rem] text-tx placeholder:text-tx-3 focus:border-tq-500 focus:outline-none"
        />
        <SubmitButton />
      </div>
      <FormResult status={state.status} message={state.message} />
      {/* Linked from the form itself — no field collects an address
          without the policy governing it being one click away. */}
      <p className="mt-s3 font-mono text-[.68rem] uppercase leading-[1.9] tracking-[.06em] text-tx-3">
        Double opt-in. Unsubscribe in one click.{" "}
        <Link href="/legal/privacy" className="text-tq-300 underline underline-offset-2">
          Privacy Policy
        </Link>
      </p>
    </form>
  );
}
