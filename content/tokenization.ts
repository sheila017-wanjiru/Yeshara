/**
 * Content for the tokenization narrative: the two flows, the
 * comparisons, the infrastructure layers, the compliance items, the
 * FAQ and the ecosystem participants.
 *
 * Everything traceable to §9a, the White Paper 2025, the workshop deck
 * or the existing site. Unconfirmed values appear in [BRACKETS] and are
 * rendered as visible amber placeholders, never filled in.
 */

/** §10 — the two journeys, as the existing site describes them. */
export const FLOWS = [
  {
    id: "asset-owner",
    label: "For Asset Owners",
    steps: [
      { title: "Registration", body: "Fast, secure sign-up tailored to an asset owner." },
      {
        title: "Digital Asset Creation",
        body: "Set the terms, the valuation and the certifications behind the listing.",
      },
      {
        title: "Complete KYC",
        body: "Submit identification for verification before anything is issued.",
      },
      {
        title: "Attract Investors",
        body: "Build interest in the listing across retail, diaspora and institutional buyers.",
      },
      {
        title: "Investment Management",
        body: "Track engagement and automate the profit share to holders.",
      },
    ],
    benefitsHeading: "What an asset owner gets",
    benefits: [
      "A larger, more divisible investor network",
      "Faster, cheaper capital raises",
      "Securities issuance without a costly central securities depository",
      "Fees earned on secondary trades of issued securities",
    ],
  },
  {
    id: "investor",
    label: "For Investors",
    steps: [
      { title: "Registration", body: "Create an account in under a minute." },
      {
        title: "Complete KYC",
        body: "Identity verification, applied once and enforced at every transfer.",
      },
      {
        title: "Browse & Select",
        body: "Review valuations and documents, then choose an asset.",
      },
      {
        title: "Make Payment",
        body: "Checkout by mobile money, bank transfer or card. Tokens are issued to your wallet.",
      },
      {
        title: "Manage Investment",
        body: "Transparent tracking of holdings and distributions from one dashboard.",
      },
      {
        title: "Resell",
        body: "List your position for resale on the secondary marketplace.",
      },
    ],
    benefitsHeading: "What an investor gets",
    benefits: [
      "Access to assets that were previously out of reach",
      "A simple experience with no added friction",
      "Fewer intermediaries and lower fees",
      "A secondary market to exit through",
    ],
  },
] as const;

/** Two comparison datasets, toggled. */
export const COMPARISONS = [
  {
    label: "vs Traditional REITs",
    a: "Real Estate Tokenization",
    b: "Traditional REITs",
    rows: [
      ["Entry", "Micro-investment enabled", "High entry barriers"],
      ["Control", "High investor control", "Low control — assets bundled"],
      ["Liquidity", "Enhanced market liquidity", "Limited — long lock-in"],
      ["Pricing", "Transparent, set on the secondary market", "Centralised price setting"],
      ["Transfers", "Instant asset transfers", "Slow asset transfers"],
      ["Costs", "Low transaction costs", "High intermediary fees"],
      ["Hours", "24/7 trading access", "Restricted trading hours"],
      ["Exit", "Direct entry and exit", "Difficult exit process"],
      ["Ownership", "Fractionalised", "All-or-nothing"],
    ],
  },
  {
    label: "vs Traditional Finance",
    a: "Asset Tokenization",
    b: "Traditional Finance",
    rows: [
      [
        "Accessibility",
        "Fractional entry from KES 1,000, open to diaspora",
        "High minimums and geographic constraints",
      ],
      [
        "Liquidity",
        "Near-instant settlement and a secondary market",
        "Slow settlement, limited exit before disposal",
      ],
      [
        "Cross-border",
        "Reachable by verified holders in any market",
        "Correspondent banking and currency friction",
      ],
      [
        "Security",
        "Immutable record, rules enforced by smart contract",
        "Paper title and manual reconciliation",
      ],
    ],
  },
] as const;

export const COMPARISON_SOURCE =
  "Comparisons as set out in the Yeshara Real Estate Tokenization workshop deck and the " +
  "current yeshara.com homepage. REIT characteristics vary by issuer and jurisdiction; " +
  "this is a general contrast, not investment advice.";

/** The three infrastructure layers. */
export const INFRASTRUCTURE = [
  {
    icon: "cube",
    title: "Powered by Blockchain",
    caption: "immutable",
    body: "The Register of Members and every transfer are written to a distributed ledger — logged, traceable and auditable, live around the clock.",
  },
  {
    icon: "bars",
    title: "Yeshara Marketplace",
    caption: "trading",
    body: "Primary distribution and secondary transfer between verified holders, with pricing set by the market rather than by a manager.",
  },
  {
    icon: "vault",
    title: "Custodial & Payment Rails",
    caption: "rails",
    body: "Title and investor funds held by an independent trustee; subscriptions settled by mobile money, bank transfer or card.",
  },
] as const;

