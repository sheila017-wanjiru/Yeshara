import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import { getAssetSlugs } from "@/lib/content/assets";
import { getInsights } from "@/lib/content/insights";

/**
 * Generated from the real route table on www.yeshara.com.
 *
 * The previous sitemap pointed at app.yeshara.network — a different
 * subdomain from the marketing site — which split ranking signals
 * across two hosts and listed URLs that did not serve public content.
 * Only canonical www.yeshara.com routes appear here.
 *
 * Sign-in and the newsletter confirm/unsubscribe routes are excluded:
 * they are noindex and have nothing to rank.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticRoutes: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
    { path: "/", priority: 1, changeFrequency: "weekly" },
    { path: "/tokenization", priority: 0.9, changeFrequency: "monthly" },
    { path: "/marketplace", priority: 0.9, changeFrequency: "daily" },
    { path: "/insights", priority: 0.8, changeFrequency: "weekly" },
    { path: "/about", priority: 0.8, changeFrequency: "monthly" },
    { path: "/investors", priority: 0.8, changeFrequency: "monthly" },
    { path: "/contact", priority: 0.7, changeFrequency: "yearly" },
    { path: "/get-started", priority: 0.7, changeFrequency: "yearly" },
    { path: "/legal/terms", priority: 0.4, changeFrequency: "yearly" },
    { path: "/legal/privacy", priority: 0.4, changeFrequency: "yearly" },
    { path: "/legal/risk-disclosure", priority: 0.5, changeFrequency: "yearly" },
    { path: "/legal/cookies", priority: 0.3, changeFrequency: "yearly" },
  ];

  const [assetSlugs, insights] = await Promise.all([getAssetSlugs(), getInsights()]);

  return [
    ...staticRoutes.map((route) => ({
      url: new URL(route.path, SITE.url).toString(),
      lastModified: now,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    })),
    ...assetSlugs.map((slug) => ({
      url: new URL(`/marketplace/${slug}`, SITE.url).toString(),
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...insights.map((article) => ({
      url: new URL(`/insights/${article.slug}`, SITE.url).toString(),
      lastModified: new Date(article.publishedAt),
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}
