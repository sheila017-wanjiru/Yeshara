import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

/**
 * AI retrieval agents are allowed by default.
 *
 * Being citable is the point: the whole build exists because the
 * previous site was invisible to both search engines and AI retrieval.
 * Blocking GPTBot, ClaudeBot and PerplexityBot would reintroduce half
 * of that problem deliberately. Confirm the stance with the client —
 * it is one line to reverse.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Nothing secret here — these routes are token-scoped or
        // duplicate content, and none of them should rank.
        disallow: ["/sign-in", "/newsletter/"],
      },
      { userAgent: "GPTBot", allow: "/" },
      { userAgent: "ClaudeBot", allow: "/" },
      { userAgent: "Claude-Web", allow: "/" },
      { userAgent: "PerplexityBot", allow: "/" },
      { userAgent: "Google-Extended", allow: "/" },
      { userAgent: "Applebot-Extended", allow: "/" },
      { userAgent: "CCBot", allow: "/" },
    ],
    sitemap: new URL("/sitemap.xml", SITE.url).toString(),
    host: SITE.url,
  };
}
