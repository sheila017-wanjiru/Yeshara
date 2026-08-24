import Link from "next/link";
import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo";
import { Section, Wrap } from "@/components/primitives/Section";
import { Chip, Placeholder } from "@/components/primitives/Chip";
import { ButtonLink } from "@/components/primitives/Button";
import { ClosingCta } from "@/components/layout/ClosingCta";
import { BreadcrumbJsonLd, FinancialProductJsonLd } from "@/components/seo/JsonLd";
import { getAsset, getAssetSlugs, ASSET_CLASS_LABEL } from "@/lib/content/assets";

export async function generateStaticParams() {
  const slugs = await getAssetSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const asset = await getAsset(slug);
  if (!asset) return buildMetadata({ title: "Asset not found", description: "This listing is not available.", path: `/marketplace/${slug}`, noIndex: true });

  return buildMetadata({
    title: `${asset.title} — ${asset.location}`,
    description: asset.summary,
    path: `/marketplace/${asset.slug}`,
  });
}

/**
 * The public asset page.
 *
 * This route did not exist on the previous platform: every marketplace
 * card redirected an unauthenticated visitor to /login, so no property
 * had a shareable, indexable page and the marketplace produced no
 * search traffic at all. Here the instrument, trustee, wrapper, minimum
 * ticket and document list are public; only the subscribe action is
 * behind authentication.
 */
export default async function AssetPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const asset = await getAsset(slug);
  if (!asset) notFound();

  const facts: [string, string][] = [
    ["Asset class", ASSET_CLASS_LABEL[asset.assetClass]],
    ...(asset.propertyType ? ([["Property type", asset.propertyType]] as [string, string][]) : []),
    ...(asset.instrumentType ? ([["Instrument", asset.instrumentType]] as [string, string][]) : []),
    ["Location", asset.location],
    ["Legal wrapper", asset.wrapper],
    ["Title held by", asset.trustee],
    ["Tokens issued", asset.tokensIssued.toLocaleString("en-KE")],
    ["Minimum ticket", asset.minimumTicket],
  ];

  return (
    <>
      <section className="pb-s7 pt-[calc(var(--nav-h)+64px)]">
        <Wrap>
          <nav aria-label="Breadcrumb" className="mono text-tx-3">
            <Link href="/" className="transition-colors hover:text-tq-300">
              Home
            </Link>
            <span aria-hidden="true"> / </span>
            <Link href="/marketplace" className="transition-colors hover:text-tq-300">
              Marketplace
            </Link>
            <span aria-hidden="true"> / </span>
            <span className="text-tx-2">{asset.title}</span>
          </nav>

          <div className="mt-s5 flex flex-wrap items-center gap-s3">
            <Chip tone="brand">{ASSET_CLASS_LABEL[asset.assetClass]}</Chip>
            <Chip tone={asset.status === "open" ? "confirmed" : "neutral"}>
              {asset.status === "open" ? "Open for subscription" : "Proposed"}
            </Chip>
          </div>

          <h1 className="d1 mt-s4 max-w-[18ch]">{asset.title}</h1>
          <p className="lead mt-s5 max-w-[62ch]">{asset.summary}</p>
        </Wrap>
      </section>

      <Section labelledBy="detail-heading">
        <h2 id="detail-heading" className="sr-only absolute left-[-9999px]">
          Asset detail
        </h2>

        <div className="grid gap-s6 lg:grid-cols-[1fr_360px] lg:gap-s8">
          <div>
            <div
              className="prose"
              // Rich text from the CMS. Sanitised at the content layer
              // before it reaches this component.
              dangerouslySetInnerHTML={{ __html: asset.description }}
            />

            <h3 className="d3 mt-s8">Documents</h3>
            <ul className="mt-s4 list-none p-0">
              {asset.documents.map((doc) => (
                <li
                  key={doc.label}
                  className="flex flex-wrap items-center justify-between gap-s3 border-t border-border-1 py-s4"
                >
                  <span className="text-[.9rem] text-tx-2">{doc.label}</span>
                  <span className="flex items-center gap-s3">
                    {doc.required ? <Chip tone="neutral">Required reading</Chip> : null}
                    <a
                      href={doc.file}
                      className="font-display text-[.875rem] font-bold text-tq-300 underline underline-offset-4"
                    >
                      Open
                    </a>
                  </span>
                </li>
              ))}
            </ul>

            <h3 className="d3 mt-s8">Verification</h3>
            <p className="bd mt-s3">{asset.verificationNotes}</p>
          </div>

          <aside className="lg:sticky lg:top-[calc(var(--nav-h)+30px)] lg:self-start">
            <div className="rounded-[20px] border border-border-1 bg-surface p-s6 elev">
              <dl className="m-0">
                {facts.map(([label, value]) => (
                  <div
                    key={label}
                    className="flex items-baseline justify-between gap-s4 border-b border-border-1 py-s3 last:border-b-0"
                  >
                    <dt className="font-mono text-[.6875rem] uppercase tracking-[.09em] text-tx-3">
                      {label}
                    </dt>
                    <dd className="m-0 text-right font-display text-[.875rem] font-bold">
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>

              <div className="mt-s5">
                <div className="flex items-baseline justify-between text-[.8438rem]">
                  <span className="font-mono text-[.6875rem] tracking-[.1em] text-tx-3">
                    Allocation
                  </span>
                  <b className="font-display font-bold text-tq-200">
                    {asset.allocationPercent}%
                  </b>
                </div>
                <div
                  className="mt-2 h-1 overflow-hidden rounded-[2px] bg-surface-3"
                  role="img"
                  aria-label={`${asset.allocationPercent}% allocated`}
                >
                  <span
                    className="block h-full rounded-[2px] bg-[linear-gradient(90deg,var(--tq-800),var(--tq-600)_46%,var(--tq-300))]"
                    style={{ width: `${asset.allocationPercent}%` }}
                  />
                </div>
              </div>

              {/* The action is gated; the information above is not. */}
              <ButtonLink href="/get-started" fullWidth withArrow className="mt-s6">
                Subscribe
              </ButtonLink>
              <p className="mono mt-s4 text-center leading-[1.9] text-tx-3">
                Requires a verified account — KYC and AML apply
              </p>

              <p className="sm mt-s5 border-t border-border-1 pt-s5">
                Capital is at risk and liquidity is not guaranteed. Read the{" "}
                <Link
                  href="/legal/risk-disclosure"
                  className="text-tq-300 underline underline-offset-2"
                >
                  Risk Disclosure
                </Link>{" "}
                before subscribing.
              </p>
            </div>

            <Placeholder className="mt-s4">[BLOCKCHAIN &amp; TOKEN STANDARD]</Placeholder>
          </aside>
        </div>
      </Section>

      <ClosingCta />

      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Asset Marketplace", path: "/marketplace" },
          { name: asset.title, path: `/marketplace/${asset.slug}` },
        ]}
      />
      <FinancialProductJsonLd
        name={asset.title}
        description={asset.summary}
        path={`/marketplace/${asset.slug}`}
        category={ASSET_CLASS_LABEL[asset.assetClass]}
      />
    </>
  );
}
