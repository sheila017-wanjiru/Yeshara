import type { Metadata } from "next";
import { SITE } from "./site";

/**
 * Per-route metadata builder.
 *
 * The previous site returned byte-identical <title>, description and
 * Open Graph tags on every route, so no page could rank or be shared
 * distinctly. Every route now calls this with its own copy, and the
 * canonical always resolves against SITE.url.
 */
export function buildMetadata(input: {
  title: string;
  description: string;
  path: string;
  /** Overrides the generated OG image. Rarely needed. */
  ogImage?: string;
  type?: "website" | "article";
  publishedTime?: string;
  noIndex?: boolean;
}): Metadata {
  const { title, description, path, type = "website", publishedTime, noIndex } = input;
  const url = new URL(path, SITE.url).toString();
  const ogImage =
    input.ogImage ??
    `/og?${new URLSearchParams({ title, subtitle: description.slice(0, 140) }).toString()}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    ...(noIndex ? { robots: { index: false, follow: true } } : {}),
    openGraph: {
      title,
      description,
      url,
      siteName: SITE.legalName,
      locale: "en_KE",
      type,
      ...(publishedTime ? { publishedTime } : {}),
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
      // No `site` handle: the live site declared @Yeshara with no link
      // to that account anywhere. Reinstated only once confirmed.
    },
  };
}

/** Absolute URL helper for JSON-LD and sitemap entries. */
export function absoluteUrl(path: string): string {
  return new URL(path, SITE.url).toString();
}
