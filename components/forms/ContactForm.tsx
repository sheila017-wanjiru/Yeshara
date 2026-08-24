"use client";

import Link from "next/link";
import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";
import { submitContact } from "@/app/actions";
import { IDLE_STATE } from "@/lib/validation";
import { ROLES, type RoleValue } from "@/lib/site";
import { Button } from "@/components/primitives/Button";
import { Field, TextArea, Honeypot, FormResult } from "./Field";
import { PersonIcon, OwnerIcon } from "@/components/primitives/Icons";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" fullWidth withArrow={!pending} disabled={pending} className="mt-s5">
      {pending ? "Sending…" : "Get Started"}
    </Button>
  );
}

/**
 * The contact and get-started form.
 *
 * When `withRoleSelector` is set, choosing a role rewrites the form
 * heading and the message prompt — the platform recognises exactly two
 * roles, Investor and Seller (Asset Owner), and asking an asset owner
 * "what are you looking for?" wastes the only question that matters.
 */
export function ContactForm({
  source,
  withRoleSelector = false,
  heading,
}: {
  source: string;
  withRoleSelector?: boolean;
  heading?: string;
}) {
  const [state, action] = useActionState(submitContact, IDLE_STATE);
  const [role, setRole] = useState<RoleValue>("investor");
  const active = ROLES.find((r) => r.value === role) ?? ROLES[0];

  return (
    <div>
      {withRoleSelector ? (
        <fieldset className="mb-s6 border-0 p-0">
          <legend className="mono mb-s3 text-tq-300">Step 01 — Choose your role</legend>
          <p className="bd mb-s4 max-w-[44ch]">
            The platform recognises two roles. Pick the one that describes you
            and the form adjusts.
          </p>
          <div className="grid gap-s3">
            {ROLES.map((option) => {
              const Icon = option.value === "investor" ? PersonIcon : OwnerIcon;
              const selected = role === option.value;
              return (
                <label
                  key={option.value}
                  className={`grid cursor-pointer grid-cols-[auto_1fr_auto] items-center gap-s4 rounded-card border p-s5 text-left transition-[border-color,background-color] duration-200 has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-tq-300 ${
                    selected
                      ? "border-tq-500 bg-tq-500/[.07]"
                      : "border-border-2 bg-surface hover:border-tq-500/35 hover:bg-surface-2"
                  }`}
                >
                  {/* A real radio group: arrow keys move between the
                      options and the value posts with the form. */}
                  <input
                    type="radio"
                    name="role"
                    value={option.value}
                    checked={selected}
                    onChange={() => setRole(option.value)}
                    className="sr-only absolute h-px w-px overflow-hidden opacity-0"
                  />
                  <span className="block h-[26px] w-[26px] text-tq-500">
                    <Icon />
                  </span>
                  <span>
                    <b className="block font-display text-[1rem] font-bold tracking-[-.02em]">
                      {option.label}
                    </b>
                    <span className="mt-1 block text-[.875rem] leading-[1.5] text-tx-2">
                      {option.blurb}
                    </span>
                  </span>
                  <span
                    aria-hidden="true"
                    className={`grid h-[22px] w-[22px] shrink-0 place-items-center rounded-full border text-[.75rem] ${
                      selected
                        ? "border-tq-500 bg-tq-500 text-on-tq"
                        : "border-border-2 text-transparent"
                    }`}
                  >
                    ✓
                  </span>
                </label>
              );
            })}
          </div>
        </fieldset>
      ) : null}

      <form action={action} className="rounded-[20px] border border-border-1 bg-surface p-s6 elev">
        {withRoleSelector ? (
          <span className="mono text-tq-300">Step 02 — Tell us about it</span>
        ) : null}
        <h2 className="d3 mt-s3">
          {heading ?? (withRoleSelector ? active.formTitle : "Send us a message")}
        </h2>

        <Honeypot />
        <input type="hidden" name="source" value={source} />
        {!withRoleSelector ? null : <input type="hidden" name="role" value={role} />}

        {/* Field order and labels exactly as specified. */}
        <Field
          id="name"
          label="Your name"
          placeholder="Full name"
          required
          autoComplete="name"
          errors={state.errors?.name}
        />
        <Field
          id="email"
          label="Email address"
          type="email"
          placeholder="you@company.com"
          required
          autoComplete="email"
          errors={state.errors?.email}
        />
        <Field
          id="phone"
          label="Phone number"
          type="tel"
          placeholder="+254"
          required
          autoComplete="tel"
          errors={state.errors?.phone}
        />
        <Field
          id="company"
          label="Company name"
          autoComplete="organization"
          errors={state.errors?.company}
        />
        <TextArea
          id="message"
          label={withRoleSelector ? active.messageLabel : "Message"}
          placeholder={
            withRoleSelector ? active.messagePrompt : "What would you like to discuss?"
          }
          required
          errors={state.errors?.message}
        />

        <SubmitButton />
        <FormResult status={state.status} message={state.message} />

        {/* The policy governing this data is one click away from the
            field that collects it. */}
        <p className="mono mt-s4 leading-[1.9] text-tx-3">
          By sending this you agree to our{" "}
          <Link href="/legal/privacy" className="text-tq-300 underline underline-offset-2">
            Privacy Policy
          </Link>
          . We reply within two business days.
        </p>
      </form>
    </div>
  );
}
