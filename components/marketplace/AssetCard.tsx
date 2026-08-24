import Link from "next/link";
import type { AssetListing } from "@/lib/content/types";
import { ASSET_CLASS_LABEL } from "@/lib/content/assets";
import { Chip, type ChipTone } from "@/components/primitives/Chip";
import { EmptyBoxIcon } from "@/components/primitives/Icons";
import { ButtonLink } from "@/components/primitives/Button";

const STATUS_TONE: Record<AssetListing["status"], ChipTone> = {
  open: "confirmed",
  proposed: "neutral",
  closed: "neutral",
};

const STATUS_LABEL: Record<AssetListing["status"], string> = {
  open: "Open",
  proposed: "Proposed",
  closed: "Closed",
};

/**
 * A marketplace card. The whole card links to a public asset page.
 *
 * On the previous platform every card sent an unauthenticated visitor
 * to /login, so no property had a public page, nothing was shareable
 * and the marketplace generated no search traffic. Here the information
 * is public and only the subscribe action is gated.
 */
export function AssetCard({ asset }: { asset: AssetListing }) {
  return (
    <article className="flex flex-col gap-s4 bg-bg-2 p-s5 transition-colors duration-200 hover:bg-surface">
      <div className="flex items-start justify-between gap-s3">
        <div>
          <span className="font-mono text-[.6875rem] tracking-[.1em] text-tq-300">
            {ASSET_CLASS_LABEL[asset.assetClass]}
          </span>
          <h3 className="mt-2 font-display text-[1.08rem] font-bold tracking-[-.024em]">
            <Link
              href={`/marketplace/${asset.slug}`}
              className="transition-colors hover:text-tq-300"
            >
              {asset.title}
            </Link>
          </h3>
          <p className="mt-1.5 text-[.875rem] text-tx-3">{asset.location}</p>
        </div>
        <Chip tone={STATUS_TONE[asset.status]}>{STATUS_LABEL[asset.status]}</Chip>
      </div>

      <dl className="grid gap-[9px]">
        <Row label="Wrapper" value={asset.wrapper} />
        <Row label="Min. ticket" value={asset.minimumTicket} />
        <Row label="Title held by" value={asset.trustee} />
      </dl>

      <div>
        <div className="flex items-baseline justify-between text-[.8438rem]">
          <span className="font-mono text-[.6875rem] tracking-[.1em] text-tx-3">
            Allocation
          </span>
          <b className="font-display font-bold">{asset.allocationPercent}%</b>
        </div>
        <div
          className="mt-[7px] h-1 overflow-hidden rounded-[2px] bg-surface-3"
          role="img"
          aria-label={`${asset.allocationPercent}% allocated`}
        >
          <span
            className="block h-full rounded-[2px] bg-[linear-gradient(90deg,var(--tq-800),var(--tq-600)_46%,var(--tq-300))]"
            style={{ width: `${asset.allocationPercent}%` }}
          />
        </div>
      </div>

      <ButtonLink
        href={`/marketplace/${asset.slug}`}
        variant="secondary"
        size="xs"
        className="mt-auto"
      >
        View asset page
      </ButtonLink>
    </article>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  const unconfirmed = value.startsWith("[");
  return (
    <div className="flex items-baseline justify-between text-[.8438rem]">
      <dt className="font-mono text-[.6875rem] tracking-[.1em] text-tx-3">{label}</dt>
      <dd
        className={
          unconfirmed
            ? "m-0 font-mono text-[.75rem] text-warn"
            : "m-0 font-display font-bold"
        }
      >
        {value}
      </dd>
    </div>
  );
}

/**
 * The launch state of the marketplace. Says plainly that there is
 * nothing listed yet and gives the visitor something to do about it.
 */
export function EmptyState() {
  return (
    <div className="px-s5 py-s9 text-center">
      <span className="mx-auto mb-s5 block h-12 w-12 text-tx-3">
        <EmptyBoxIcon />
      </span>
      <h3 className="d3">No assets listed yet</h3>
      <p className="bd mx-auto mt-s3 max-w-[46ch]">
        The first tokenized properties are in structuring. Join the register and
        you will hear before the primary sale opens.
      </p>
      <ButtonLink href="/get-started" size="sm" withArrow className="mt-s5">
        Join the investor register
      </ButtonLink>
    </div>
  );
}
