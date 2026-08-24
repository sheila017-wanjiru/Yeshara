import type { AssetListing } from "./types";

/**
 * FIXTURE GUARD
 *
 * The previous platform's listings endpoint held 8 records, all demo
 * fixtures: "Test new Asset", Lorem Ipsum bodies, a seller called
 * "Seller Test", an address at "123 Main Street, Cityville", and a
 * Nairobi listing describing a location "near 183 and I35" — a Texas
 * highway. Prices did not reconcile.
 *
 * None of that is imported today. This guard exists so that when a
 * feed is connected later, fixture data cannot reach the site quietly:
 * a listing that trips any rule below is dropped from the public
 * marketplace and logged with its reason, rather than published.
 *
 * It is a safety net, not a substitute for review. It catches the
 * obvious tells; a plausible-looking fabrication will still pass, which
 * is why every listing also carries verificationNotes.
 */

const FIXTURE_PATTERNS: { pattern: RegExp; reason: string }[] = [
  { pattern: /\blorem ipsum\b/i, reason: "Lorem Ipsum placeholder text" },
  { pattern: /\btest\s+(new\s+)?asset\b/i, reason: '"Test Asset" naming' },
  { pattern: /\bseller\s+test\b|\btest\s+seller\b/i, reason: '"Seller Test" placeholder party' },
  { pattern: /\b123\s+main\s+street\b/i, reason: "123 Main Street placeholder address" },
  { pattern: /\bcityville\b|\banytown\b|\bexample\s+city\b/i, reason: "Placeholder city name" },
  { pattern: /\bfoo\b|\bbar\b|\bbaz\b|\bqux\b/i, reason: "Placeholder token in copy" },
  { pattern: /\bdummy\b|\bplaceholder\b|\bsample\s+listing\b/i, reason: "Self-declared sample data" },
  { pattern: /\bI-?35\b|\bI-?183\b/i, reason: "US interstate reference in a Kenyan listing" },
  { pattern: /^\s*(test|asdf|qwerty|xxx+)\s*$/i, reason: "Keyboard-mash field value" },
];

export type FixtureVerdict =
  | { ok: true }
  | { ok: false; reasons: string[] };

/** Fields whose text is checked for fixture tells. */
function textFields(listing: AssetListing): string[] {
  return [
    listing.title,
    listing.location,
    listing.summary,
    listing.description,
    listing.wrapper,
    listing.trustee,
    listing.verificationNotes,
    ...listing.documents.map((d) => d.label),
  ];
}

export function inspectListing(listing: AssetListing): FixtureVerdict {
  const reasons: string[] = [];

  for (const field of textFields(listing)) {
    if (!field) continue;
    for (const { pattern, reason } of FIXTURE_PATTERNS) {
      if (pattern.test(field) && !reasons.includes(reason)) reasons.push(reason);
    }
  }

  // A listing with no named trustee is not publishable: the trustee
  // holding title is the structural claim the whole page rests on.
  if (!listing.trustee?.trim()) {
    reasons.push("No trustee named");
  }

  // Allocation outside 0-100 means the feed is not reconciled.
  if (
    !Number.isFinite(listing.allocationPercent) ||
    listing.allocationPercent < 0 ||
    listing.allocationPercent > 100
  ) {
    reasons.push(`Allocation out of range (${listing.allocationPercent})`);
  }

  if (!Number.isFinite(listing.tokensIssued) || listing.tokensIssued <= 0) {
    reasons.push(`Token count not a positive number (${listing.tokensIssued})`);
  }

  if (!listing.verificationNotes?.trim()) {
    reasons.push("No verification notes");
  }

  return reasons.length === 0 ? { ok: true } : { ok: false, reasons };
}

/**
 * Filters a batch, logging every rejection. Rejected listings are
 * withheld from the public site — never rendered with a warning badge,
 * because a fixture shown with a caveat is still a fabricated property
 * on a regulated firm's marketplace.
 */
export function rejectFixtures(listings: AssetListing[]): AssetListing[] {
  const kept: AssetListing[] = [];

  for (const listing of listings) {
    const verdict = inspectListing(listing);
    if (verdict.ok) {
      kept.push(listing);
    } else {
      console.warn(
        `[assets] withheld "${listing.slug}" — ${verdict.reasons.join("; ")}`,
      );
    }
  }

  return kept;
}
