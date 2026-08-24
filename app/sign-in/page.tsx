import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/primitives/Section";
import { Placeholder } from "@/components/primitives/Chip";
import { ButtonLink } from "@/components/primitives/Button";
import { SITE } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Sign In",
  description:
    "Sign in to your Yeshara investor or seller account to view holdings, distributions and marketplace access.",
  path: "/sign-in",
  // The platform application lives on its own host. This page explains
  // where to go rather than competing with it in search results.
  noIndex: true,
});

export default function SignInPage() {
  return (
    <>
      <PageHero
        eyebrow="Account"
        title={
          <>
            Sign in to <span className="tq">your account</span>.
          </>
        }
        lead="Holdings, distributions and marketplace access live in the Yeshara platform application. Everything on this website — including every asset page — is readable without an account."
      />

      <Section labelledBy="signin-heading">
        <h2 id="signin-heading" className="absolute left-[-9999px]">
          Account access
        </h2>

        <div className="grid gap-s6 lg:grid-cols-2">
          <div className="rounded-[20px] border border-border-1 bg-surface p-s6 elev">
            <h3 className="d3">Existing accounts</h3>
            <p className="bd mt-s3">
              The platform recognises two roles, Investor and Seller. Sign-in is
              handled by the platform application, not by this website.
            </p>
            <Placeholder className="mt-s5">
              [PLATFORM SIGN-IN URL — CONFIRM THE PRODUCTION HOST BEFORE LAUNCH]
            </Placeholder>
            <p className="mono mt-s4 leading-[1.9] text-tx-3">
              No credentials are collected on this page.
            </p>
          </div>

          <div className="rounded-[20px] border border-border-1 bg-surface p-s6 elev">
            <h3 className="d3">No account yet</h3>
            <p className="bd mt-s3">
              Join the register and you will hear before the first primary sale
              opens. Verification comes later, and only if there is something to
              verify you for.
            </p>
            <ButtonLink href="/get-started" fullWidth withArrow className="mt-s5">
              Get Started
            </ButtonLink>
            <p className="sm mt-s5 border-t border-border-1 pt-s5">
              Trouble signing in? Email{" "}
              <a href={`mailto:${SITE.email}`} className="text-tq-300 underline underline-offset-2">
                {SITE.email}
              </a>{" "}
              or read the{" "}
              <Link href="/legal/terms" className="text-tq-300 underline underline-offset-2">
                Terms of Service
              </Link>
              .
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}
