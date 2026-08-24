import Link from "next/link";
import { LegalPage } from "@/components/layout/LegalPage";
import { Chip } from "@/components/primitives/Chip";
import { buildMetadata } from "@/lib/seo";
import { SITE } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Cookie Policy",
  description:
    "Yeshara uses no tracking or advertising cookies. This page documents the cookieless analytics approach and the small number of functional cookies the site may set.",
  path: "/legal/cookies",
});

export default function CookiesPage() {
  return (
    <LegalPage
      title="Cookie Policy"
      updated="August 2026"
      currentPath="/legal/cookies"
      summary="This site sets no advertising cookies, no tracking cookies and no cross-site identifiers. Analytics are cookieless by design, which is why you are not being asked to dismiss a consent banner."
    >
      <div className="mb-s6">
        <Chip tone="confirmed">
          No tracking cookies · No advertising cookies · No consent banner
        </Chip>
      </div>

      <h2>1. The short version</h2>
      <p>
        We measure how many people visit which pages. We do not follow
        individuals around the internet, we do not build advertising profiles,
        and we do not share data with ad networks. Because the measurement sets
        no cookie and creates no persistent identifier, there is nothing to ask
        your consent for — so this site does not interrupt you with a banner.
      </p>

      <h2>2. What a cookie is</h2>
      <p>
        A cookie is a small file a website asks your browser to store and send
        back on later visits. Cookies can be useful — keeping you signed in, for
        example — and they can also be used to track behaviour across many
        different sites. It is the second use that consent regimes exist to
        control.
      </p>

      <h2>3. Analytics — cookieless</h2>
      <p>
        We use privacy-preserving, cookieless analytics. Each page view is
        counted without storing anything on your device and without assigning
        you an identifier that persists between visits or across websites. The
        data we see is aggregate: page, referrer, approximate country, device
        type.
      </p>
      <p>
        We cannot identify you from it, and neither can our analytics provider.
      </p>

      <h2>4. Cookies this site may set</h2>
      <table>
        <thead>
          <tr>
            <th>Cookie</th>
            <th>Purpose</th>
            <th>Duration</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>None at present</td>
            <td>
              The public website sets no cookies. If that changes — for example
              when signed-in accounts go live on this domain — the session
              cookie required to keep you signed in will be listed here before
              it is set.
            </td>
            <td>—</td>
          </tr>
        </tbody>
      </table>

      <h2>5. Strictly necessary cookies in future</h2>
      <p>
        Signed-in areas of the platform will require a session cookie. A cookie
        of that kind is strictly necessary to deliver a service you have asked
        for, and it does not track you across other websites. It will be
        documented in the table above when it is introduced.
      </p>

      <h2>6. Third parties</h2>
      <p>
        We embed no advertising pixels, no social media tracking scripts and no
        third-party comment or chat widgets on this website. Fonts are
        self-hosted, so your browser makes no request to a font provider when
        you load a page here.
      </p>

      <h2>7. Controlling cookies</h2>
      <p>
        Every major browser lets you block or delete cookies in its settings.
        Because this site does not depend on them, blocking cookies will not
        break anything you can reach here.
      </p>

      <h2>8. How this relates to your data rights</h2>
      <p>
        Personal data collected through this website — the fields you type into
        a form — is covered by our{" "}
        <Link href="/legal/privacy">Privacy Policy</Link>, which sets out the
        lawful basis for each use and the rights you hold under Kenya&rsquo;s
        Data Protection Act 2019.
      </p>

      <h2>9. Changes</h2>
      <p>
        If we ever introduce a cookie that is not strictly necessary, we will
        update this page and ask for your consent before setting it.
      </p>

      <h2>10. Contact</h2>
      <p>
        Questions: <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
      </p>
    </LegalPage>
  );
}
