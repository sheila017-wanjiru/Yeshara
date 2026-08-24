import { LegalPage } from "@/components/layout/LegalPage";
import { Placeholder } from "@/components/primitives/Chip";
import { buildMetadata } from "@/lib/seo";
import { SITE } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Privacy Policy",
  description:
    "How Yeshara Tokens Limited collects, uses, stores and shares personal data under Kenya's Data Protection Act 2019, and the rights every data subject holds.",
  path: "/legal/privacy",
});

const UPDATED = "August 2026";

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      updated={UPDATED}
      currentPath="/legal/privacy"
      summary="What personal data Yeshara Tokens Limited collects, why we collect it, how long we keep it, who we share it with, and the rights you hold over it under Kenya's Data Protection Act 2019."
    >
      <p>
        This policy explains how {SITE.legalName} (&ldquo;Yeshara&rdquo;,
        &ldquo;we&rdquo;, &ldquo;us&rdquo;) handles personal data collected
        through {SITE.url} and the services offered on it. It is written to meet
        the obligations of a data controller under the{" "}
        <strong>Data Protection Act 2019</strong> of Kenya and the Data
        Protection (General) Regulations 2021.
      </p>

      <p>
        It covers this website only. Where a separate agreement governs an
        investment, a listing or an account, that agreement&rsquo;s data terms
        apply in addition to this policy.
      </p>

      <h2>1. Who is responsible for your data</h2>
      <p>
        {SITE.legalName} is the data controller for the personal data described
        in this policy.
      </p>
      <ul>
        <li>
          <strong>Registered office:</strong> {SITE.address.inline},{" "}
          {SITE.address.country}
        </li>
        <li>
          <strong>Email:</strong>{" "}
          <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
        </li>
        <li>
          <strong>Telephone:</strong>{" "}
          <a href={`tel:${SITE.phoneHref}`}>{SITE.phone}</a>
        </li>
      </ul>

      <Placeholder className="my-s5">
        [DATA PROTECTION OFFICER — NAME &amp; CONTACT] · [ODPC REGISTRATION
        NUMBER]
      </Placeholder>

      <p>
        Where the Act requires a registered data controller or a designated Data
        Protection Officer, those details will be published here. Until they
        are, direct any data protection enquiry to{" "}
        <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
      </p>

      <h2>2. What we collect</h2>
      <p>We collect only what a stated purpose requires.</p>

      <h3>2.1 Data you give us</h3>
      <table>
        <thead>
          <tr>
            <th>Where</th>
            <th>What</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Contact form</td>
            <td>Name, email address, phone number, company name (optional), and the message you write.</td>
          </tr>
          <tr>
            <td>Get Started form</td>
            <td>The same fields, plus the role you select — Investor or Asset Owner.</td>
          </tr>
          <tr>
            <td>Newsletter</td>
            <td>Email address only.</td>
          </tr>
        </tbody>
      </table>

      <h3>2.2 Data collected automatically</h3>
      <p>
        Our web server records the IP address a request arrives from and the
        browser user-agent string. Both are used to rate-limit form submissions
        and to investigate abuse. We do not build behavioural profiles and we do
        not sell data to anyone, for any purpose.
      </p>
      <p>
        Analytics on this site are <strong>cookieless</strong>: no cookie is set
        for measurement, and no cross-site identifier is created. See our{" "}
        <a href="/legal/cookies">Cookie Policy</a>.
      </p>

      <h3>2.3 What we do not collect here</h3>
      <p>
        This website does not collect identity documents, financial account
        details, or payment card data. Know-Your-Customer and Anti-Money-
        Laundering verification happens inside the platform under a separate
        agreement and a separate notice.
      </p>

      <h2>3. Why we use it, and on what lawful basis</h2>
      <table>
        <thead>
          <tr>
            <th>Purpose</th>
            <th>Lawful basis (DPA 2019, s.30)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Replying to an enquiry you send us</td>
            <td>Your consent, and our legitimate interest in answering people who contact us.</td>
          </tr>
          <tr>
            <td>Sending Yeshara Insights</td>
            <td>Your consent, given by confirming the double opt-in email. Withdrawable at any time.</td>
          </tr>
          <tr>
            <td>Rate-limiting and abuse prevention</td>
            <td>Our legitimate interest in keeping the service available and secure.</td>
          </tr>
          <tr>
            <td>Meeting legal, regulatory and supervisory obligations</td>
            <td>Compliance with a legal obligation.</td>
          </tr>
        </tbody>
      </table>
      <p>
        We do not use your data for automated decision-making that produces a
        legal effect on you.
      </p>

      <h2>4. How long we keep it</h2>
      <ul>
        <li>
          <strong>Enquiries:</strong> 24 months from your last contact with us,
          then deleted, unless a live commercial or regulatory matter requires
          us to keep them longer.
        </li>
        <li>
          <strong>Newsletter:</strong> until you unsubscribe. Unconfirmed
          sign-ups are deleted after 30 days.
        </li>
        <li>
          <strong>Server logs:</strong> 90 days.
        </li>
      </ul>

      <h2>5. Who we share it with</h2>
      <p>
        We share personal data only with processors acting on our written
        instructions, and only as far as the purpose requires. We do not sell,
        rent or trade personal data.
      </p>
      <ul>
        <li>
          <strong>Hosting and content delivery</strong> — serving this website.
        </li>
        <li>
          <strong>Database hosting</strong> — storing form submissions and
          newsletter subscriptions.
        </li>
        <li>
          <strong>Transactional email</strong> — delivering confirmation emails
          and enquiry notifications.
        </li>
        <li>
          <strong>Cookieless analytics</strong> — aggregate traffic measurement
          with no personal identifier.
        </li>
      </ul>

      <Placeholder className="my-s5">
        [NAMED PROCESSORS — HOSTING, DATABASE, EMAIL, ANALYTICS] · [DATA
        PROCESSING AGREEMENTS ON FILE]
      </Placeholder>

      <p>
        We may also disclose data where we are required to by law, by a court,
        or by a regulator including the Capital Markets Authority or the Office
        of the Data Protection Commissioner.
      </p>

      <h2>6. Transfers outside Kenya</h2>
      <p>
        Some of the processors above operate infrastructure outside Kenya. Where
        personal data is transferred out of the country, we do so on the basis
        of appropriate safeguards as required by sections 48 and 49 of the Data
        Protection Act 2019, including contractual protections with each
        processor and, where the Act requires it, your consent.
      </p>

      <h2>7. Your rights</h2>
      <p>Under Part V of the Data Protection Act 2019 you have the right to:</p>
      <ul>
        <li>be informed of the use to which your personal data is put;</li>
        <li>access the personal data we hold about you;</li>
        <li>object to the processing of all or part of your personal data;</li>
        <li>correct false or misleading data; and</li>
        <li>request deletion of false or misleading data about you.</li>
      </ul>
      <p>
        You may also withdraw consent at any time — every Insights email carries
        a working one-click unsubscribe link, and withdrawal does not affect
        processing carried out before you withdrew.
      </p>
      <p>
        To exercise any of these rights, email{" "}
        <a href={`mailto:${SITE.email}`}>{SITE.email}</a>. We respond within 30
        days. We may ask you to verify your identity first, so that we do not
        disclose your data to someone else.
      </p>
      <p>
        If you are not satisfied with our response, you may complain to the{" "}
        <strong>Office of the Data Protection Commissioner</strong> of Kenya.
      </p>

      <h2>8. Security</h2>
      <p>
        Data is transmitted over TLS, stored in access-controlled systems, and
        available only to the people who need it to do their work. No system is
        perfectly secure; where a breach is likely to result in real risk to
        you, we will notify you and the Office of the Data Protection
        Commissioner as the Act requires.
      </p>

      <h2>9. Children</h2>
      <p>
        This website is not directed at anyone under 18 and we do not knowingly
        collect data from children. If you believe a child has given us personal
        data, email us and we will delete it.
      </p>

      <h2>10. Changes to this policy</h2>
      <p>
        We will update this page when our practices change, and revise the date
        at the top. Where a change materially affects how we use data you have
        already given us, we will tell you directly.
      </p>

      <h2>11. Contact</h2>
      <p>
        Questions about this policy or about your data:{" "}
        <a href={`mailto:${SITE.email}`}>{SITE.email}</a>, or write to us at{" "}
        {SITE.address.inline}, {SITE.address.country}.
      </p>

      <Placeholder className="mt-s7">
        [LEGAL REVIEW REQUIRED BEFORE LAUNCH — THIS POLICY HAS NOT YET BEEN
        REVIEWED BY COUNSEL]
      </Placeholder>
    </LegalPage>
  );
}
