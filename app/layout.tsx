import type { Metadata, Viewport } from "next";
import { figtree, manrope, plexMono } from "@/lib/fonts";
import { SITE } from "@/lib/site";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { BrandDefs } from "@/components/layout/Logo";
import { OrganizationJsonLd, WebSiteJsonLd } from "@/components/seo/JsonLd";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.legalName} — Real-world asset tokenization in Kenya`,
    // Every route supplies its own title; this only frames it.
    template: `%s — ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.legalName,
  authors: [{ name: SITE.legalName }],
  creator: SITE.legalName,
  publisher: SITE.legalName,
  formatDetection: { telephone: true, address: false, email: true },
  // Icons come from the app/icon.svg file convention. A single 440x437
  // PNG previously served as header logo, favicon, OG image and Twitter
  // card at once; each of those now has its own correctly sized asset.
  manifest: "/site.webmanifest",
};

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${figtree.variable} ${manrope.variable} ${plexMono.variable}`}
    >
      <body>
        <a
          href="#main"
          className="absolute left-[-9999px] z-[300] rounded-[10px] bg-tq-300 px-[18px] py-3 font-display font-bold text-on-tq focus:left-4 focus:top-4"
        >
          Skip to content
        </a>
        <BrandDefs />
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        <OrganizationJsonLd />
        <WebSiteJsonLd />
      </body>
    </html>
  );
}
