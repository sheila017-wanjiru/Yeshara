"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { NAV_LINKS } from "@/lib/site";
import { ButtonLink } from "@/components/primitives/Button";
import { Logo } from "./Logo";

/**
 * Pill nav, 64px, sticky, collapsing to a drawer at 1080px. Below that
 * width the seven uppercase items compress to the point of
 * illegibility, so the breakpoint sits higher than the usual 940.
 *
 * This is a client component for the drawer and the stuck state, but it
 * still server-renders: the nav links are present as real <a href> in
 * the HTML with JavaScript disabled.
 */
export function SiteHeader() {
  const pathname = usePathname();
  const [stuck, setStuck] = useState(false);
  const [open, setOpen] = useState(false);
  const burgerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close on route change so the drawer never survives a navigation.
  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Escape closes the drawer and returns focus to the control that
  // opened it.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        burgerRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const isCurrent = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <header
        data-print="hide"
        className="fixed inset-x-0 top-4 z-[120]"
      >
        <div className="mx-auto w-full max-w-[var(--maxw)] px-s4 sm:px-s5">
          <div
            className={`flex h-[var(--nav-h)] items-center rounded-nav border py-0 pl-s5 pr-[10px] backdrop-blur-[20px] backdrop-saturate-150 transition-[background-color,border-color,box-shadow] duration-300 ${
              stuck
                ? "border-border-2 bg-[rgba(4,5,6,.94)] shadow-[0_16px_50px_-26px_var(--bg)]"
                : "border-border-1 bg-[rgba(9,11,12,.76)]"
            }`}
          >
            <Logo />

            <nav
              aria-label="Primary"
              className="ml-s5 hidden items-center gap-[2px] nav:flex xl:ml-s7"
            >
              {NAV_LINKS.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  aria-current={isCurrent(l.href) ? "page" : undefined}
                  className={`whitespace-nowrap rounded-[10px] px-[9px] py-[9px] font-display text-[.72rem] font-semibold uppercase tracking-[.05em] transition-[color,background-color] duration-200 hover:bg-white/5 hover:text-tx xl:px-[11px] xl:text-[.74rem] xl:tracking-[.07em] ${
                    isCurrent(l.href) ? "text-tq-300" : "text-tx-2"
                  }`}
                >
                  {l.label}
                </Link>
              ))}
            </nav>

            <div className="min-w-s4 flex-1" />

            <div className="flex items-center gap-s3">
              <Link
                href="/sign-in"
                className="hidden px-s3 font-display text-[.8125rem] font-semibold text-tx-2 transition-colors duration-200 hover:text-tq-300 nav:block"
              >
                Sign In
              </Link>
              <ButtonLink href="/get-started" size="sm" withArrow>
                Get Started
              </ButtonLink>
              <button
                ref={burgerRef}
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-expanded={open}
                aria-controls="mobile-drawer"
                aria-label={open ? "Close menu" : "Open menu"}
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-border-2 nav:hidden"
              >
                <span className="relative block h-[1.6px] w-4 bg-current before:absolute before:left-0 before:top-[-5px] before:block before:h-[1.6px] before:w-4 before:bg-current before:content-[''] after:absolute after:left-0 after:top-[5px] after:block after:h-[1.6px] after:w-4 after:bg-current after:content-['']" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Drawer. Rendered always so its links are in the HTML; hidden
          from assistive tech and from the tab order while closed. */}
      <div
        id="mobile-drawer"
        data-print="hide"
        inert={!open ? true : undefined}
        className={`fixed inset-0 z-[119] overflow-y-auto bg-bg px-s5 pb-s6 pt-[calc(var(--nav-h)+40px)] transition-[opacity,transform,visibility] duration-[260ms] nav:hidden ${
          open
            ? "visible translate-y-0 opacity-100"
            : "invisible -translate-y-2 opacity-0"
        }`}
      >
        <nav aria-label="Mobile">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              aria-current={isCurrent(l.href) ? "page" : undefined}
              className="block border-b border-border-1 py-[17px] font-display text-[1.22rem] font-bold tracking-[-.02em]"
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="mt-s6 grid gap-s3">
          <ButtonLink href="/get-started" fullWidth withArrow>
            Get Started
          </ButtonLink>
          <ButtonLink href="/sign-in" variant="secondary" fullWidth>
            Sign In
          </ButtonLink>
        </div>
      </div>
    </>
  );
}
