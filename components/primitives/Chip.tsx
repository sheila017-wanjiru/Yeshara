import type { ReactNode } from "react";

/**
 * The status badge system (§9e) — the site's core credibility
 * mechanism. Every claim on the site carries one of three badges so an
 * analyst can tell at a glance what is tested, what is intended, and
 * what is missing. Colour is always paired with a word; nothing here
 * is conveyed by colour alone.
 *
 *   confirmed   — verifiable from public record
 *   direction   — a stated direction, not a deployment
 *   placeholder — unfilled, awaiting client confirmation
 *
 * Do not remove these to make the site look more polished.
 */
export type ChipTone = "neutral" | "brand" | "confirmed" | "placeholder";

const TONE: Record<ChipTone, string> = {
  neutral: "border-border-2 text-tx-2 bg-white/[.015]",
  brand: "border-tq-500/35 text-tq-300 bg-tq-500/[.07]",
  confirmed: "border-pos/35 text-pos bg-pos/[.08]",
  placeholder: "border-warn/35 text-warn bg-warn/[.08]",
};

export function Chip({
  tone = "neutral",
  children,
  className = "",
}: {
  tone?: ChipTone;
  children: ReactNode;
  className?: string;
}) {
  return (
    // min-height, never a fixed height: a chip whose text wraps must
    // grow rather than crop.
    <span
      className={`inline-flex min-h-7 items-center gap-[7px] whitespace-normal rounded-chip border px-3 py-[5px] font-mono text-[.6875rem] font-medium uppercase leading-[1.5] tracking-[.1em] ${TONE[tone]} ${className}`}
    >
      <span
        aria-hidden="true"
        className="h-[5px] w-[5px] shrink-0 rounded-full bg-current"
      />
      {children}
    </span>
  );
}

/**
 * An unfilled fact. Renders visibly in amber — never silently omitted
 * and never replaced with invented copy (§3, §9c).
 */
export function Placeholder({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`flex min-h-[74px] items-center justify-center break-words rounded-sm2 border border-dashed border-warn/35 bg-warn/[.05] p-s4 text-center font-mono text-[.72rem] leading-[2] tracking-[.08em] text-warn ${className}`}
    >
      {children}
    </div>
  );
}

/** Inline placeholder, for a single missing value inside a sentence. */
export function InlinePlaceholder({ children }: { children: ReactNode }) {
  return (
    <span className="font-mono text-[.78rem] tracking-[.06em] text-warn">
      [{children}]
    </span>
  );
}
