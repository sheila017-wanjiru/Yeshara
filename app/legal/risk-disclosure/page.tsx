import Link from "next/link";
import { LegalPage, SandboxNote } from "@/components/layout/LegalPage";
import { Placeholder } from "@/components/primitives/Chip";
import { buildMetadata } from "@/lib/seo";
import { SITE } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Risk Disclosure",
  description:
    "The risks of holding tokenized real estate and financial instruments through Yeshara — value, income, liquidity, regulatory, technology and counterparty risk, stated plainly.",
  path: "/legal/risk-disclosure",
});

export default function RiskDisclosurePage() {
  return (
    <LegalPage
      title="Risk Disclosure"
      updated="August 2026"
      currentPath="/legal/risk-disclosure"
      summary="Tokenization changes the size of the ticket and the speed of the transfer. It does not remove the risk in the underlying asset. This page sets out what can go wrong."
    >
      <SandboxNote />

      <p>
        This disclosure applies to every asset listed on the Yeshara
        marketplace and is linked from each asset page. Read it before you
        subscribe to anything.{" "}
        <strong>
          You may get back less than you invest, and you may not be able to exit
          when you want to.
        </strong>
      </p>

      <h2>1. Capital is at risk</h2>
      <p>
        Property and financial instrument values move in both directions.
        Kenyan real estate is exposed to interest rates, currency movements,
        local supply and demand, and the condition and management of the
        individual building. Past performance says nothing about future value.
      </p>

      <h2>2. Income is projected, not promised</h2>
      <p>
        An asset may not generate the rental, coupon or other income projected
        for it. Tenants default, buildings sit empty, and maintenance costs
        arrive unannounced. Distributions depend on income actually received
        after costs.
      </p>

      <h2>3. Liquidity is not guaranteed</h2>
      <p>
        A secondary market exists, but it depends on a willing verified buyer
        being there at the moment you want to sell. There is no market maker
        obliged to quote you a price and no guarantee of a buyer at any
        particular price. Treat a token as an illiquid holding you may need to
        keep for the full term.
      </p>

      <h2>4. Regulation is developing</h2>
      <p>
        The legal treatment of tokenized assets in Kenya is being built while
        this market forms. The Virtual Asset Service Providers Act 2025 and the
        VASP Regulations 2026 change the perimeter, and further change is
        likely. A change in law may affect how a token is held, transferred,
        taxed or redeemed. Yeshara&rsquo;s participation in the CMA Regulatory
        Sandbox is a supervised test, not a licence, and confers no protection
        on your investment.
      </p>

      <Placeholder className="my-s5">
        [LICENSING STATUS — VASP ACT 2025 / VASP REGULATIONS 2026]
      </Placeholder>

      <h2>5. Counterparty and structural risk</h2>
      <p>
        Your holding depends on parties other than Yeshara performing: the
        trustee holding title and funds, the SPV or trust that wraps the asset,
        the auditor, the custodian and the payment providers. Failure or
        insolvency at any of them can affect your position, and separation of
        duties reduces that risk without removing it.
      </p>

      <Placeholder className="my-s5">[TRUSTEE NAME] · [CUSTODIAN] · [AUDITOR]</Placeholder>

      <h2>6. Technology risk</h2>
      <p>
        Tokens are recorded on a distributed ledger and governed by smart
        contracts. Software can contain defects, keys can be lost, and networks
        can suffer outages or reorganisation. A lost wallet credential may mean
        a lost holding.
      </p>

      <Placeholder className="my-s5">
        [BLOCKCHAIN &amp; TOKEN STANDARD] · [SECURITY CERTIFICATIONS] · [AUDIT
        REPORTS]
      </Placeholder>

      <h2>7. Valuation risk</h2>
      <p>
        Assets are valued periodically, not continuously. The price at which a
        token trades on the secondary market may differ — in either direction —
        from the most recent valuation of the underlying asset.
      </p>

      <h2>8. Concentration</h2>
      <p>
        A single tokenized building is a single asset in a single city in a
        single country. Fractional ownership lowers the ticket; it does not
        diversify the exposure.
      </p>

      <h2>9. No advice</h2>
      <p>
        {SITE.legalName} is not a registered broker-dealer or investment
        advisor and provides no investment, legal or tax advice. Nothing on
        this website is a recommendation or an assessment of suitability for
        you. Take independent advice.
      </p>

      <h2>10. Questions</h2>
      <p>
        If anything here is unclear, ask before you commit money:{" "}
        <a href={`mailto:${SITE.email}`}>{SITE.email}</a>. See also our{" "}
        <Link href="/legal/terms">Terms of Service</Link>.
      </p>

      <Placeholder className="mt-s7">
        [RISK DISCLOSURES — CLIENT AND LEGAL REVIEW REQUIRED BEFORE ANY LIVE
        LISTING]
      </Placeholder>
    </LegalPage>
  );
}
