import type { Insight } from "./types";

/**
 * INSIGHTS
 *
 * Deliberately empty at launch.
 *
 * The previous /blog route threw
 * `TypeError: Cannot read properties of null (reading 'map')` on load
 * and held nothing recoverable, so there is no archive to migrate. The
 * index renders its empty state until the client supplies articles —
 * §20 asks for three to five for a credible launch.
 *
 * When articles arrive, replace the body of getInsights() with a CMS
 * query returning the same shape. The Sanity schema is in
 * sanity/schemas/insight.ts.
 */
const INSIGHTS: Insight[] = [];

export async function getInsights(): Promise<Insight[]> {
  return [...INSIGHTS].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export async function getInsight(slug: string): Promise<Insight | null> {
  return INSIGHTS.find((article) => article.slug === slug) ?? null;
}

export async function getInsightSlugs(): Promise<string[]> {
  return INSIGHTS.map((article) => article.slug);
}

/**
 * The subjects Yeshara is positioned to write about. Shown on the empty
 * index as planned coverage — labelled as planned, not as published, so
 * no visitor mistakes a topic list for an article archive.
 */
export const PLANNED_TOPICS = [
  {
    category: "Regulation",
    title: "What Kenya's VASP Regulations 2026 change for tokenized real estate",
  },
  { category: "Tokenization", title: "What a Register of Members actually does" },
  {
    category: "Property",
    title: "Why 22% urban homeownership is a distribution problem",
  },
  { category: "Structure", title: "Why the trustee sits outside the platform" },
  {
    category: "Markets",
    title: "Liquidity is the part most RWA platforms under-build",
  },
] as const;
