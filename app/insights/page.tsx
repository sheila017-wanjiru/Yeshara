import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/primitives/Section";
import { Chip, Placeholder } from "@/components/primitives/Chip";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { ClosingCta } from "@/components/layout/ClosingCta";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { getInsights, PLANNED_TOPICS } from "@/lib/content/insights";

export const metadata = buildMetadata({
  title: "Insights — tokenization, property and regulation",
  description:
    "Yeshara Insights: working notes on real-world asset tokenization, Kenyan property, trustee structures and the VASP Act 2025 regulatory perimeter.",
  path: "/insights",
});

export default async function InsightsPage() {
  const articles = await getInsights();

  return (
    <>
      <PageHero
        eyebrow="Yeshara Insights"
        title={
          <>
            Writing on tokenization, <span className="tq">property and regulation</span>.
          </>
        }
        lead="Working notes on how tokenized ownership actually operates in Kenya — the structures, the perimeter, and the parts most platforms leave out."
      />

      <Section labelledBy="articles-heading">
        <h2 id="articles-heading" className="d2 max-w-[16ch]">
          {articles.length > 0 ? (
            <>
              Latest <span className="tq">articles</span>.
            </>
          ) : (
            <>
              Nothing published <span className="tq">yet</span>.
            </>
          )}
        </h2>

        {articles.length > 0 ? (
          <div className="mt-s7 grid gap-s5 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <article
                key={article.slug}
                className="flex flex-col rounded-[20px] border border-border-1 bg-surface p-s6 transition-[border-color] duration-[250ms] elev hover:border-tq-500/35"
              >
                <div className="flex flex-wrap items-center gap-s4">
                  <Chip tone="brand">{article.category}</Chip>
                  <span className="mono text-tx-3">{article.readingMinutes} min read</span>
                </div>
                <h3 className="d3 mt-s4">
                  <Link
                    href={`/insights/${article.slug}`}
                    className="transition-colors hover:text-tq-300"
                  >
                    {article.title}
                  </Link>
                </h3>
                <p className="bd mt-s3">{article.excerpt}</p>
                <p className="mono mt-auto pt-s5 text-tx-3">
                  <time dateTime={article.publishedAt}>
                    {new Date(article.publishedAt).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </time>
                </p>
              </article>
            ))}
          </div>
        ) : (
          <>
            <p className="lead mt-s5 max-w-[62ch]">
              The previous blog route crashed on load and held no recoverable
              articles, so this section starts from zero rather than importing
              a broken archive. Nothing is published here until it is written.
            </p>

            <ScrollReveal>
              <h3 className="d3 mt-s8">Planned coverage</h3>
              <p className="sm mt-s3 max-w-[62ch]">
                Subjects in the pipeline. These are titles, not articles —
                none of them is written yet, and none links anywhere.
              </p>
              <ul className="mt-s5 list-none border-t border-border-1 p-0">
                {PLANNED_TOPICS.map((topic) => (
                  <li
                    key={topic.title}
                    className="flex flex-wrap items-center justify-between gap-s4 border-b border-border-1 py-s5"
                  >
                    <span>
                      <span className="mono block text-tq-300">{topic.category}</span>
                      <span className="mt-1.5 block font-display text-[1.02rem] font-bold tracking-[-.024em] text-tx-2">
                        {topic.title}
                      </span>
                    </span>
                    <Chip tone="placeholder">Not yet written</Chip>
                  </li>
                ))}
              </ul>
              <Placeholder className="mt-s6">
                [THREE TO FIVE INSIGHTS ARTICLES REQUIRED FOR A CREDIBLE LAUNCH]
              </Placeholder>
            </ScrollReveal>
          </>
        )}
      </Section>

      <ClosingCta
        title={
          <>
            Get these <span className="tq">as they publish</span>.
          </>
        }
        lead="Yeshara Insights goes out monthly. Double opt-in, one-click unsubscribe, no third-party tracking."
      />

      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Insights", path: "/insights" },
        ]}
      />
    </>
  );
}
