import type { AssetListing, AssetClass } from "./types";

/**
 * ASSET LISTINGS
 *
 * Deliberately empty at launch.
 *
 * All 8 records in the previous platform's listings endpoint are demo
 * fixtures: "Test new Asset", Lorem Ipsum bodies, a seller named
 * "Seller Test", an address at "123 Main Street, Cityville", and a
 * Nairobi listing describing a location "near 183 and I35" — a Texas
 * highway. Their prices do not reconcile. None of them is imported.
 *
 * The marketplace launches with the empty state, which is more credible
 * than six fabricated listings and does not require anyone to later
 * explain why a Texas highway was in a Nairobi property page.
 *
 * When real inventory arrives, replace the body of getAssets() with a
 * CMS query. Every route already awaits these functions, so nothing
 * else changes. The Sanity schema matching this type is in
 * sanity/schemas/.
 */
const LISTINGS: AssetListing[] = [];

export async function getAssets(filter?: {
  assetClass?: AssetClass;
}): Promise<AssetListing[]> {
  const all = LISTINGS.filter((listing) => listing.status !== "closed");
  const filtered = filter?.assetClass
    ? all.filter((listing) => listing.assetClass === filter.assetClass)
    : all;
  return [...filtered].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export async function getAsset(slug: string): Promise<AssetListing | null> {
  return LISTINGS.find((listing) => listing.slug === slug) ?? null;
}

export async function getAssetSlugs(): Promise<string[]> {
  return LISTINGS.map((listing) => listing.slug);
}

export const ASSET_CLASS_FILTERS = [
  { id: "all", label: "All", value: undefined },
  { id: "real-estate", label: "Real Estate", value: "real-estate" as const },
  {
    id: "financial-instruments",
    label: "Financial Instruments",
    value: "financial-instruments" as const,
  },
] as const;

export const ASSET_CLASS_LABEL: Record<AssetClass, string> = {
  "real-estate": "Real Estate",
  "financial-instruments": "Financial Instruments",
};
