import { buildMetadata } from "@/lib/seo";
import { Wrap, Section, SectionHeader, SourceNote } from "@/components/primitives/Section";
import { ButtonLink } from "@/components/primitives/Button";
import { Chip } from "@/components/primitives/Chip";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { TokenizationPipeline } from "@/components/motion/TokenizationPipeline";
import { StatGrid, StatTicker } from "@/components/content/StatGrid";
import { PillarCard, AssetClassCard } from "@/components/content/Cards";
import {
  HouseIcon,
  PulseIcon,
  ShieldCheckIcon,
  BuildingIcon,
  InstrumentIcon,
} from "@/components/primitives/Icons";
import { HEADLINE_STATS, MARKET_FIGURES_SOURCE, TICKET } from "@/content/facts";

export const metadata = buildMetadata({
  title: "Converting real-world assets into secure, tradeable tokens",
  description:
    "Yeshara Tokens Limited structures Kenyan real estate and financial instruments, issues them as blockchain-based tokens with title held by an independent trustee, and lists them where verified investors can hold and trade.",
  path: "/",
});

export default function HomePage() {
  return (
    <>
      {/* ═══ HERO ═══ */}
      <section className="relative overflow-hidden pb-s8 pt-[calc(var(--nav-h)+72px)] lg:pt-[calc(var(--nav-h)+92px)]">
        <div
          aria-hidden="true"
          data-print="hide"
          className="pointer-events-none absolute -right-[180px] -top-[240px] h-[860px] w-[1020px] bg-[radial-gradient(ellipse_46%_44%_at_52%_46%,rgba(132,214,216,.13),transparent_70%),radial-gradient(ellipse_62%_58%_at_50%_50%,rgba(82,185,188,.11),transparent_68%),radial-gradient(ellipse_86%_80%_at_48%_54%,rgba(47,123,126,.10),transparent_72%)]"
        />
        <Wrap className="relative">
          <div className="grid items-center gap-s8 lg:grid-cols-[1.04fr_.96fr]">
            <div>
              <Chip tone="brand">Real-World Asset Tokenization · Kenya</Chip>

              {/* Exactly two accented words, in tq-300. The live site
                  ran teal across two and a half lines of a four-line
                  headline, so the accent signalled nothing. */}
              <h1 className="d1 mt-s5">
                <span className="block font-display text-[clamp(1.4rem,2.4vw,1.95rem)] font-medium leading-[1.2] tracking-[-.02em] text-tx-2">
                  Converting
                </span>
                <span>
                  real-world assets into <span className="tq">secure, tradeable</span> tokens.
                </span>
              </h1>

              <p className="lead mt-s5 max-w-[50ch]">
                Yeshara structures real estate and financial instruments, issues
                them as blockchain-based tokens with title held by an independent
                trustee, and lists them where verified investors can hold and
                trade. Ticket sizes fall from {TICKET.from} to {TICKET.to}.
              </p>

              <div className="mt-s7 flex flex-wrap gap-s3">
                <ButtonLink href="/get-started" withArrow className="max-sm:w-full">
                  Get Started
                </ButtonLink>
                <ButtonLink href="/tokenization" variant="secondary" className="max-sm:w-full">
                  Explore Tokenization
                </ButtonLink>
              </div>
            </div>

            <TokenizationPipeline />
          </div>
        </Wrap>
      </section>

      <StatTicker />

      {/* ═══ PILLARS ═══ */}
      <Section labelledBy="pillars-heading">
        <ScrollReveal>
          <SectionHeader
            id="pillars-heading"
            eyebrow="What we do"
            title={
              <>
                The future of finance is <span className="tq">on-chain</span>.
              </>
            }
            lead="Three things tokenization changes about owning a building: who can buy in, how quickly a holding can move, and what the record of ownership is worth."
          />
        </ScrollReveal>

        <ScrollReveal className="mt-s8 grid gap-s4 lg:grid-cols-3">
          <PillarCard
            icon={<HouseIcon />}
            title="Democratising real estate investment"
            body="Property ownership without the full purchase price, and without needing to be in the same country as the building."
            points={[
              "Lower minimum investment size",
              "No geographic constraint on who can hold",
              "Open to retail, diaspora and institutional investors",
            ]}
          />
          <PillarCard
            icon={<PulseIcon />}
            title="Enhancing liquidity"
            body="An asset that could only ever transfer once, to one buyer, becomes a position a holder can exit without waiting for a sale."
            points={[
              "Near-instant settlement",
              "Secondary market between verified holders",
              "Transfer without restarting conveyance",
            ]}
          />
          <PillarCard
            icon={<ShieldCheckIcon />}
            title="Blockchain secured platform"
            body="Ownership and every transfer recorded on a ledger that cannot be quietly edited, with rules enforced in code rather than by correspondence."
            points={[
              "Compliant Security Token Offerings",
              "Smart contracts for distributions and transfers",
              "Immutable, auditable ownership record",
            ]}
          />
        </ScrollReveal>
      </Section>

      {/* ═══ THE OPPORTUNITY ═══ */}
      <Section band labelledBy="opportunity-heading">
        <ScrollReveal>
          <SectionHeader
            id="opportunity-heading"
            eyebrow="The Opportunity"
            title={
              <>
                Kenya&rsquo;s most valuable asset class is its{" "}
                <span className="tq">least liquid</span>.
              </>
            }
            lead="Property is where Kenyan wealth is stored and where it stops moving. Transfers are slow, minimums are high, and ownership is all-or-nothing. Tokenization does not change the asset — it changes the size of the ticket and the speed of the transfer."
          />
        </ScrollReveal>
        <ScrollReveal>
          <StatGrid stats={HEADLINE_STATS} className="mt-s8" />
          <SourceNote>{MARKET_FIGURES_SOURCE}</SourceNote>
        </ScrollReveal>
      </Section>

      {/* ═══ ASSET CLASSES ═══ */}
      <Section labelledBy="classes-heading">
        <ScrollReveal>
          <SectionHeader
            id="classes-heading"
            eyebrow="Asset Classes"
            title={
              <>
                Two asset classes, <span className="tq">sequenced</span>.
              </>
            }
            lead="Real estate first, financial instruments second — each carrying its own structuring and approvals. What is being tested and what is intended are labelled differently on purpose."
          />
        </ScrollReveal>

        <ScrollReveal className="mt-s8 grid gap-s4 lg:grid-cols-2">
          <AssetClassCard
            icon={<BuildingIcon />}
            status="In sandbox testing"
            statusTone="confirmed"
            title="Real Estate Tokenization"
            body="Residential, commercial and mixed-use property represented as tokens, each carrying a defined share of ownership and income. Title is held by a trustee; investors hold the tokens."
            points={[
              "Fractional ownership of a property or portfolio",
              "Ticket sizes from KES 100,000 down to KES 1,000",
              "Income distributed to holders by smart contract",
              "Secondary transfer between verified holders",
            ]}
          />
          <AssetClassCard
            icon={<InstrumentIcon />}
            status="Stated direction"
            statusTone="neutral"
            title="Financial Instruments Tokenization"
            body="Bonds, bills and equities represented as tokens, so instruments currently gated by high minimums become reachable by smaller investors — with proportional returns and a secondary market."
            points={[
              "Equity, debt and hybrid securities",
              "Issuance without a costly central securities depository",
              "Security Token Offerings under Kenyan securities law",
              "Lower cross-border transaction costs",
            ]}
          />
        </ScrollReveal>
      </Section>
    </>
  );
}
