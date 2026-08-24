import Script from "next/script";

/**
 * Cookieless analytics (Plausible).
 *
 * Sets no cookie and creates no cross-site identifier, which is what
 * lets the site launch without a consent banner — and what the Cookie
 * Policy states. If this is ever swapped for something that does set a
 * cookie, that page has to change in the same commit.
 *
 * Renders nothing when the domain is unset, so no request is made in
 * development or in a preview deployment.
 */
export function Analytics() {
  const domain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
  if (!domain) return null;

  return (
    <Script
      defer
      data-domain={domain}
      src="https://plausible.io/js/script.js"
      strategy="afterInteractive"
    />
  );
}
