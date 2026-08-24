import type { Partner } from "./types";

export const PARTNER_CATEGORIES = [
  { id: "trustee", label: "Trustee" },
  { id: "custodian", label: "Custodian" },
  { id: "auditor", label: "Auditor" },
  { id: "legal", label: "Legal / tax advisors" },
  { id: "compliance-tech", label: "Compliance technology" },
  { id: "payments", label: "Payment rails" },
  { id: "network", label: "Blockchain network" },
  { id: "institution", label: "Financial institution" },
] as const;

/**
 * Partners currently permissioned for display.
 *
 * Deliberately empty. `logoPermissionOnFile` gates rendering, and no
 * relationship has been confirmed in writing with logo permission
 * granted. Every category therefore renders as a labelled placeholder
 * slot on the belt.
 *
 * Do not add an entry here on the strength of an integration or a
 * conversation — the flag means a signed permission exists.
 */
const PARTNERS: Partner[] = [];

export async function getPartners(): Promise<Partner[]> {
  // Only permissioned partners ever leave this function.
  return PARTNERS.filter((p) => p.logoPermissionOnFile);
}
