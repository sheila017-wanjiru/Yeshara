import type { ReactNode } from "react";
import { Chip, type ChipTone } from "@/components/primitives/Chip";

/**
 * A bulleted list with the small teal square marker. tq-500 is the
 * marks-and-fills step; it never carries a word.
 */
export function MarkerList({
  items,
  ruled = false,
}: {
  items: readonly string[];
  ruled?: boolean;
}) {
  return (
    <ul className="mt-s5 list-none p-0">
      {items.map((item) => (
        <li
          key={item}
          className={`grid grid-cols-[14px_1fr] gap-s3 py-[10px] text-[.875rem] leading-[1.55] text-tx-2 ${
            ruled ? "border-t border-border-1" : ""
          }`}
        >
          <span
            aria-hidden="true"
            className="mt-2 h-[6px] w-[6px] rounded-[2px] bg-tq-500"
          />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

/** Home's three "what we do" pillars. */
export function PillarCard({
  icon,
  title,
  body,
  points,
}: {
  icon: ReactNode;
  title: string;
  body: string;
  points: readonly string[];
}) {
  return (
    <article className="rounded-[20px] border border-border-1 bg-[linear-gradient(180deg,#101A1B_0%,#060D0E_100%)] px-s6 py-s7 transition-[border-color,transform,box-shadow] duration-[250ms] elev hover:-translate-y-1 hover:border-tq-600 elev-h">
      <span className="block h-[38px] w-[38px] text-tq-500">{icon}</span>
      <h3 className="mt-s5 font-display text-[1.18rem] font-bold tracking-[-.026em]">
        {title}
      </h3>
      <p className="mt-s3 text-[.9rem] leading-[1.6] text-tx-2">{body}</p>
      <MarkerList items={points} ruled />
    </article>
  );
}

/**
 * An asset class. The status chip is the credibility mechanism: real
 * estate is in sandbox testing, financial instruments are a stated
 * direction. The distinction is the point.
 */
export function AssetClassCard({
  icon,
  status,
  statusTone,
  title,
  body,
  points,
}: {
  icon: ReactNode;
  status: string;
  statusTone: ChipTone;
  title: string;
  body: string;
  points: readonly string[];
}) {
  return (
    <article className="rounded-[20px] border border-border-1 bg-[linear-gradient(180deg,#101A1B_0%,#060D0E_100%)] px-s6 py-s7 transition-[border-color,box-shadow] duration-[250ms] elev hover:border-tq-600 elev-h">
      <span className="block h-10 w-10 text-tq-500">{icon}</span>
      <div className="mt-s5">
        <Chip tone={statusTone}>{status}</Chip>
      </div>
      <h3 className="d3 mt-s4">{title}</h3>
      <p className="bd mt-s3">{body}</p>
      <MarkerList items={points} ruled />
    </article>
  );
}

/** The three-party role cards. */
export function RoleCard({
  name,
  accent,
  role,
  duties,
}: {
  name: string;
  accent: "clay" | "teal" | "gold";
  role: string;
  duties: readonly string[];
}) {
  // Each accent is a state colour from the token block, used as a
  // tinted identity tag rather than as body colour.
  const TAG: Record<typeof accent, string> = {
    clay: "bg-clay/[.12] text-clay border-clay/35",
    teal: "bg-tq-500/[.12] text-tq-300 border-tq-500/35",
    gold: "bg-gold/[.12] text-gold border-gold/35",
  };

  return (
    <article className="rounded-card border border-border-1 bg-surface px-s5 py-s6 transition-[border-color,transform,box-shadow] duration-[250ms] elev hover:-translate-y-1 hover:border-tq-600 elev-h">
      <span
        className={`inline-flex min-h-[26px] items-center rounded-[7px] border px-[11px] py-1 font-mono text-[.6875rem] uppercase leading-[1.5] tracking-[.09em] ${TAG[accent]}`}
      >
        {name}
      </span>
      <p className="h4 mt-s4">{role}</p>
      <ul className="mt-s4 list-none p-0">
        {duties.map((duty) => (
          <li
            key={duty}
            className="border-t border-border-1 py-[9px] text-[.875rem] text-tx-2"
          >
            {duty}
          </li>
        ))}
      </ul>
    </article>
  );
}

/** A short value proposition tile. */
export function ValueProp({
  icon,
  title,
  body,
}: {
  icon: ReactNode;
  title: string;
  body: string;
}) {
  return (
    <div className="bg-bg-2 p-s5 elev">
      <span className="block h-6 w-6 text-tq-500">{icon}</span>
      <b className="mt-s4 block font-display text-[1rem] font-bold tracking-[-.02em]">
        {title}
      </b>
      <p className="mt-[7px] text-[.875rem] leading-[1.58] text-tx-2">{body}</p>
    </div>
  );
}

/** A pulled quote. tq-500 rule, never teal on the words themselves. */
export function PullQuote({
  children,
  attribution,
}: {
  children: ReactNode;
  attribution: ReactNode;
}) {
  return (
    <blockquote className="mt-s7 max-w-[62ch] border-l-2 border-tq-500 py-s3 pl-s6">
      <p className="m-0 font-display text-[clamp(1.16rem,1.9vw,1.46rem)] font-semibold leading-[1.44] tracking-[-.022em] text-tx">
        {children}
      </p>
      <footer className="mono mt-s4 block text-tx-3">{attribution}</footer>
    </blockquote>
  );
}
