/**
 * CONFIRMED FACTS AND PUBLISHED FIGURES
 *
 * Every factual statement about Yeshara on this site traces to this
 * file, and every entry here carries a source. Nothing may be added
 * without one. Anything not confirmed ships as a visible amber
 * Placeholder — never as invented copy, and never silently omitted.
 *
 * See §9 of the build spec.
 */

export type Verification = "confirmed" | "direction" | "placeholder";

/* ── §9d — MARKET FIGURES ──────────────────────────────────────────
 *
 * The previous homepage ran a ticker claiming the Kenyan real estate
 * market is $1 trillion, with residential at $693B and commercial at
 * $79B. The White Paper says $40 billion. Those are twenty-five times
 * apart; Kenya's entire GDP is roughly $110bn; and $693B + $79B is
 * $772B, not $1T, yet they were labelled 90% and 10%. None of the six
 * figures carried a source.
 *
 * Only the White Paper set is published, and every figure carries a
 * visible source line. The $1T set does not appear anywhere on this
 * site and must not be reinstated without a citation.
 * ────────────────────────────────────────────────────────────────── */

export const MARKET_FIGURES = [
  {
    value: "$40bn",
    label: "Kenyan real estate market",
    source: "White Paper 2025",
  },
  {
    value: "22%",
    label: "Urban homeownership in Kenya",
    source: "White Paper 2025",
  },
  {
    value: "$6bn",
    label: "Kenya mortgage market",
    source: "White Paper 2025",
  },
  {
    value: "$1.5bn",
    label: "Kenya fintech sector, growing 20% annually",
    source: "White Paper 2025",
  },
  {
    value: "$3.5bn → $19.4bn",
    label: "Global real estate tokenization, 2024 to 2033",
    source: "White Paper 2025",
  },
] as const;

/** The single source line rendered beneath any block of the above. */
export const MARKET_FIGURES_SOURCE =
  "All figures as stated in the Yeshara Tokens Limited White Paper (2025). " +
  "Market-size figures previously published on yeshara.com differ from these by " +
  "more than an order of magnitude and are withheld pending reconciliation and citation.";

/* ── §9a — CONFIRMED FACTS ───────────────────────────────────────── */

export const REGULATORY = {
  /** Write "admitted to the CMA Regulatory Sandbox" — never "regulated
   *  fintech", which is wrong and has consequences under the VASP Act. */
  admission:
    "Yeshara Tokens Limited was admitted to the Capital Markets Authority Regulatory Sandbox in December 2024 for a twelve-month test of a blockchain-enabled real estate tokenization platform.",
  /** Stated wherever the admission is mentioned. Non-negotiable. */
  caveat: "Sandbox admission is a supervised test, not a licence.",
  month: "December 2024",
  source: "CMA public announcement",
} as const;

export const TICKET = {
  from: "KES 100,000",
  to: "KES 1,000",
  source: "White Paper 2025",
} as const;

/** The sliding ticker. Preserved brand device from the live site,
 *  repopulated with defensible statements only. */
export const TICKER_ITEMS = [
  { value: "Dec 2024", label: "Admitted — CMA Regulatory Sandbox" },
  { value: "KES 1,000", label: "Minimum ticket, from KES 100,000" },
  { value: "Trustee", label: "Independent title & fund custody" },
  { value: "$40bn", label: "Kenyan real estate market" },
  { value: "22%", label: "Urban homeownership in Kenya" },
  { value: "2", label: "Asset classes — property & instruments" },
] as const;

/** The four figures shown as the stat grid on Home and Investors. */
export const HEADLINE_STATS = [
  { value: "$40bn", label: "Kenyan real estate market" },
  { value: "22%", label: "Urban homeownership in Kenya" },
  { value: "KES 1,000", label: "Ticket size, down from KES 100,000" },
  {
    value: "$3.5bn → $19.4bn",
    label: "Global real estate tokenization, 2024 to 2033",
  },
] as const;

/** Core values, White Paper 2025. */
export const VALUES = [
  {
    name: "Simplicity",
    body: "Converting an asset into tokens should be a process an owner can follow, not a technical initiation. Plain documents, defined stages, named counterparties.",
  },
  {
    name: "Compliance",
    body: "The regulatory work is the product. Structuring, KYC and AML, trustee oversight and reporting come before the token, not after it.",
  },
  {
    name: "Democracy",
    body: "Kenya's property market has one entry price: the whole building. Fractional ownership changes who is allowed in the room.",
  },
] as const;

