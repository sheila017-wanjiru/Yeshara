import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/layout/PageHero";
import { Section, SectionHeader, SourceNote } from "@/components/primitives/Section";
import { Placeholder } from "@/components/primitives/Chip";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { DualFlowTabs } from "@/components/content/DualFlowTabs";
import { LifecycleStepper } from "@/components/content/LifecycleStepper";
import { ComparisonTable } from "@/components/content/ComparisonTable";
import { FaqAccordion } from "@/components/content/FaqAccordion";
import { InfrastructureGrid } from "@/components/content/InfraCompliance";
import { AssetClassCard, RoleCard } from "@/components/content/Cards";
import { ClosingCta } from "@/components/layout/ClosingCta";
import { BreadcrumbJsonLd, FaqJsonLd } from "@/components/seo/JsonLd";
import { BuildingIcon, InstrumentIcon } from "@/components/primitives/Icons";
import { PARTIES } from "@/content/facts";
import { COMPARISON_SOURCE, FAQ } from "@/content/tokenization";

export const metadata = buildMetadata({
  title: "Tokenization — how an asset becomes a token",
  description:
    "The two paths through the Yeshara platform, the five-phase lifecycle from deal structuring to secondary market, and the three-party structure that keeps title with an independent trustee.",
  path: "/tokenization",
});

export default function TokenizationPage() {
  return (
    <>
      <PageHero
        eyebrow="Tokenization"
        title={
          <>
            Simple steps to <span className="tq">tokenize</span>.
          </>
        }
        lead="Two paths through the same platform. One for the owner bringing an asset, one for the investor buying into it — and one lifecycle underneath both."
      />

      <Section labelledBy="flows-heading">
        <ScrollReveal>
          <SectionHeader
            id="flows-heading"
            eyebrow="The two journeys"
            title={
              <>
                Pick the side you&rsquo;re <span className="tq">standing on</span>.
              </>
            }
          />
        </ScrollReveal>
        <DualFlowTabs />
      </Section>

      <Section band labelledBy="classes-heading">
        <ScrollReveal>
          <SectionHeader
            id="classes-heading"
            eyebrow="Asset Classes"
            title={
              <>
                What can be <span className="tq">tokenized</span>.
              </>
            }
            lead="Yeshara specialises in two asset classes. What is being tested in the sandbox and what is a stated direction are labelled differently, deliberately."
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

      <Section id="lifecycle" labelledBy="lifecycle-heading">
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

      <Section band labelledBy="roles-heading">
        <ScrollReveal>
          <SectionHeader
            id="roles-heading"
            eyebrow="Roles"
            title={
              <>
                Three parties. <span className="tq">Separated on purpose.</span>
              </>
            }
            lead="Yeshara does not hold your asset and does not hold your money. Title and investor funds sit with an independent trustee."
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

      <Section id="infrastructure" labelledBy="infra-heading">
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

      <Section id="faq" labelledBy="faq-heading">
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
      </Section>

      <ClosingCta />

      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Tokenization", path: "/tokenization" },
        ]}
      />
      <FaqJsonLd items={FAQ.map((f) => ({ question: f.question, answer: f.answer }))} />
    </>
  );
}
