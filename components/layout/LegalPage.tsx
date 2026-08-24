import Link from "next/link";
import type { ReactNode } from "react";
import { Wrap } from "@/components/primitives/Section";
import { Chip } from "@/components/primitives/Chip";
import { FOOTER_NAV } from "@/lib/site";

/**
 * Shared shell for the four legal pages. Each is a separate page at a
 * separate URL — the previous site served Terms and Privacy from one
 * anchor containing only Terms text.
 */
export function LegalPage({
  title,
  updated,
  summary,
  currentPath,
  children,
}: {
  title: string;
  updated: string;
  summary: string;
  currentPath: string;
  children: ReactNode;
}) {
  return (
    <>
      <section className="pb-s7 pt-[calc(var(--nav-h)+64px)]">
        <Wrap>
          <nav aria-label="Breadcrumb" className="mono text-tx-3">
            <Link href="/" className="transition-colors hover:text-tq-300">
              Home
            </Link>
            <span aria-hidden="true"> / </span>
            <span className="text-tx-2">Legal</span>
          </nav>
          <h1 className="d1 mt-s4 max-w-[16ch]">{title}</h1>
          <p className="lead mt-s5 max-w-[62ch]">{summary}</p>
          <p className="mono mt-s5 text-tx-3">Last updated {updated}</p>
        </Wrap>
      </section>

      <section className="border-t border-border-1 py-s8">
        <Wrap>
          <div className="grid gap-s8 lg:grid-cols-[220px_1fr]">
            <nav aria-label="Legal pages" className="lg:sticky lg:top-[calc(var(--nav-h)+30px)] lg:self-start">
              <span className="mono mb-s4 block text-tx">Legal</span>
              {FOOTER_NAV.legal.map((link) => {
                const active = link.href === currentPath;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={`block border-l-2 py-[9px] pl-s4 text-[.875rem] transition-colors duration-200 ${
                      active
                        ? "border-tq-500 text-tq-300"
                        : "border-border-1 text-tx-2 hover:border-border-3 hover:text-tx"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            <div className="prose">{children}</div>
          </div>
        </Wrap>
      </section>
    </>
  );
}

/**
 * The statutory-status note that heads the Terms and Risk pages.
 * Sandbox admission is a supervised test, not a licence — stated in
 * exactly those words wherever the regulatory position comes up.
 */
export function SandboxNote() {
  return (
    <div className="mb-s6 rounded-card border border-border-1 bg-surface p-s5 elev">
      <Chip tone="confirmed">Confirmed — CMA public record</Chip>
      <p className="bd mt-s4">
        Yeshara Tokens Limited was admitted to the Capital Markets Authority
        Regulatory Sandbox in December 2024 for a twelve-month test of a
        blockchain-enabled real estate tokenization platform.{" "}
        <strong className="text-tx-1">
          Sandbox admission is a supervised test, not a licence.
        </strong>
      </p>
    </div>
  );
}
