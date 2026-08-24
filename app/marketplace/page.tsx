import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/layout/PageHero";
import { Section, Wrap } from "@/components/primitives/Section";
import { ButtonLink } from "@/components/primitives/Button";
import { AssetCard, EmptyState } from "@/components/marketplace/AssetCard";
import { ClosingCta } from "@/components/layout/ClosingCta";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { getAssets, ASSET_CLASS_FILTERS } from "@/lib/content/assets";
import type { AssetClass } from "@/lib/content/types";

export const metadata = buildMetadata({
  title: "Asset Marketplace — tokenized real estate and instruments",
  description:
    "Primary distribution and secondary transfer of tokenized Kenyan real estate and financial instruments, between holders who have cleared KYC and AML. Every listing has a public page.",
  path: "/marketplace",
});

export default async function MarketplacePage({
  searchParams,
}: {
  searchParams: Promise<{ class?: string }>;
}) {
  const params = await searchParams;
  const selected = ASSET_CLASS_FILTERS.find((f) => f.id === params.class)
    ?? ASSET_CLASS_FILTERS[0];

  const assets = await getAssets({
    assetClass: selected.value as AssetClass | undefined,
  });

  return (
    <>
      <PageHero
        eyebrow="Asset Marketplace"
        title={
          <>
            Where tokenized assets <span className="tq">meet investors</span>.
          </>
        }
        lead="Primary distribution and secondary transfer, between holders who have cleared KYC and AML. Every listing gets a public page — valuation, documents, trustee, rights — with only the subscribe action behind sign-in."
      />

      <Section labelledBy="listings-heading">
        <h2 id="listings-heading" className="sr-only absolute left-[-9999px]">
          Listings
        </h2>

        <div className="overflow-hidden rounded-[20px] border border-border-1 bg-[linear-gradient(180deg,#0C1617_0%,#04090A_100%)] shadow-[inset_0_1px_0_rgba(166,225,226,.06)]">
          {/* Category filter as real links, not client state: filtering
              works with JavaScript disabled and each view is linkable. */}
          <nav
            aria-label="Filter by asset class"
            className="flex flex-wrap items-center gap-s4 border-b border-border-1 p-s4 sm:px-s5"
          >
            <div className="flex flex-wrap gap-1">
              {ASSET_CLASS_FILTERS.map((filter) => {
                const active = filter.id === selected.id;
                return (
                  <Link
                    key={filter.id}
                    href={filter.id === "all" ? "/marketplace" : `/marketplace?class=${filter.id}`}
                    aria-current={active ? "page" : undefined}
                    className={`flex h-[34px] items-center rounded-[10px] border px-[15px] font-display text-[.8125rem] font-semibold transition-all duration-200 ${
                      active
                        ? "border-tq-500/35 bg-tq-500/[.07] text-tq-300"
                        : "border-transparent text-tx-2 hover:bg-white/[.045] hover:text-tx"
                    }`}
                  >
                    {filter.label}
                  </Link>
                );
              })}
            </div>
            <div className="flex-1" />
            <p className="mono text-tx-3">
              {assets.length} {assets.length === 1 ? "listing" : "listings"}
            </p>
          </nav>

          {assets.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="grid gap-px bg-border-1 sm:grid-cols-2 lg:grid-cols-3">
              {assets.map((asset) => (
                <AssetCard key={asset.slug} asset={asset} />
              ))}
            </div>
          )}

          <div className="flex flex-wrap items-center justify-between gap-s4 border-t border-border-1 p-s4 sm:px-s5">
            <p className="sm text-tx-3">
              Read the{" "}
              <Link
                href="/legal/risk-disclosure"
                className="text-tq-300 underline underline-offset-2"
              >
                Risk Disclosure
              </Link>{" "}
              before subscribing to any asset. Capital is at risk and liquidity
              is not guaranteed.
            </p>
            <ButtonLink href="/get-started" variant="secondary" size="xs">
              Request marketplace access
            </ButtonLink>
          </div>
        </div>
      </Section>

      <Section band labelledBy="how-heading">
        <Wrap className="!px-0">
          <h2 id="how-heading" className="d2 max-w-[16ch]">
            What a listing <span className="tq">has to show</span>.
          </h2>
          <p className="lead mt-s4 max-w-[62ch]">
            Every asset page states the instrument, the legal wrapper, the
            trustee holding title, the minimum ticket and the full document
            list, before anyone is asked to sign in. Information is public;
            subscription is gated.
          </p>
          <ul className="mt-s6 grid list-none gap-s4 p-0 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["Instrument & wrapper", "What you are actually buying, and the SPV or trust that holds it."],
              ["Trustee", "Who holds title and investor funds, independent of Yeshara."],
              ["Minimum ticket", "The smallest position available in that asset."],
              ["Documents", "Valuation, title, structure and disclosures, listed in full."],
            ].map(([title, body]) => (
              <li
                key={title}
                className="rounded-card border border-border-1 bg-surface p-s5 elev"
              >
                <b className="block font-display text-[1rem] font-bold tracking-[-.02em]">
                  {title}
                </b>
                <p className="mt-2 text-[.875rem] leading-[1.58] text-tx-2">{body}</p>
              </li>
            ))}
          </ul>
        </Wrap>
      </Section>

      <ClosingCta
        title={
          <>
            Hear about the <span className="tq">first listing</span>.
          </>
        }
        lead="Join the investor register and you will be told before the primary sale opens, not after it closes."
      />

      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Asset Marketplace", path: "/marketplace" },
        ]}
      />
    </>
  );
}