/** Compliance items. Every one of these is factual or explicitly hedged. */
export const COMPLIANCE = [
  {
    title: "Admitted to the CMA Regulatory Sandbox",
    body: "Yeshara Tokens Limited was admitted in December 2024 to test a blockchain-enabled real estate tokenization platform. Sandbox admission is a supervised test, not a licence.",
  },
  {
    title: "Integrated KYC and AML protocols",
    body: "Identity verification and anti-money-laundering screening applied at onboarding and enforced at every transfer, rather than assembled per deal.",
  },
  {
    title: "Trustee oversight",
    body: "An independent trustee holds title and investor funds under fiduciary duty, separating asset protection from platform operations.",
  },
  {
    title: "Data privacy and cybersecurity",
    body: "Encryption and multi-factor authentication protect holder data and assets, under Kenya's Data Protection Act 2019.",
  },
  {
    title: "Inside Kenya's virtual asset framework",
    body: "Engaged through the VASP Act 2025 and the VASP Regulations 2026, and in CMA innovation processes, rather than operating outside the perimeter.",
  },
  {
    title: "Compliance tooling built with the regulator",
    body: "Reporting and audit-trail tools developed collaboratively, so supervision is designed into the platform instead of retrofitted to it.",
  },
] as const;

/**
 * FAQ, condensed from the existing site's fourteen items. Bracketed
 * values render as visible amber placeholders — a non-answer stated
 * plainly costs less credibility than an invented one.
 */
export const FAQ = [
  {
    question: "What is Yeshara's platform?",
    answer:
      "A blockchain-based platform that converts real-world assets — primarily real estate — into fractional, tradeable digital tokens. It automates paper-based processes and records ownership on an immutable ledger, with title held by an independent trustee.",
  },
  {
    question: "How does real estate tokenization work?",
    answer:
      "Title is transferred to a trustee and held there. A token is then issued representing a defined fraction of ownership and income. Investors buy and hold the tokens; the trustee holds the property. Tokens can be transferred between verified holders without re-running the conveyance.",
  },
  {
    question: "What blockchain does Yeshara use?",
    answer:
      "[BLOCKCHAIN AND TOKEN STANDARD TO BE CONFIRMED] — this is currently undisclosed and should be stated plainly before launch. Institutional counterparties will ask, and a non-answer costs more credibility than any particular chain would.",
  },
  {
    question: "How is Yeshara regulated?",
    answer:
      "Yeshara Tokens Limited was admitted to the Capital Markets Authority Regulatory Sandbox in December 2024. Sandbox admission is a supervised test environment, not a licence. Security token issuance follows the same legislation as any securities issuance in Kenya. [LICENSING STATUS UNDER VASP ACT 2025 TO BE CONFIRMED]",
  },
  {
    question: "What are the risks?",
    answer:
      "Property values can fall and future value is unpredictable. An asset may not generate the income projected. Regulation may change. Secondary market demand is not guaranteed, so a position may take time to exit. Yeshara is not a registered broker-dealer or investment advisor and does not provide investment advice or guarantee any return.",
  },
  {
    question: "What is the minimum investment?",
    answer:
      "The objective stated in the White Paper 2025 is to bring the ticket size down from KES 100,000 to KES 1,000. The minimum for any individual asset is shown on that asset's page.",
  },
  {
    question: "How do I invest?",
    answer:
      "Create an account, complete KYC, fund it by mobile money, bank transfer or card, then browse assets and purchase tokens. Holdings and distributions are tracked from one dashboard.",
  },
  {
    question: "Can I sell my tokens?",
    answer:
      "Yes — through the secondary marketplace, to another holder who has cleared KYC and AML. Liquidity depends on demand at the time; it is not guaranteed.",
  },
  {
    question: "Who holds the title to the property?",
    answer:
      "An independent trustee, under fiduciary duty and separately from Yeshara's own operations. Yeshara does not hold your asset and does not hold your money. [TRUSTEE NAME TO BE CONFIRMED]",
  },
  {
    question: "How do I withdraw earnings?",
    answer:
      "By bank transfer, subject to the regulations applying in your jurisdiction. [WITHDRAWAL RAILS AND SETTLEMENT UNIT TO BE CONFIRMED]",
  },
] as const;

/** Ecosystem participants, for the radial diagram. */
export const ECOSYSTEM = [
  {
    name: "Property Owners",
    body: "Bring the asset and the documentation that proves it. Receive access to investors they could not otherwise reach, without selling the whole building.",
  },
  {
    name: "Investors",
    body: "Hold tokens and receive distributions. Receive documented rights, a dashboard, and a transfer path that does not depend on one exit event.",
  },
  {
    name: "Trustee",
    body: "Holds title and investor funds under fiduciary duty. Receives a single, auditable Register of Members.",
  },
  {
    name: "Financial Institutions",
    body: "Originate, distribute or hold instruments. Receive issuance and settlement infrastructure without replacing core systems.",
  },
  {
    name: "Liquidity Providers",
    body: "Quote and absorb tokens on the marketplace. Receive verified counterparties and instruments with readable transfer rules.",
  },
  {
    name: "Payment Providers",
    body: "Move the cash leg across mobile money, bank and card. Receive settlement instructions tied to the same register as the token transfer.",
  },
  {
    name: "Compliance Providers",
    body: "Supply identity, screening, monitoring and automated reporting. Receive one integration covering every instrument on the platform.",
  },
  {
    name: "Blockchain Networks",
    body: "Carry the register and execute transfers. The specific network remains undisclosed — [BLOCKCHAIN TO BE CONFIRMED].",
  },
] as const;
