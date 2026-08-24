import { buildMetadata } from "@/lib/seo";
import { Wrap, Section, SectionHeader, SourceNote } from "@/components/primitives/Section";
import { ButtonLink } from "@/components/primitives/Button";
import { Chip, Placeholder } from "@/components/primitives/Chip";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { TokenizationPipeline } from "@/components/motion/TokenizationPipeline";
import { StatGrid, StatTicker } from "@/components/content/StatGrid";
import { PillarCard, AssetClassCard, RoleCard } from "@/components/content/Cards";
import { LifecycleStepper } from "@/components/content/LifecycleStepper";
import { ComparisonTable } from "@/components/content/ComparisonTable";
import { EcosystemDiagram } from "@/components/content/EcosystemDiagram";
import { FaqAccordion } from "@/components/content/FaqAccordion";
import { InfrastructureGrid, ComplianceGrid } from "@/components/content/InfraCompliance";
import { PartnerBelt } from "@/components/content/PartnerBelt";
import { ClosingCta } from "@/components/layout/ClosingCta";
import { FaqJsonLd } from "@/components/seo/JsonLd";
import {
  HouseIcon,
  PulseIcon,
  ShieldCheckIcon,
  BuildingIcon,
  InstrumentIcon,
} from "@/components/primitives/Icons";
import {
  HEADLINE_STATS,
  MARKET_FIGURES_SOURCE,
  PARTIES,
  REGULATORY,
  TICKET,
} from "@/content/facts";
import { COMPARISON_SOURCE, FAQ } from "@/content/tokenization";

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

      {/* ═══ LIFECYCLE ═══ */}
      <Section band labelledBy="lifecycle-heading" id="lifecycle">
        <ScrollReveal>
          <SectionHeader
            id="lifecycle-heading"
            eyebrow="The Tokenization Lifecycle"
            title={
              <>
                Five phases, from <span className="tq">deal to secondary market</span>.
              </>
            }
            lead="The institutional view of the same process. Each phase has its own documents, approvals and counterparties."
          />
        </ScrollReveal>
        <LifecycleStepper />
      </Section>

      {/* ═══ ROLES ═══ */}
      <Section labelledBy="roles-heading">
        <ScrollReveal>
          <SectionHeader
            id="roles-heading"
            eyebrow="Roles"
            title={
              <>
                Three parties. <span className="tq">Separated on purpose.</span>
              </>
            }
            lead="Yeshara does not hold your asset and does not hold your money. Title and investor funds sit with an independent trustee. That separation is the structure institutions ask about first."
          />
        </ScrollReveal>
        <ScrollReveal className="mt-s8 grid gap-s4 lg:grid-cols-3">
          {PARTIES.map((party) => (
            <RoleCard
              key={party.name}
              name={party.name}
              accent={party.accent}
              role={party.role}
              duties={party.duties}
            />
          ))}
        </ScrollReveal>
        <ScrollReveal>
          <Placeholder className="mt-s5">[TRUSTEE NAME] · [CUSTODIAN] · [AUDITOR]</Placeholder>
        </ScrollReveal>
      </Section>

      {/* ═══ COMPARISON ═══ */}
      <Section band labelledBy="comparison-heading">
        <ScrollReveal>
          <SectionHeader
            id="comparison-heading"
            eyebrow="The Comparison"
            title={
              <>
                How this differs from a <span className="tq">REIT</span>.
              </>
            }
            lead="Kenyan investors already have a fractional property product. It is worth being precise about what changes and what does not."
          />
        </ScrollReveal>
        <ComparisonTable />
        <SourceNote>{COMPARISON_SOURCE}</SourceNote>
      </Section>

      {/* ═══ INFRASTRUCTURE ═══ */}
      <Section labelledBy="infra-heading" id="infrastructure">
        <ScrollReveal>
          <SectionHeader
            id="infra-heading"
            eyebrow="Infrastructure"
            title={
              <>
                Three layers <span className="tq">underneath every token</span>.
              </>
            }
          />
        </ScrollReveal>
        <ScrollReveal>
          <InfrastructureGrid />
          <Placeholder className="mt-s5">[BLOCKCHAIN &amp; TOKEN STANDARD]</Placeholder>
        </ScrollReveal>
      </Section>

      <PartnerBelt />

      {/* ═══ COMPLIANCE ═══ */}
      <Section labelledBy="compliance-heading" id="compliance">
        <ScrollReveal>
          <SectionHeader
            id="compliance-heading"
            eyebrow="Compliance First"
            title={
              <>
                Built inside the perimeter, <span className="tq">not ahead of it</span>.
              </>
            }
            lead={`${REGULATORY.admission} ${REGULATORY.caveat} — and we say so.`}
          />
        </ScrollReveal>
        <ScrollReveal>
          <ComplianceGrid />
          <Placeholder className="mt-s6">
            [LICENSING STATUS — VASP ACT 2025 / VASP REGULATIONS 2026] ·
            [COMPLIANCE PROVIDERS] · [SECURITY CERTIFICATIONS] · [AUDIT REPORTS]
          </Placeholder>
        </ScrollReveal>
      </Section>

      {/* ═══ ECOSYSTEM ═══ */}
      <Section band labelledBy="ecosystem-heading">
        <ScrollReveal>
          <SectionHeader
            id="ecosystem-heading"
            eyebrow="The Yeshara Ecosystem"
            title={
              <>
                Infrastructure connecting <span className="tq">real-world assets</span> with
                digital financial systems.
              </>
            }
            lead="Select a participant to see what it contributes and what it receives."
          />
        </ScrollReveal>
        <EcosystemDiagram />
      </Section>

      {/* ═══ FAQ ═══ */}
      <Section labelledBy="faq-heading" id="faq">
        <ScrollReveal>
          <SectionHeader
            id="faq-heading"
            eyebrow="Questions"
            title={
              <>
                The things people <span className="tq">actually ask</span>.
              </>
            }
          />
        </ScrollReveal>
        <FaqAccordion items={FAQ} />
        <FaqJsonLd
          items={FAQ.map((f) => ({ question: f.question, answer: f.answer }))}
        />
      </Section>

      <ClosingCta />
    </>
  );
}
