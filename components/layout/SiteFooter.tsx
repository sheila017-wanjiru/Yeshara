import Link from "next/link";
import { FOOTER_NAV, SITE } from "@/lib/site";
import { NewsletterForm } from "@/components/forms/NewsletterForm";
import { Logo } from "./Logo";

const COLUMNS = [
  { heading: "Platform", links: FOOTER_NAV.platform },
  { heading: "Company", links: FOOTER_NAV.company },
  { heading: "Support", links: FOOTER_NAV.support },
  { heading: "Legal", links: FOOTER_NAV.legal },
] as const;

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      rel="noopener"
      aria-label={label}
      className="grid h-[38px] w-[38px] place-items-center rounded-[10px] border border-border-2 text-tx-2 transition-colors duration-200 hover:border-tq-500/35 hover:bg-tq-500/[.07] hover:text-tq-300"
    >
      {children}
    </a>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border-1 bg-bg-2 pb-s6 pt-s8">
      <div className="mx-auto w-full max-w-[var(--maxw)] px-s4 sm:px-s5">
        <div className="grid gap-s6 md:grid-cols-3 lg:grid-cols-[1.7fr_repeat(4,1fr)]">
          <div>
            <Logo />
            <p className="sm mt-s4 max-w-[34ch]">
              Converting real-world assets into secure, tradeable blockchain-based
              tokens.
            </p>

            {/* One reconciled address rendering. The previous footer
                carried two that disagreed. */}
            <address className="mt-s4 font-mono text-[.72rem] not-italic uppercase leading-[2] tracking-[.06em] text-tx-3">
              {SITE.legalName}
              <br />
              {SITE.address.inline}
              <br />
              <a
                href={`tel:${SITE.phoneHref}`}
                className="transition-colors hover:text-tq-300"
              >
                {SITE.phone}
              </a>
            </address>

            <NewsletterForm />

            <div className="mt-s5 flex gap-s3" data-print="hide">
              <SocialLink href={SITE.linkedin} label="Yeshara on LinkedIn">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M4.98 3.5a2.5 2.5 0 100 5 2.5 2.5 0 000-5zM3 9h4v12H3zM10 9h3.8v1.7h.05c.53-.95 1.83-1.95 3.77-1.95 4.03 0 4.78 2.53 4.78 5.82V21h-4v-5.5c0-1.31-.02-3-1.9-3-1.9 0-2.2 1.42-2.2 2.9V21h-3.9z" />
                </svg>
              </SocialLink>
              <SocialLink href={SITE.whatsapp} label="Yeshara on WhatsApp">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 2a10 10 0 00-8.6 15L2 22l5.2-1.35A10 10 0 1012 2zm0 2a8 8 0 016.8 12.2l-.3.5.8 2.9-3-.78-.45.26A8 8 0 1112 4zm-3.4 4.2c-.2 0-.5.07-.75.35-.26.28-.98.95-.98 2.32s1 2.7 1.15 2.88c.14.19 1.96 3.13 4.87 4.24 2.42.93 2.92.75 3.44.7.52-.05 1.7-.7 1.94-1.36.24-.67.24-1.24.17-1.36-.07-.12-.26-.19-.54-.33-.28-.14-1.7-.84-1.96-.94-.26-.09-.45-.14-.64.15-.19.28-.74.93-.9 1.12-.17.19-.34.21-.62.07-.28-.14-1.2-.44-2.28-1.4-.84-.75-1.42-1.68-1.58-1.96-.17-.28-.02-.44.12-.58.13-.13.28-.34.42-.5.14-.17.19-.29.28-.48.1-.19.05-.35-.02-.5-.07-.13-.63-1.52-.86-2.08-.23-.55-.46-.47-.63-.48z" />
                </svg>
              </SocialLink>
            </div>
          </div>

          {COLUMNS.map((col) => (
            <nav key={col.heading} aria-label={col.heading}>
              <span className="mono mb-s4 block text-tx">{col.heading}</span>
              {col.links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block break-words py-[6px] text-[.875rem] text-tx-2 transition-colors duration-200 hover:text-tq-300"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          ))}
        </div>

        <div className="mono mt-s8 flex flex-wrap justify-between gap-s4 border-t border-border-1 pt-s5 text-tx-3">
          <span>© {new Date().getFullYear()} {SITE.legalName}</span>
          <span>
            Sandbox admission is a supervised test, not a licence.
          </span>
        </div>
      </div>
    </footer>
  );
}
