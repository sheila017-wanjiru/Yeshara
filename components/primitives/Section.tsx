import type { ReactNode } from "react";

export function Wrap({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`mx-auto w-full max-w-[var(--maxw)] px-s4 sm:px-s5 ${className}`}
    >
      {children}
    </div>
  );
}

/**
 * A page section. `band` tints the ground and edges it with tq-900 —
 * the step reserved for section edges and tinted rules.
 */
export function Section({
  children,
  id,
  band = false,
  className = "",
  labelledBy,
}: {
  children: ReactNode;
  id?: string;
  band?: boolean;
  className?: string;
  labelledBy?: string;
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={`relative py-s8 lg:py-s9 ${
        band
          ? "border-y border-tq-900 bg-[linear-gradient(180deg,#050B0C_0%,#02090A_100%)]"
          : ""
      } ${className}`}
    >
      <Wrap>{children}</Wrap>
    </section>
  );
}

/** The small teal rule-and-label above a section heading. */
export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="mono inline-flex items-center gap-s3 text-tq-300">
      <span
        aria-hidden="true"
        className="h-[2px] w-[18px] rounded-[1px] bg-[linear-gradient(90deg,var(--tq-300),var(--tq-700))]"
      />
      {children}
    </span>
  );
}

/**
 * Section heading block. `id` is wired to the section's aria-labelledby
 * so the landmark is named by its own heading.
 */
export function SectionHeader({
  eyebrow,
  title,
  lead,
  id,
  as: As = "h2",
  className = "",
}: {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  id?: string;
  as?: "h1" | "h2";
  className?: string;
}) {
  return (
    <div className={`max-w-[660px] ${className}`}>
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <As id={id} className={`${As === "h1" ? "d1" : "d2"} mt-s4`}>
        {title}
      </As>
      {lead ? <p className="lead mt-s4">{lead}</p> : null}
    </div>
  );
}

/**
 * A visible source line. Every published figure carries one — the
 * previous homepage ran six market-size statistics with no citation
 * and one of them off by a factor of twenty-five.
 */
export function SourceNote({ children }: { children: ReactNode }) {
  return (
    <p className="mt-s5 block max-w-[94ch] font-mono text-[.7rem] uppercase leading-[2] tracking-[.07em] text-tx-3">
      {children}
    </p>
  );
}

export function Rule({ className = "" }: { className?: string }) {
  return (
    <hr
      className={`h-px border-0 bg-[linear-gradient(90deg,transparent,var(--tq-900)_18%,var(--tq-900)_82%,transparent)] ${className}`}
    />
  );
}
