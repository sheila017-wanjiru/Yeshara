import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/layout/PageHero";
import { Section, SectionHeader } from "@/components/primitives/Section";
import { Placeholder } from "@/components/primitives/Chip";
import { ButtonLink } from "@/components/primitives/Button";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { PullQuote } from "@/components/content/Cards";
import { ComplianceGrid } from "@/components/content/InfraCompliance";
import { ClosingCta } from "@/components/layout/ClosingCta";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { MISSION, REGULATORY, VALUES, VISION } from "@/content/facts";
import { SITE } from "@/lib/site";

export const metadata = buildMetadata({
  title: "About Us — the cowrie was East Africa's first token",
  description:
    "Yeshara Tokens Limited converts real estate and financial instruments into tradeable tokens under trustee oversight, inside Kenya's capital markets framework. Our vision, mission and values.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Yeshara"
        title={
          <>
            The cowrie was <span className="tq">East Africa&rsquo;s first token</span>.
          </>
        }
        lead="A shell that stored value, moved between hands and needed no bank to be trusted. It is the mark on our logo, and it is the shortest explanation of what Yeshara does: make ownership divisible enough to move."
      >
        <p className="bd mt-s5 max-w-[62ch]">
          {SITE.legalName} converts real estate and financial instruments into
          secure, tradeable blockchain-based tokens, under trustee oversight and
          inside Kenya&rsquo;s capital markets framework.
        </p>

        <ScrollReveal>
          <PullQuote
            attribution={
              <>
                {SITE.legalName} &nbsp;·&nbsp;{" "}
                <span className="text-warn">[ATTRIBUTION — NAME &amp; ROLE]</span>
              </>
            }
          >
            &ldquo;Democratizing real estate investment — empowering a new class
            of investors by reducing prohibitively large minimum investment size
            and reducing geographic constraints.&rdquo;
          </PullQuote>
        </ScrollReveal>
      </PageHero>

      {/* ═══ VISION & MISSION ═══ */}
      <Section band labelledBy="vm-heading">
        <ScrollReveal>
          <SectionHeader
            id="vm-heading"
            eyebrow="Vision &amp; Mission"
            title={
              <>
                Where this is going, and <span className="tq">what we do about it</span>.
              </>
            }
          />
        </ScrollReveal>

        <ScrollReveal className="mt-s7 grid gap-s7 lg:grid-cols-2">
          <div>
            <span className="mono text-tq-300">Our vision</span>
            <ul className="mt-s4 list-none p-0">
              {VISION.map((item) => (
                <li key={item.title} className="border-t border-border-1 py-s4">
                  <b className="block font-display text-[.98rem] font-bold tracking-[-.02em]">
                    {item.title}
                  </b>
                  <p className="mt-1.5 text-[.8438rem] leading-[1.55] text-tx-2">
                    {item.body}
                  </p>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <span className="mono text-tq-300">Our mission</span>
            <ul className="mt-s4 list-none p-0">
              {MISSION.map((item) => (
                <li key={item.title} className="border-t border-border-1 py-s4">
                  <b className="block font-display text-[.98rem] font-bold tracking-[-.02em]">
                    {item.title}
                  </b>
                  <p className="mt-1.5 text-[.8438rem] leading-[1.55] text-tx-2">
                    {item.body}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </ScrollReveal>
      </Section>

      {/* ═══ VALUES ═══ */}
      <Section labelledBy="values-heading">
        <ScrollReveal>
          <SectionHeader
            id="values-heading"
            eyebrow="Core Values"
            title={
              <>
                Three words we can be <span className="tq">held to</span>.
              </>
            }
          />
        </ScrollReveal>
        <ScrollReveal className="mt-s7 grid gap-s4 lg:grid-cols-3">
          {VALUES.map((value) => (
            <div key={value.name} className="border-t-2 border-tq-500 pt-s5">
              <b className="block font-display text-[1.3rem] font-extrabold tracking-[-.028em]">
                {value.name}
              </b>
              <p className="mt-s3 text-[.9rem] leading-[1.6] text-tx-2">{value.body}</p>
            </div>
          ))}
        </ScrollReveal>
      </Section>

      {/* ═══ COMPLIANCE ═══ */}
      <Section band id="compliance" labelledBy="compliance-heading">
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
            [BLOCKCHAIN &amp; TOKEN STANDARD] · [TRUSTEE NAME] · [CUSTODIAN] ·
            [AUDITOR]
          </Placeholder>
        </ScrollReveal>
      </Section>

      {/* ═══ LEADERSHIP ═══ */}
      <Section labelledBy="team-heading">
        <ScrollReveal>
          <SectionHeader
            id="team-heading"
            eyebrow="Leadership"
            title={
              <>
                The people <span className="tq">behind it</span>.
              </>
            }
            lead="Names, roles and photographs are supplied by Yeshara. Nothing on this page is invented to fill the space."
          />
        </ScrollReveal>
        <ScrollReveal className="mt-s7 grid items-start gap-s6 lg:grid-cols-2">
          <Placeholder>
            [TEAM — NAMES, ROLES, PHOTOGRAPHS]
            <br />
            [FOUNDING DATE] · [BOARD &amp; ADVISORS]
          </Placeholder>
          <div className="flex flex-wrap gap-s3 lg:pt-s5">
            <ButtonLink href="/get-started" size="sm" withArrow>
              Get Started
            </ButtonLink>
            <ButtonLink href="/investors" variant="secondary" size="sm">
              Investor information
            </ButtonLink>
          </div>
        </ScrollReveal>
      </Section>

      <ClosingCta />

      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "About Us", path: "/about" },
        ]}
      />
    </>
  );
}
