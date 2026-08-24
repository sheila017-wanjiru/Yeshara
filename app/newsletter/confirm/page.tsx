import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/primitives/Section";
import { Chip } from "@/components/primitives/Chip";
import { ButtonLink } from "@/components/primitives/Button";
import { confirmNewsletterSignup, isDatabaseConfigured } from "@/lib/db";
import { SITE } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Confirm your subscription",
  description: "Confirm your Yeshara Insights subscription.",
  path: "/newsletter/confirm",
  noIndex: true,
});

export default async function ConfirmPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token } = await searchParams;

  let confirmed = false;
  if (token && isDatabaseConfigured()) {
    try {
      confirmed = await confirmNewsletterSignup(token);
    } catch (error) {
      console.error("[newsletter] confirmation failed", error);
    }
  }

  return (
    <>
      <PageHero
        eyebrow="Yeshara Insights"
        title={
          confirmed ? (
            <>
              You&rsquo;re <span className="tq">subscribed</span>.
            </>
          ) : (
            <>
              We couldn&rsquo;t <span className="tq">confirm that</span>.
            </>
          )
        }
        lead={
          confirmed
            ? "That's the double opt-in complete. Yeshara Insights goes out monthly, and every email carries a one-click unsubscribe link."
            : "That confirmation link is invalid, already used, or expired. Nothing has been subscribed."
        }
      />

      <Section>
        <Chip tone={confirmed ? "confirmed" : "placeholder"}>
          {confirmed ? "Subscription confirmed" : "Not confirmed"}
        </Chip>
        <div className="mt-s6 flex flex-wrap gap-s3">
          <ButtonLink href="/insights" withArrow>
            Read Insights
          </ButtonLink>
          {!confirmed ? (
            <ButtonLink href={`mailto:${SITE.email}`} variant="secondary">
              Email us instead
            </ButtonLink>
          ) : null}
        </div>
      </Section>
    </>
  );
}
