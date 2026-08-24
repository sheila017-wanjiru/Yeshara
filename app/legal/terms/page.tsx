import Link from "next/link";
import { LegalPage, SandboxNote } from "@/components/layout/LegalPage";
import { Placeholder } from "@/components/primitives/Chip";
import { buildMetadata } from "@/lib/seo";
import { SITE } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Terms of Service",
  description:
    "The terms governing use of the Yeshara Tokens Limited website and platform, including the risk acknowledgements every user accepts and the limits of our regulatory status.",
  path: "/legal/terms",
});

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Service"
      updated="August 2026"
      currentPath="/legal/terms"
      summary="The terms on which you may use this website and the Yeshara platform, the risks you acknowledge in doing so, and what Yeshara is and is not authorised to do."
    >
      <SandboxNote />

      <h2>1. Who we are</h2>
      <p>
        {SITE.legalName} is a company registered in Kenya with its office at{" "}
        {SITE.address.inline}. We operate a platform that converts real-world
        assets into blockchain-based tokens, with title to the underlying asset
        held by an independent trustee.
      </p>

      <h2>2. Our regulatory status</h2>
      <p>
        <strong>
          Yeshara is not a registered broker-dealer or investment advisor.
        </strong>{" "}
        Nothing on this website is investment advice, a recommendation, or an
        offer or solicitation to buy or sell any security. We do not assess
        whether any asset is suitable for you. Take your own legal, tax and
        financial advice before committing money.
      </p>
      <p>
        Yeshara Tokens Limited was admitted to the Capital Markets Authority
        Regulatory Sandbox in December 2024. Sandbox admission is a supervised
        test environment, not a licence, and it does not amount to CMA approval
        or endorsement of any asset, token or transaction.
      </p>

      <Placeholder className="my-s5">
        [LICENSING STATUS — VASP ACT 2025 / VASP REGULATIONS 2026]
      </Placeholder>

      <h2>3. Risk acknowledgements</h2>
      <p>
        By using this platform you acknowledge and accept each of the following.
        They are set out in full on our{" "}
        <Link href="/legal/risk-disclosure">Risk Disclosure</Link> page, which
        forms part of these terms.
      </p>
      <ol>
        <li>
          <strong>Asset values can fall.</strong> Property and financial
          instrument values move in both directions and future value cannot be
          predicted. You may get back less than you put in.
        </li>
        <li>
          <strong>Income is not guaranteed.</strong> An asset may not generate
          the rental, coupon or other income projected for it.
        </li>
        <li>
          <strong>Regulation may change.</strong> The legal treatment of
          tokenized assets in Kenya is developing, and change may affect how a
          token can be held, transferred or redeemed.
        </li>
        <li>
          <strong>Liquidity is not guaranteed.</strong> Secondary market demand
          depends on there being a willing verified buyer at the time you wish
          to sell. A position may take time to exit, or may not be exitable at
          the price you want.
        </li>
      </ol>

      <h2>4. Eligibility and verification</h2>
      <p>
        You must be at least 18 and legally able to enter a contract. Access to
        primary subscription and secondary transfer requires you to complete
        identity verification and anti-money-laundering screening. We may
        decline, suspend or terminate access where verification cannot be
        completed or where we are required to do so by law.
      </p>

      <h2>5. Your account</h2>
      <p>
        You are responsible for the accuracy of the information you give us,
        for keeping your credentials secure, and for activity carried out under
        your account. Tell us immediately at{" "}
        <a href={`mailto:${SITE.email}`}>{SITE.email}</a> if you believe your
        account has been compromised.
      </p>

      <h2>6. The role of the trustee</h2>
      <p>
        Yeshara does not hold your asset and does not hold your money. Title to
        a tokenized asset and investor funds are held by an independent trustee
        under fiduciary duty, separately from Yeshara&rsquo;s own operations.
      </p>

      <Placeholder className="my-s5">[TRUSTEE NAME] · [CUSTODIAN] · [AUDITOR]</Placeholder>

      <h2>7. Acceptable use</h2>
      <p>You may not use this website or the platform to:</p>
      <ul>
        <li>break any applicable law, or evade sanctions or AML controls;</li>
        <li>impersonate another person or misstate your identity;</li>
        <li>
          interfere with the service — including scraping at a rate that
          degrades it, probing for vulnerabilities, or attempting to gain
          unauthorised access; or
        </li>
        <li>
          reproduce our content commercially without written permission.
        </li>
      </ul>

      <h2>8. Intellectual property</h2>
      <p>
        The Yeshara name, the cowrie mark, and the content of this website are
        owned by {SITE.legalName} or licensed to us. You may read, quote with
        attribution, and share links. You may not present our material as your
        own.
      </p>

      <h2>9. Limitation of liability</h2>
      <p>
        Nothing in these terms excludes liability that cannot lawfully be
        excluded, including for fraud. Subject to that, we are not liable for
        investment losses arising from a decision you made, for the acts of
        third parties including trustees, custodians and payment providers, or
        for indirect or consequential loss.
      </p>

      <h2>10. Governing law</h2>
      <p>
        These terms are governed by the laws of Kenya, and the courts of Kenya
        have exclusive jurisdiction over any dispute arising from them.
      </p>

      <h2>11. Changes</h2>
      <p>
        We may update these terms. The date at the top of this page shows when
        they last changed. Continued use after a change means you accept the
        updated terms.
      </p>

      <h2>12. Contact</h2>
      <p>
        <a href={`mailto:${SITE.email}`}>{SITE.email}</a> · {SITE.phone} ·{" "}
        {SITE.address.inline}
      </p>

      <Placeholder className="mt-s7">
        [FULL TERMS OF SERVICE — MIGRATE VERBATIM FROM THE EXISTING SITE, THEN
        LEGAL REVIEW. The clauses above carry only what is independently
        confirmed; the source document has not been supplied, and no clause
        has been invented to fill the gap.]
      </Placeholder>

      <Placeholder className="mt-s4">
        [&ldquo;YESHARA COIN&rdquo; — ESCALATED, NOT BUILT. The existing Terms
        describe a 1:1 USD-pegged internal settlement unit that trades convert
        into and out of. A fiat-pegged unit is a licensable activity under the
        VASP Act 2025, whose transition period runs to 4 November 2026. No
        interface references it and no clause here restates it pending client
        instruction.]
      </Placeholder>
    </LegalPage>
  );
}
