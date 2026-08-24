"use client";

import type { ReactNode } from "react";
import { HONEYPOT_FIELD } from "@/lib/validation";

const CONTROL =
  "w-full rounded-[10px] border border-border-2 bg-bg-2 px-[15px] py-[13px] font-body " +
  "text-[.9375rem] text-tx transition-colors duration-200 placeholder:text-tx-3 " +
  "focus:border-tq-500 focus:outline-none";

export function Field({
  id,
  label,
  type = "text",
  placeholder,
  required = false,
  autoComplete,
  errors,
  defaultValue,
}: {
  id: string;
  label: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  autoComplete?: string;
  errors?: string[];
  defaultValue?: string;
}) {
  const errorId = `${id}-error`;
  const hasError = Boolean(errors?.length);
  return (
    <div className="mt-s4">
      <label
        htmlFor={id}
        className="mb-2 block font-mono text-[.72rem] uppercase tracking-[.09em] text-tx-2"
      >
        {label}
        {required ? (
          <span className="text-tq-300"> *</span>
        ) : (
          <span className="text-tx-3"> (optional)</span>
        )}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        placeholder={placeholder}
        required={required}
        autoComplete={autoComplete}
        defaultValue={defaultValue}
        aria-invalid={hasError || undefined}
        aria-describedby={hasError ? errorId : undefined}
        className={`${CONTROL} ${hasError ? "border-neg" : ""}`}
      />
      {hasError ? (
        <p id={errorId} className="mt-2 text-[.8125rem] text-neg">
          {errors?.[0]}
        </p>
      ) : null}
    </div>
  );
}

export function TextArea({
  id,
  label,
  placeholder,
  required = false,
  errors,
}: {
  id: string;
  label: ReactNode;
  placeholder?: string;
  required?: boolean;
  errors?: string[];
}) {
  const errorId = `${id}-error`;
  const hasError = Boolean(errors?.length);
  return (
    <div className="mt-s4">
      <label
        htmlFor={id}
        className="mb-2 block font-mono text-[.72rem] uppercase tracking-[.09em] text-tx-2"
      >
        {label}
        {required ? <span className="text-tq-300"> *</span> : null}
      </label>
      <textarea
        id={id}
        name={id}
        placeholder={placeholder}
        required={required}
        rows={4}
        aria-invalid={hasError || undefined}
        aria-describedby={hasError ? errorId : undefined}
        className={`${CONTROL} min-h-[104px] resize-y ${hasError ? "border-neg" : ""}`}
      />
      {hasError ? (
        <p id={errorId} className="mt-2 text-[.8125rem] text-neg">
          {errors?.[0]}
        </p>
      ) : null}
    </div>
  );
}

/**
 * The honeypot. Hidden from sight, from assistive technology and from
 * the tab order — a human never encounters it, so anything filling it
 * is automated. This replaces a CAPTCHA entirely.
 */
export function Honeypot() {
  return (
    <div aria-hidden="true" className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden">
      <label htmlFor={HONEYPOT_FIELD}>Do not fill this in</label>
      <input
        id={HONEYPOT_FIELD}
        name={HONEYPOT_FIELD}
        type="text"
        tabIndex={-1}
        autoComplete="off"
        defaultValue=""
      />
    </div>
  );
}

/**
 * Result banner. Announced politely so a screen-reader user hears the
 * outcome without the focus being yanked.
 */
export function FormResult({
  status,
  message,
}: {
  status: "idle" | "success" | "error";
  message: string;
}) {
  return (
    <div role="status" aria-live="polite" className={message ? "mt-s4" : ""}>
      {message ? (
        <p
          className={`rounded-sm2 border px-s4 py-s3 text-[.875rem] leading-relaxed ${
            status === "success"
              ? "border-pos/35 bg-pos/[.08] text-pos"
              : "border-neg/40 bg-neg/[.08] text-neg"
          }`}
        >
          {message}
        </p>
      ) : null}
    </div>
  );
}
