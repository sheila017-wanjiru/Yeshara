import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

type Variant = "primary" | "secondary";
type Size = "lg" | "sm" | "xs";

const BASE =
  "inline-flex items-center justify-center gap-s2 rounded-btn border border-transparent " +
  "font-display font-bold whitespace-nowrap tracking-[-.008em] " +
  "transition-[background-color,color,border-color,box-shadow,transform] duration-200 " +
  "active:translate-y-px group";

const VARIANT: Record<Variant, string> = {
  // tq-300 is the interactive step. On-teal text is --on-tq throughout.
  primary:
    "bg-tq-300 text-on-tq hover:bg-tq-200 hover:shadow-[0_10px_34px_-12px_rgba(132,214,216,.5)]",
  secondary:
    "bg-white/[.03] border-border-2 text-tx hover:border-tq-300/35 hover:bg-tq-500/[.07] hover:text-tq-300",
};

const SIZE: Record<Size, string> = {
  lg: "h-[52px] px-s6 text-[.9375rem]",
  sm: "h-[44px] px-s5 text-[.875rem]",
  xs: "h-9 px-s4 text-[.8125rem] rounded-[10px]",
};

function Arrow() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden="true"
      className="transition-transform duration-200 group-hover:translate-x-[3px]"
    >
      <path
        d="M2 7h9M7.5 3.5L11 7l-3.5 3.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

type CommonProps = {
  variant?: Variant;
  size?: Size;
  withArrow?: boolean;
  fullWidth?: boolean;
  children: ReactNode;
  className?: string;
};

/**
 * Every internal navigation is a real <a href> via next/link. No route
 * is reachable by onClick alone — crawlers and keyboard users both
 * depend on the href being there in the server-rendered HTML.
 */
export function ButtonLink({
  href,
  variant = "primary",
  size = "lg",
  withArrow = false,
  fullWidth = false,
  children,
  className = "",
  ...rest
}: CommonProps & { href: string } & Omit<
    ComponentPropsWithoutRef<"a">,
    "href" | "className" | "children"
  >) {
  const cls = `${BASE} ${VARIANT[variant]} ${SIZE[size]} ${fullWidth ? "w-full" : ""} ${className}`;
  const external = href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:");

  if (external) {
    return (
      <a className={cls} href={href} rel="noopener" {...rest}>
        {children}
        {withArrow ? <Arrow /> : null}
      </a>
    );
  }
  return (
    <Link className={cls} href={href} {...rest}>
      {children}
      {withArrow ? <Arrow /> : null}
    </Link>
  );
}

export function Button({
  variant = "primary",
  size = "lg",
  withArrow = false,
  fullWidth = false,
  children,
  className = "",
  ...rest
}: CommonProps & ComponentPropsWithoutRef<"button">) {
  return (
    <button
      className={`${BASE} ${VARIANT[variant]} ${SIZE[size]} ${fullWidth ? "w-full" : ""} ${className} disabled:cursor-not-allowed disabled:opacity-60`}
      {...rest}
    >
      {children}
      {withArrow ? <Arrow /> : null}
    </button>
  );
}

/** Inline text link. Always tq-300 — the interactive step. */
export function TextLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  const external = href.startsWith("http");
  const cls = `inline-flex items-center gap-[7px] font-display text-[.9rem] font-bold text-tq-300 transition-[gap,color] duration-200 hover:gap-[11px] hover:text-tq-200 ${className}`;
  const inner = (
    <>
      {children}
      <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden="true">
        <path
          d="M2 7h9M7.5 3.5L11 7l-3.5 3.5"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    </>
  );
  return external ? (
    <a className={cls} href={href} rel="noopener">
      {inner}
    </a>
  ) : (
    <Link className={cls} href={href}>
      {inner}
    </Link>
  );
}
