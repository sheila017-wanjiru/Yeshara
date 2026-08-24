import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/primitives/Section";
import { Chip } from "@/components/primitives/Chip";
import { ButtonLink } from "@/components/primitives/Button";
import { unsubscribeNewsletter, isDatabaseConfigured } from "@/lib/db";
import { SITE } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Unsubscribe",
  description: "Unsubscribe from Yeshara Insights.",
  path: "/newsletter/unsubscribe",
  noIndex: true,
});

export default async function UnsubscribePage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token } = await searchParams;

  let done = false;
  if (token && isDatabaseConfigured()) {
    try {
      done = await unsubscribeNewsletter(token);
    } catch (error) {
      console.error("[newsletter] unsubscribe failed", error);
    }
  }

  return (
    <>
      <PageHero
        eyebrow="Yeshara Insights"
        title={
          done ? (
            <>
              You&rsquo;re <span className="tq">unsubscribed</span>.
            </>
          ) : (
            <>
              Nothing to <span className="tq">unsubscribe</span>.
            </>
          )
        }
        lead={
          done
            ? "You will receive no further Yeshara Insights emails. No confirmation step, no retention offer — it is done."
            : "That link is invalid or the address was already unsubscribed. Either way you will receive no further Insights emails from it."
        }
      />

      <Section>
        <Chip tone={done ? "confirmed" : "neutral"}>
          {done ? "Unsubscribed" : "No action needed"}
        </Chip>
        <p className="bd mt-s5 max-w-[62ch]">
          Unsubscribing stops the newsletter only. If you would like the personal
          data we hold about you deleted, email{" "}
          <a href={`mailto:${SITE.email}`} className="text-tq-300 underline underline-offset-2">
            {SITE.email}
          </a>{" "}
          — that right is set out in our Privacy Policy.
        </p>
        <div className="mt-s6 flex flex-wrap gap-s3">
          <ButtonLink href="/legal/privacy" variant="secondary">
            Privacy Policy
          </ButtonLink>
        </div>
      </Section>
    </>
  );
}
