import type { ReactNode } from "react";
import { Wrap } from "@/components/primitives/Section";
import { Eyebrow } from "@/components/primitives/Section";

/**
 * The standard top-of-page block for every route other than Home.
 * Exactly one h1 per page, and it lives here.
 */
export function PageHero({
  eyebrow,
  title,
  lead,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden pb-s8 pt-[calc(var(--nav-h)+72px)] lg:pt-[calc(var(--nav-h)+92px)]">
      <div
        aria-hidden="true"
        data-print="hide"
        className="pointer-events-none absolute -right-[180px] -top-[240px] h-[720px] w-[900px] bg-[radial-gradient(ellipse_46%_44%_at_52%_46%,rgba(132,214,216,.11),transparent_70%),radial-gradient(ellipse_62%_58%_at_50%_50%,rgba(82,185,188,.09),transparent_68%)]"
      />
      <Wrap className="relative">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 className="d1 mt-s5 max-w-[18ch]">{title}</h1>
        {lead ? <p className="lead mt-s5 max-w-[62ch]">{lead}</p> : null}
        {children}
      </Wrap>
    </section>
  );
}
