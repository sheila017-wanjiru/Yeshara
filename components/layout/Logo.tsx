import Link from "next/link";

/**
 * The gradient the cowrie mark fills with, defined once per document.
 * Rendered in the root layout so header and footer marks can both
 * reference it without duplicating an element id.
 */
export function BrandDefs() {
  return (
    <svg width="0" height="0" className="absolute" aria-hidden="true">
      <defs>
        <linearGradient id="yesh-mark" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#CDEEEF" />
          <stop offset="40%" stopColor="#6AC8CA" />
          <stop offset="76%" stopColor="#3E9B9E" />
          <stop offset="100%" stopColor="#17403F" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/**
 * The cowrie shell — East Africa's original currency, a store of value
 * that moved between hands and needed no bank. It is the strongest
 * brand asset Yeshara owns.
 */
export function LogoMark({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={`shrink-0 ${className}`} aria-hidden="true">
      <circle cx="24" cy="24" r="23" fill="url(#yesh-mark)" />
      <path
        d="M24 8.5c6.2 4.6 9.3 9.6 9.3 15.5S30.2 35.2 24 39.5c-6.2-4.3-9.3-9.6-9.3-15.5S17.8 13.1 24 8.5z"
        fill="#fff"
      />
      <path
        d="M24 12.4c-1.9 3.6-2.9 7.4-2.9 11.6s1 8 2.9 11.6c1.9-3.6 2.9-7.4 2.9-11.6s-1-8-2.9-11.6z"
        fill="#17403F"
      />
      <g fill="#fff">
        <rect x="23.3" y="16" width="1.4" height="1.5" rx=".6" />
        <rect x="23.3" y="20" width="1.4" height="1.5" rx=".6" />
        <rect x="23.3" y="24" width="1.4" height="1.5" rx=".6" />
        <rect x="23.3" y="28" width="1.4" height="1.5" rx=".6" />
      </g>
    </svg>
  );
}

/**
 * Both lockups ship (§15.3). The wordmark is --tx white, so the dark
 * lockup disappears on any white background — a deck slide, a
 * letterhead, an invoice. `lockup="light"` switches the word to ink;
 * the teal disc reads on both grounds.
 */
export function Logo({
  href = "/",
  lockup = "dark",
  className = "",
}: {
  href?: string | null;
  lockup?: "dark" | "light";
  className?: string;
}) {
  const inner = (
    <>
      <LogoMark />
      {/* A space in the markup keeps the wordmark from colliding with
          whatever follows it — the live header rendered "YesharaHOME". */}
      <span className="logo-word font-display text-[1.24rem] font-extrabold leading-none tracking-[-.035em]">
        Yeshara
      </span>
    </>
  );

  const cls = `flex shrink-0 items-center gap-[11px] ${
    lockup === "light" ? "logo-light" : ""
  } ${className}`;

  if (!href) {
    return (
      <span className={cls} aria-label={`${"Yeshara"} — home`}>
        {inner}
      </span>
    );
  }

  return (
    <Link className={cls} href={href} aria-label="Yeshara — home">
      {inner}
    </Link>
  );
}
