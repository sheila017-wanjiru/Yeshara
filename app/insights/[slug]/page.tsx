import Link from "next/link";
import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo";
import { Section, Wrap } from "@/components/primitives/Section";
import { Chip } from "@/components/primitives/Chip";
import { ClosingCta } from "@/components/layout/ClosingCta";
import { ArticleJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { getInsight, getInsightSlugs } from "@/lib/content/insights";
import { SITE } from "@/lib/site";

export async function generateStaticParams() {
  const slugs = await getInsightSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getInsight(slug);
  if (!article) {
    return buildMetadata({
      title: "Article not found",
      description: "This article is not available.",
      path: `/insights/${slug}`,
      noIndex: true,
    });
  }

  return buildMetadata({
    // The CMS seo fields override, so an article can carry a shorter
    // title tag than its on-page headline without duplicating copy.
    title: article.seo.title || article.title,
    description: article.seo.description || article.excerpt,
    path: `/insights/${article.slug}`,
    type: "article",
    publishedTime: article.publishedAt,
  });
}

export default async function InsightPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getInsight(slug);
  if (!article) notFound();

  const published = new Date(article.publishedAt).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <>
      <article>
        <section className="pb-s7 pt-[calc(var(--nav-h)+64px)]">
          <Wrap>
            <nav aria-label="Breadcrumb" className="mono text-tx-3">
              <Link href="/" className="transition-colors hover:text-tq-300">
                Home
              </Link>
              <span aria-hidden="true"> / </span>
              <Link href="/insights" className="transition-colors hover:text-tq-300">
                Insights
              </Link>
            </nav>

            <div className="mt-s5 flex flex-wrap items-center gap-s4">
              <Chip tone="brand">{article.category}</Chip>
              <span className="mono text-tx-3">{article.readingMinutes} min read</span>
            </div>

            <h1 className="d1 mt-s4 max-w-[20ch]">{article.title}</h1>
            <p className="lead mt-s5 max-w-[62ch]">{article.excerpt}</p>

            <p className="mono mt-s6 text-tx-3">
              {article.author} &nbsp;·&nbsp;{" "}
              <time dateTime={article.publishedAt}>{published}</time>
            </p>
          </Wrap>
        </section>

        <Section>
          <div
            className="prose"
            // Rich text from the CMS, sanitised at the content layer.
            dangerouslySetInnerHTML={{ __html: article.body }}
          />
        </Section>
      </article>

      <ClosingCta />

      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Insights", path: "/insights" },
          { name: article.title, path: `/insights/${article.slug}` },
        ]}
      />
      <ArticleJsonLd
        title={article.title}
        description={article.excerpt}
        path={`/insights/${article.slug}`}
        publishedAt={article.publishedAt}
        author={article.author || SITE.legalName}
      />
    </>
  );
}