/** Vision and Mission, migrated as written from the existing /about. */
export const VISION = [
  {
    title: "Digital assets will be everywhere",
    body: "Within five years, all financial asset classes will be possible on-chain — starting from Kenyan electronic securities.",
  },
  {
    title: "Established players will still matter",
    body: "Financial institutions persist and are well positioned within the regulatory framework. This is not a replacement story.",
  },
  {
    title: "Some intermediaries will disappear",
    body: "As cooperation moves on-chain, data silos and unnecessary consolidation break up.",
  },
] as const;

export const MISSION = [
  {
    title: "Empower the financial industry",
    body: "Tools for players moving toward a digital-asset future, rather than around them.",
  },
  {
    title: "Bring digital assets to the mainstream",
    body: "Connect assets that lack capital-market access to market infrastructure.",
  },
  {
    title: "Build something that lasts",
    body: "New asset classes and use cases, developed in step with the regulation rather than ahead of it.",
  },
] as const;

/** The three-party structure. Yeshara holds neither the asset nor the
 *  money — the first question an institution asks. */
export const PARTIES = [
  {
    name: "Property Owner",
    accent: "clay" as const,
    role: "Brings the asset and the paperwork that proves it.",
    duties: [
      "Property listing",
      "Provide documentation",
      "Receive proceeds",
      "Share disclosures",
    ],
  },
  {
    name: "Yeshara Platform",
    accent: "teal" as const,
    role: "Issues, onboards, operates the marketplace and carries the compliance obligation.",
    duties: [
      "Token issuance",
      "Investor onboarding",
      "Marketplace operations",
      "Regulatory compliance",
    ],
  },
  {
    name: "Trustee",
    accent: "gold" as const,
    role: "Holds title and investor funds. Independent of Yeshara by design.",
    duties: [
      "Asset custody",
      "Oversight governance",
      "Manage distributions",
      "Protect investors",
    ],
  },
] as const;

/** The five-phase lifecycle, White Paper 2025. */
export const LIFECYCLE = [
  {
    title: "Deal Structuring",
    summary: "Define the asset and its legal wrapper.",
    body: "The asset owner specifies what is being tokenized and the structure is set — typically an SPV or trust, with investment manager, administrator, auditor, custodian and legal advisors appointed. The decisions about the token's legal wrapper are made here, and they change depending on whether the asset is classified as a security, a commodity or otherwise.",
  },
  {
    title: "Digitization",
    summary: "Immobilise the asset, mint the token, create the register.",
    body: "The tangible asset is immobilised by transferring it to appointed corporate trustees. A digital twin is written on the blockchain as a token, and a digital Register of Members is created recording who holds what. The register is uploaded to the blockchain as the ownership record.",
  },
  {
    title: "Primary Market",
    summary: "Distribute tokens to investors for capital.",
    body: "Tokens are offered to investors in return for investment capital, and their details are recorded in the Register of Members. Investors hold tokens in a digital wallet while the physical asset stays immobilised with the trustee.",
  },
  {
    title: "Corporate Actions",
    summary: "Service the asset for the life of the token.",
    body: "Regulatory, tax and accounting reporting, periodic net asset value determination, dividend distributions and shareholder voting — automated through smart contracts embedded in the token, and continuing until maturity or redemption.",
  },
  {
    title: "Secondary Market",
    summary: "Enable transfer between holders.",
    body: "A holder exchanges tokens with another investor, directly or on the marketplace. This is the stage that turns a fractional certificate into a liquid position, and it is the part most tokenization platforms under-build.",
  },
] as const;

/**
 * §9c — the placeholder register. Each of these renders visibly on the
 * page where it belongs. Listed here so the set is auditable in one
 * place and nothing gets quietly dropped during a content pass.
 */
export const OPEN_PLACEHOLDERS = [
  "LICENSING STATUS — VASP ACT 2025 / VASP REGULATIONS 2026",
  "BLOCKCHAIN & TOKEN STANDARD",
  "TRUSTEE NAME",
  "CUSTODIAN",
  "AUDITOR",
  "PARTNER LOGOS",
  "COMPLIANCE PROVIDERS",
  "TEAM — NAMES, ROLES, PHOTOGRAPHS",
  "FOUNDING DATE",
  "COMPANY OVERVIEW",
  "FUNDING HISTORY",
  "FINANCIAL METRICS",
  "WHITE PAPER — PUBLIC EDITION",
  "SECURITY CERTIFICATIONS",
  "AUDIT REPORTS",
  "RISK DISCLOSURES",
  "CONTACT ROUTING",
  '"YESHARA EXCHANGE PLATFORM" — CONFIRM IF SEPARATE PRODUCT',
] as const;
