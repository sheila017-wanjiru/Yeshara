import { Marquee } from "@/components/motion/Marquee";
import { Chip } from "@/components/primitives/Chip";
import { Wrap, Eyebrow } from "@/components/primitives/Section";
import { getPartners, PARTNER_CATEGORIES } from "@/lib/content/partners";

/**
 * The partner belt.
 *
 * A partner belt is the most screenshotted element on a site like this,
 * and "we integrate with them" is not "they are a partner". A logo only
 * renders when logoPermissionOnFile is true; a category with no
 * permissioned partner renders as a labelled placeholder slot instead.
 *
 * Nothing here is currently permissioned, so every slot is a
 * placeholder. That is the correct state, not a bug.
 */
export async function PartnerBelt() {
  const partners = await getPartners();

  const slots = PARTNER_CATEGORIES.map((category, index) => {
    const partner = partners.find((p) => p.category === category.id);
    return { index, category, partner };
  });

  return (
    <section
      aria-labelledby="partner-belt-heading"
      className="border-y border-border-1 bg-bg-2 py-s6"
    >
      <Wrap>
        <div className="mb-s5 flex flex-wrap items-center justify-between gap-s4">
          <div>
            <span id="partner-belt-heading">
              <Eyebrow>Ecosystem partners</Eyebrow>
            </span>
            <p className="sm mt-2.5 max-w-[58ch]">
              Trustee, custodian, auditor, compliance technology, payment rails
              and networks. A slot fills once the relationship is confirmed in
              writing and logo permission is on file.
            </p>
          </div>
          <Chip tone="placeholder">
            Placeholder — no partners currently named
          </Chip>
        </div>
      </Wrap>

      <Wrap>
        <Marquee
          ariaLabel="Ecosystem partner categories"
          durationSeconds={52}
          gutterClass="mr-s4"
          items={slots.map(({ index, category, partner }) =>
            partner ? (
              <PartnerCell key={category.id} partner={partner} />
            ) : (
              <div
                key={category.id}
                className="flex min-h-[88px] w-[224px] flex-col items-center justify-center gap-1.5 break-words rounded-card border border-dashed border-border-2 bg-surface p-s4 text-center font-mono text-[.72rem] font-medium leading-[1.45] tracking-[.06em] text-tx-3 transition-[border-color,color,background-color] duration-[250ms] hover:border-tq-500/35 hover:bg-surface-2 hover:text-tq-500"
              >
                <em className="text-[.66rem] not-italic tracking-[.14em] text-tx-3">
                  [{String(index + 1).padStart(2, "0")}]
                </em>
                <span>{category.label.toUpperCase()}</span>
              </div>
            ),
          )}
        />
      </Wrap>
    </section>
  );
}

function PartnerCell({
  partner,
}: {
  partner: Awaited<ReturnType<typeof getPartners>>[number];
}) {
  const inner = (
    // needsPlate: a logo supplied dark-on-transparent vanishes against a
    // dark card, so it gets a white plate and its caption switches to ink.
    <div
      className={`flex min-h-[88px] w-[224px] items-center justify-center rounded-card border px-s5 ${
        partner.needsPlate ? "partner-plate" : "border-border-2 bg-surface"
      }`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={partner.logoDark}
        alt={partner.name}
        className="max-h-[34px] w-auto"
      />
    </div>
  );

  return partner.url ? (
    <a href={partner.url} rel="noopener">
      {inner}
    </a>
  ) : (
    inner
  );
}
