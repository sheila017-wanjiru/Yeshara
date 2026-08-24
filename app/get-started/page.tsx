import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/primitives/Section";
import { ContactForm } from "@/components/forms/ContactForm";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { SITE, PAYMENT_METHODS } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Get Started — investor or asset owner",
  description:
    "Open an investor account or bring an asset to tokenize. Choose your role and tell Yeshara what you hold or what you are looking for.",
  path: "/get-started",
});

const NEXT_STEPS = [
  ["We read it", "A person, not an autoresponder. We reply within two business days."],
  ["We tell you if it fits", "Including when tokenization changes nothing for your asset."],
  ["Verification", "If it does fit, KYC and AML come before anything is issued."],
] as const;

export default function GetStartedPage() {
  return (
    <>
      <PageHero
        eyebrow="Get Started"
        title={
          <>
            Let&rsquo;s tokenize <span className="tq">an asset</span>.
          </>
        }
        lead="Two roles, one form. Choose your role and the questions change to match."
      />

      <Section labelledBy="start-heading">
        <h2 id="start-heading" className="absolute left-[-9999px]">
          Choose your role and send your details
        </h2>

        <div className="grid gap-s7 lg:grid-cols-2 lg:gap-s8">
          <div>
            <h3 className="d3">What happens next</h3>
            <ol className="mt-s5 list-none border-t border-border-1 p-0">
              {NEXT_STEPS.map(([title, body], i) => (
                <li
                  key={title}
                  className="grid grid-cols-[auto_1fr] gap-s4 border-b border-border-1 py-s4"
                >
                  <span className="mono pt-1 text-tq-300">0{i + 1}</span>
                  <span>
                    <b className="block font-display text-[1rem] font-bold tracking-[-.02em]">
                      {title}
                    </b>
                    <span className="mt-1.5 block text-[.875rem] leading-[1.55] text-tx-2">
                      {body}
                    </span>
                  </span>
                </li>
              ))}
            </ol>

            <h3 className="d3 mt-s7">Funding methods</h3>
            <ul className="mt-s4 flex list-none flex-wrap gap-s2 p-0">
              {PAYMENT_METHODS.map((method) => (
                <li
                  key={method}
                  className="inline-flex h-[34px] items-center rounded-[9px] border border-border-2 bg-surface px-[13px] text-[.8125rem] text-tx-2"
                >
                  {method}
                </li>
              ))}
            </ul>

            <p className="mono mt-s7 leading-[2.2] text-tx-3">
              {SITE.email}
              <br />
              {SITE.phone}
              <br />
              {SITE.address.inline}
            </p>
          </div>

          <ContactForm source="/get-started" withRoleSelector />
        </div>
      </Section>

      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Get Started", path: "/get-started" },
        ]}
      />
    </>
  );
}
