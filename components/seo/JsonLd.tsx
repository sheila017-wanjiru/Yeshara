import { SITE } from "@/lib/site";
import { absoluteUrl } from "@/lib/seo";

/**
 * Structured data. Emitted as a script tag in the server-rendered HTML
 * so retrieval agents and search crawlers read it without executing
 * anything.
 */
function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // Server-generated from typed objects — no user input reaches this.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function OrganizationJsonLd() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Organization",
        name: SITE.legalName,
        alternateName: SITE.name,
        url: SITE.url,
        logo: absoluteUrl("/icon.svg"),
        description: SITE.description,
        email: SITE.email,
        telephone: SITE.phone,
        address: {
          "@type": "PostalAddress",
          streetAddress: `${SITE.address.building}, ${SITE.address.street}`,
          addressLocality: SITE.address.area,
          addressRegion: SITE.address.city,
          addressCountry: "KE",
        },
        // Only accounts that demonstrably exist and are linked from the
        // site. The @Yeshara Twitter handle stays out until confirmed.
        sameAs: [SITE.linkedin],
      }}
    />
  );
}

export function WebSiteJsonLd() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: SITE.legalName,
        url: SITE.url,
        inLanguage: "en",
        publisher: { "@type": "Organization", name: SITE.legalName },
      }}
    />
  );
}

export function BreadcrumbJsonLd({
  items,
}: {
  items: { name: string; path: string }[];
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.name,
          item: absoluteUrl(item.path),
        })),
      }}
    />
  );
}

export function FaqJsonLd({
  items,
}: {
  items: { question: string; answer: string }[];
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: items.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
      }}
    />
  );
}

export function ArticleJsonLd({
  title,
  description,
  path,
  publishedAt,
  author,
}: {
  title: string;
  description: string;
  path: string;
  publishedAt: string;
  author: string;
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Article",
        headline: title,
        description,
        datePublished: publishedAt,
        dateModified: publishedAt,
        author: { "@type": "Organization", name: author },
        publisher: {
          "@type": "Organization",
          name: SITE.legalName,
          logo: { "@type": "ImageObject", url: absoluteUrl("/icon.svg") },
        },
        mainEntityOfPage: { "@type": "WebPage", "@id": absoluteUrl(path) },
      }}
    />
  );
}

export function FinancialProductJsonLd({
  name,
  description,
  path,
  category,
}: {
  name: string;
  description: string;
  path: string;
  category: string;
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "FinancialProduct",
        name,
        description,
        category,
        url: absoluteUrl(path),
        provider: { "@type": "Organization", name: SITE.legalName, url: SITE.url },
      }}
    />
  );
}
