import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/layout/PageHero";
import { Section, SectionHeader, SourceNote } from "@/components/primitives/Section";
import { Chip, Placeholder } from "@/components/primitives/Chip";
import { ButtonLink } from "@/components/primitives/Button";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { ValueProp } from "@/components/content/Cards";
import { StatGrid } from "@/components/content/StatGrid";
import { ClosingCta } from "@/components/layout/ClosingCta";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import {
  DiversifyIcon,
  PieIcon,
  ClockIcon,
  ShieldSmallIcon,
} from "@/components/primitives/Icons";
import { HEADLINE_STATS, MARKET_FIGURES_SOURCE } from "@/content/facts";

export const metadata = buildMetadata({
  title: "Investors — the case for Yeshara",
  description:
    "Why investors hold Yeshara tokens: fractional entry from KES 1,000, transfer between verified holders, and title held by an independent trustee. Regulatory position, market and expansion path.",
  path: "/investors",
});

const CASE = [
  {
    n: "01",
    title: "Regulatory position",
    body: "Admitted to the CMA Regulatory Sandbox, December 2024. Participating in Kenya's virtual asset framework rather than operating outside it. Sandbox admission is a supervised test, not a licence.",
  },
  {
    n: "02",
    title: "Market opportunity",
    body: "A $40bn property market, a $6bn mortgage market and a $1.5bn fintech sector growing at 20% a year — with no compliant fractional-ownership rail between them.",
  },
  {
    n: "03",
    title: "Structural moat",
    body: "The barrier is not the code. It is the legal structuring, trustee arrangements and regulatory know-how a competitor must assemble before writing a line of it.",
  },
  {
    n: "04",
    title: "Expansion path",
    body: "Real estate first, financial instruments second. Sequenced, with each asset class carrying its own structuring and approvals.",
  },
] as const;

export default function InvestorsPage() {
  return (
    <>
      <PageHero
        eyebrow="Investors"
        title={
          <>
            Why investors <span className="tq">hold Yeshara tokens</span>.
          </>
        }
        lead="Kenya has a $40 billion real estate market and 22% urban homeownership. The constraint is not appetite. It is that the smallest unit of ownership is an entire building."
      />

      <Section labelledBy="props-heading">
        <ScrollReveal>
          <SectionHeader
            id="props-heading"
            eyebrow="What a holder gets"
            title={
              <>
                Four things a token does that a <span className="tq">title deed</span>{" "}
                cannot.
              </>
            }
          />
        </ScrollReveal>
        <ScrollReveal className="mt-s7 grid gap-px overflow-hidden rounded-card border border-border-1 bg-border-1 sm:grid-cols-2 lg:grid-cols-4">
          <ValueProp
            icon={<DiversifyIcon />}
            title="Diversify your portfolio"
            body="Access a wider range of asset classes with lower investment barriers."
          />
          <ValueProp
            icon={<PieIcon />}
            title="Fractional ownership"
            body="Invest in high-value assets with smaller amounts, from KES 1,000."
          />
          <ValueProp
            icon={<ClockIcon />}
            title="Transfer around the clock"
            body="Move tokens between verified holders at any hour, not only in market hours."
          />
          <ValueProp
            icon={<ShieldSmallIcon />}
            title="Transparency & security"
            body="Ownership and transfers recorded on-chain, with title held by an independent trustee."
          />
        </ScrollReveal>
      </Section>

      <Section band labelledBy="case-heading">
        <ScrollReveal>
          <SectionHeader
            id="case-heading"
            eyebrow="The Case"
            title={
              <>
                The case for <span className="tq">Yeshara</span>.
              </>
            }
          />
        </ScrollReveal>

        <div className="mt-s7 grid items-start gap-s6 lg:grid-cols-2 lg:gap-s8">
          <ScrollReveal>
            <ol className="list-none p-0">
              {CASE.map((item) => (
                <li
                  key={item.n}
                  className="grid grid-cols-[auto_1fr] gap-s4 border-t border-border-1 py-s4"
                >
                  <span className="mono pt-1 text-tq-300">{item.n}</span>
                  <div>
                    <h3 className="h4">{item.title}</h3>
                    <p className="sm mt-1.5">{item.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </ScrollReveal>

          <ScrollReveal>
            <div className="rounded-card border border-border-1 bg-surface p-s6 elev">
              <Chip tone="placeholder">Placeholder — investor materials</Chip>
              <h3 className="d3 mt-s4">Investor resources</h3>
              <p className="bd mt-s3">
                Financial metrics, funding history and shareholder information
                are supplied by Yeshara. Nothing on this page is fabricated to
                fill a gap.
              </p>
              <div className="mt-s5 grid gap-s3 sm:grid-cols-2">
                <Placeholder>[COMPANY OVERVIEW]</Placeholder>
                <Placeholder>[FUNDING HISTORY]</Placeholder>
                <Placeholder>[FINANCIAL METRICS]</Placeholder>
                <Placeholder>[WHITE PAPER — PUBLIC EDITION]</Placeholder>
              </div>
              <ButtonLink href="/contact" size="sm" fullWidth withArrow className="mt-s5">
                Request investor materials
              </ButtonLink>
              {/* Wired to a real destination — the previous "Join
                  Waitlist" button fired nothing at all. */}
              <p className="mono mt-s4 text-center leading-[1.8] text-tx-3">
                Goes to a monitored inbox
              </p>
            </div>
          </ScrollReveal>
        </div>
      </Section>

      <Section labelledBy="market-heading">
        <ScrollReveal>
          <SectionHeader
            id="market-heading"
            eyebrow="The Market"
            title={
              <>
                The numbers, <span className="tq">with their sources</span>.
              </>
            }
            lead="Only figures we can attribute are published. Where the previous site and the White Paper disagreed, nothing ships until they are reconciled."
          />
        </ScrollReveal>
        <ScrollReveal>
          <StatGrid stats={HEADLINE_STATS} className="mt-s8" />
          <SourceNote>{MARKET_FIGURES_SOURCE}</SourceNote>
        </ScrollReveal>
      </Section>

      <Section band labelledBy="escalate-heading">
        <ScrollReveal>
          <SectionHeader
            id="escalate-heading"
            eyebrow="Open items"
            title={
              <>
                What is <span className="tq">not yet answered</span>.
              </>
            }
            lead="Two items named in existing Yeshara documents are not described anywhere on this site, because their status has not been confirmed. Both are with the client."
          />
        </ScrollReveal>
        <ScrollReveal className="mt-s6 grid gap-s4 md:grid-cols-2">
          <Placeholder>
            [&ldquo;YESHARA EXCHANGE PLATFORM&rdquo; — CONFIRM IF SEPARATE
            PRODUCT. Named once on the existing /investors page and nowhere
            else.]
          </Placeholder>
          <Placeholder>
            [&ldquo;YESHARA COIN&rdquo; — a 1:1 USD-pegged internal settlement
            unit described in the existing Terms of Service. A fiat-pegged unit
            is a licensable activity under the VASP Act 2025. No interface
            references it pending client instruction.]
          </Placeholder>
        </ScrollReveal>
      </Section>

      <ClosingCta
        title={
          <>
            Talk to us about <span className="tq">the register</span>.
          </>
        }
        lead="Join the investor register and you will hear before the first primary sale opens."
      />

      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Investors", path: "/investors" },
        ]}
      />
    </>
  );
}
