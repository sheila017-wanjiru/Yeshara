import { Wrap, Eyebrow } from "@/components/primitives/Section";
import { ButtonLink } from "@/components/primitives/Button";

/**
 * The closing call to action, shared by every content route.
 *
 * Three verbs across the whole site and no more: Get Started (primary
 * everywhere), Explore Tokenization, Contact Us.
 */
export function ClosingCta({
  title,
  lead,
}: {
  title?: React.ReactNode;
  lead?: string;
} = {}) {
  return (
    <section className="relative overflow-hidden border-t border-border-1">
      <div
        aria-hidden="true"
        data-print="hide"
        className="pointer-events-none absolute -bottom-[360px] left-1/2 h-[720px] w-[1280px] -translate-x-1/2 bg-[radial-gradient(ellipse_40%_46%_at_50%_50%,rgba(166,225,226,.12),transparent_68%),radial-gradient(ellipse_60%_62%_at_50%_52%,rgba(82,185,188,.13),transparent_68%),radial-gradient(ellipse_88%_84%_at_50%_56%,rgba(35,93,95,.14),transparent_74%)]"
      />
      <Wrap>
        <div className="relative mx-auto max-w-[730px] py-s9 text-center lg:py-s10">
          <span className="flex justify-center">
            <Eyebrow>Get Started</Eyebrow>
          </span>
          <h2 className="d1 mt-s5 text-[clamp(2.1rem,4.4vw,3.5rem)]">
            {title ?? (
              <>
                Let&rsquo;s tokenize <span className="tq">an asset</span>.
              </>
            )}
          </h2>
          <p className="lead mt-s5">
            {lead ??
              "Tell us what you hold and who needs to be able to hold it. We will tell you honestly whether tokenization changes anything for that asset — and whether it can be done inside the current rules."}
          </p>
          <div className="mt-s7 flex flex-wrap justify-center gap-s3">
            <ButtonLink href="/get-started" withArrow className="max-sm:w-full">
              Get Started
            </ButtonLink>
            <ButtonLink href="/contact" variant="secondary" className="max-sm:w-full">
              Contact Us
            </ButtonLink>
          </div>
        </div>
      </Wrap>
    </section>
  );
}
