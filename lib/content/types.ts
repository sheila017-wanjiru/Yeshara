/**
 * CONTENT MODEL
 *
 * These types are the contract between the site and whatever supplies
 * its content. The accessors in this directory are the only place a
 * route reads content from — no listing, article or partner is written
 * into a component.
 *
 * The current implementation is file-backed so the site builds and
 * deploys today. Swapping to Sanity or Payload means reimplementing the
 * handful of `get*` functions against the CMS client and changing
 * nothing else: every route already awaits them.
 *
 * See §11 of the build spec.
 */

export type AssetClass = "real-estate" | "financial-instruments";
export type PropertyType = "residential" | "commercial" | "mixed-use";
export type InstrumentType = "equity" | "debt" | "hybrid";
export type ListingStatus = "open" | "closed" | "proposed";

export type AssetDocument = {
  label: string;
  /** Path or CMS asset URL. */
  file: string;
  required: boolean;
};

export type AssetImage = {
  src: string;
  /** Descriptive alt text. Never decorative on a listing. */
  alt: string;
  width: number;
  height: number;
};

export type AssetListing = {
  slug: string;
  title: string;
  assetClass: AssetClass;
  propertyType?: PropertyType;
  instrumentType?: InstrumentType;
  location: string;
  /** The legal wrapper, e.g. "SPV — trust". */
  wrapper: string;
  trustee: string;
  tokensIssued: number;
  minimumTicket: string;
  allocationPercent: number;
  status: ListingStatus;
  summary: string;
  /** Rich text as HTML from the CMS, or plain paragraphs. */
  description: string;
  documents: AssetDocument[];
  images: AssetImage[];
  /** What has been independently verified about this listing. */
  verificationNotes: string;
  publishedAt: string;
};

export type Insight = {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  /** Rich text as HTML. */
  body: string;
  readingMinutes: number;
  author: string;
  publishedAt: string;
  seo: {
    title: string;
    description: string;
  };
};

export type PartnerCategory =
  | "trustee"
  | "custodian"
  | "auditor"
  | "legal"
  | "compliance-tech"
  | "payments"
  | "network"
  | "institution";

export type Partner = {
  name: string;
  category: PartnerCategory;
  logoLight: string;
  logoDark: string;
  /** True when the supplied logo is dark-on-transparent and would
   *  disappear against a dark card. Renders a white plate. */
  needsPlate: boolean;
  url?: string;
  /**
   * Gates rendering entirely. A partner belt is the most screenshotted
   * element on a site like this — "we integrate with them" is not "they
   * are a partner". Only a signed permission sets this true.
   */
  logoPermissionOnFile: boolean;
};
