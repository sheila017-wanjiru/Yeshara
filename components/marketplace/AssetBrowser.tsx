"use client";

import { useState } from "react";
import type { AssetListing, AssetClass } from "@/lib/content/types";
import { ASSET_CLASS_FILTERS } from "@/lib/content/assets";
import { AssetCard, EmptyState } from "./AssetCard";

/**
 * The marketplace listing browser.
 *
 * The category filter is component state, not a URL parameter, and the
 * controls are buttons rather than links. Two constraints force this and
 * they pull in opposite directions:
 *
 *   Reading searchParams on the server makes the route dynamic, and Next
 *   streams metadata for dynamic routes into the body rather than the
 *   head — which left this page's meta description outside <head>.
 *
 *   Reading them on the client with useSearchParams makes Next bail out
 *   of server-rendering everything inside the Suspense boundary, which
 *   emptied the listings out of the HTML altogether.
 *
 * Plain state avoids both: the page stays static so its metadata sits in
 * the head, and this component server-renders normally so every listing
 * is in the HTML with JavaScript disabled.
 *
 * A filter is a control, not a destination, so aria-pressed buttons are
 * the right semantics — this is not the onClick-navigation the build
 * rules prohibit. The cost is that a filtered view has no shareable URL.
 * If that becomes worth having, the fix is static routes per class, not
 * a query parameter.
 */
export function AssetBrowser({ assets }: { assets: AssetListing[] }) {
  const [selectedId, setSelectedId] = useState<string>(ASSET_CLASS_FILTERS[0].id);

  const selected =
    ASSET_CLASS_FILTERS.find((f) => f.id === selectedId) ?? ASSET_CLASS_FILTERS[0];

  const value = selected.value as AssetClass | undefined;
  const visible = value ? assets.filter((a) => a.assetClass === value) : assets;

  return (
    <>
      <div
        role="group"
        aria-label="Filter by asset class"
        className="flex flex-wrap items-center gap-s4 border-b border-border-1 p-s4 sm:px-s5"
      >
        <div className="flex flex-wrap gap-1">
          {ASSET_CLASS_FILTERS.map((filter) => {
            const active = filter.id === selected.id;
            return (
              <button
                key={filter.id}
                type="button"
                aria-pressed={active}
                onClick={() => setSelectedId(filter.id)}
                className={`flex h-[34px] items-center rounded-[10px] border px-[15px] font-display text-[.8125rem] font-semibold transition-all duration-200 ${
                  active
                    ? "border-tq-500/35 bg-tq-500/[.07] text-tq-300"
                    : "border-transparent text-tx-2 hover:bg-white/[.045] hover:text-tx"
                }`}
              >
                {filter.label}
              </button>
            );
          })}
        </div>
        <div className="flex-1" />
        <p className="mono text-tx-3" aria-live="polite">
          {visible.length} {visible.length === 1 ? "listing" : "listings"}
        </p>
      </div>

      {visible.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="grid gap-px bg-border-1 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((asset) => (
            <AssetCard key={asset.slug} asset={asset} />
          ))}
        </div>
      )}
    </>
  );
}
