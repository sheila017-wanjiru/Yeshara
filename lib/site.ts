/**
 * Site-wide constants. Contact details, the canonical origin and the
 * navigation order all live here so no route invents its own.
 *
 * Every fact in this file traces to §9a of the build spec (confirmed
 * facts). Nothing here may be added without a source.
 */

export const SITE = {
  name: "Yeshara",
  legalName: "Yeshara Tokens Limited",
  /**
   * Canonical origin. The previous sitemap pointed at
   * app.yeshara.network — a different subdomain — which split ranking
   * signals across two hosts. Everything canonicalises here.
   */
  url: "https://www.yeshara.com",
  description:
    "Yeshara Tokens Limited converts real estate and financial instruments into secure, tradeable blockchain-based tokens, with title held by an independent trustee.",
  email: "info@yeshara.network",
  phone: "+254 103 102 336",
  phoneHref: "+254103102336",
  /** Single reconciled rendering. The old footer carried two. */
  address: {
    building: "Wu-Yi Plaza",
    street: "Galana Road",
    area: "Kilimani",
    city: "Nairobi",
    country: "Kenya",
    /** One-line form, used wherever the address appears inline. */
    inline: "Wu-Yi Plaza, Galana Road, Kilimani, Nairobi",
  },
  linkedin: "https://www.linkedin.com/company/yeshara-tokens-ltd/",
  whatsapp: "https://wa.me/254103102336",
  /**
   * The live site declares <meta name="twitter:site" content="@Yeshara">
   * with no link to that account anywhere. Left null until the client
   * confirms the account exists — a tag pointing at an unowned handle
   * is worse than no tag.
   */
  twitter: null as string | null,
} as const;

/** Nav order is fixed — it mirrors the previous site so returning
 *  visitors are not disoriented. */
export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/tokenization", label: "Tokenization" },
  { href: "/marketplace", label: "Asset Marketplace" },
  { href: "/insights", label: "Insights" },
  { href: "/about", label: "About Us" },
  { href: "/investors", label: "Investors" },
  { href: "/contact", label: "Contact Us" },
] as const;

export const FOOTER_NAV = {
  platform: [
    { href: "/tokenization", label: "Tokenization" },
    { href: "/marketplace", label: "Asset Marketplace" },
    { href: "/tokenization#lifecycle", label: "Lifecycle" },
    { href: "/tokenization#infrastructure", label: "Infrastructure" },
  ],
  company: [
    { href: "/about", label: "About Us" },
    { href: "/investors", label: "Investors" },
    { href: "/insights", label: "Insights" },
    { href: "/about#compliance", label: "Compliance" },
  ],
  support: [
    { href: "/contact", label: "Contact Us" },
    { href: "/get-started", label: "Get Started" },
    { href: "/tokenization#faq", label: "FAQs" },
    { href: `mailto:${SITE.email}`, label: SITE.email },
  ],
  legal: [
    { href: "/legal/terms", label: "Terms of Service" },
    { href: "/legal/privacy", label: "Privacy Policy" },
    { href: "/legal/cookies", label: "Cookie Policy" },
    { href: "/legal/risk-disclosure", label: "Risk Disclosure" },
  ],
} as const;

/**
 * Payment methods, per the site FAQ (§9a).
 */
export const PAYMENT_METHODS = [
  "Mobile money",
  "Bank transfer",
  "Card",
  "Payment links",
  "Virtual cards",
] as const;

/**
 * Account roles. The platform recognises exactly two (§9a, /register).
 */
export const ROLES = [
  {
    value: "investor",
    label: "Investor",
    blurb: "I want to buy into tokenized assets.",
    formTitle: "Open an investor account",
    messageLabel: "What are you looking for?",
    messagePrompt: "Asset classes, ticket size, timeline.",
  },
  {
    value: "asset-owner",
    label: "Asset Owner",
    blurb: "I hold property or an instrument to tokenize.",
    formTitle: "Tokenize an asset",
    messageLabel: "Tell us about the asset",
    messagePrompt: "Type, location, valuation, and whether title is clean.",
  },
] as const;

export type RoleValue = (typeof ROLES)[number]["value"];
