import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/primitives/Section";
import { Placeholder } from "@/components/primitives/Chip";
import { ContactForm } from "@/components/forms/ContactForm";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { SITE, PAYMENT_METHODS } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Contact Us",
  description:
    "Reach Yeshara Tokens Limited at Wu-Yi Plaza, Galana Road, Kilimani, Nairobi. Email info@yeshara.network or call +254 103 102 336.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact Us"
        title={
          <>
            Tell us what you <span className="tq">hold</span>.
          </>
        }
        lead="Whether you are bringing an asset or looking to buy into one, start here. We will tell you honestly whether tokenization changes anything for that asset — and whether it can be done inside the current rules."
      />

      <Section labelledBy="contact-heading">
        <h2 id="contact-heading" className="absolute left-[-9999px]">
          Contact details and enquiry form
        </h2>

        <div className="grid gap-s7 lg:grid-cols-2 lg:gap-s8">
          <div>
            <h3 className="d3">Where to find us</h3>
            <dl className="mt-s5 border-t border-border-1">
              <div className="border-b border-border-1 py-s4">
                <dt className="mono text-tx-3">Office</dt>
                <dd className="bd m-0 mt-1.5">
                  <address className="not-italic">
                    {SITE.legalName}
                    <br />
                    {SITE.address.building}, {SITE.address.street}
                    <br />
                    {SITE.address.area}, {SITE.address.city}
                    <br />
                    {SITE.address.country}
                  </address>
                </dd>
              </div>
              <div className="border-b border-border-1 py-s4">
                <dt className="mono text-tx-3">Email</dt>
                <dd className="bd m-0 mt-1.5">
                  <a href={`mailto:${SITE.email}`} className="text-tq-300 underline underline-offset-4">
                    {SITE.email}
                  </a>
                </dd>
              </div>
              <div className="border-b border-border-1 py-s4">
                <dt className="mono text-tx-3">Telephone</dt>
                <dd className="bd m-0 mt-1.5">
                  <a href={`tel:${SITE.phoneHref}`} className="text-tq-300 underline underline-offset-4">
                    {SITE.phone}
                  </a>
                </dd>
              </div>
              <div className="border-b border-border-1 py-s4">
                <dt className="mono text-tx-3">LinkedIn</dt>
                <dd className="bd m-0 mt-1.5">
                  <a href={SITE.linkedin} rel="noopener" className="text-tq-300 underline underline-offset-4">
                    Yeshara Tokens Ltd
                  </a>
                </dd>
              </div>
            </dl>

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

            <Placeholder className="mt-s7">
              [CONTACT ROUTING — AN INSTITUTIONAL INBOX, NOT A WHATSAPP NUMBER]
            </Placeholder>
          </div>

          <ContactForm source="/contact" />
        </div>
      </Section>

      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Contact Us", path: "/contact" },
        ]}
      />
    </>
  );
}
