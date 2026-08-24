import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/primitives/Section";
import { ButtonLink } from "@/components/primitives/Button";
import { NAV_LINKS } from "@/lib/site";
import Link from "next/link";

export const metadata = {
  title: "Page not found",
  description: "That page does not exist on yeshara.com.",
};

export default function NotFound() {
  return (
    <>
      <PageHero
        eyebrow="404"
        title={
          <>
            That page <span className="tq">isn&rsquo;t here</span>.
          </>
        }
        lead="The link may be out of date, or the page may have moved during the site rebuild. Everything below still exists."
      />
      <Section>
        <nav aria-label="Main pages">
          <ul className="grid list-none gap-s3 border-t border-border-1 p-0 sm:grid-cols-2 lg:grid-cols-3">
            {NAV_LINKS.filter((l) => l.href !== "/").map((link) => (
              <li key={link.href} className="border-b border-border-1">
                <Link
                  href={link.href}
                  className="block py-s4 font-display text-[1.02rem] font-bold tracking-[-.024em] transition-colors hover:text-tq-300"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <ButtonLink href="/" withArrow className="mt-s7">
          Back to home
        </ButtonLink>
      </Section>
    </>
  );
}
