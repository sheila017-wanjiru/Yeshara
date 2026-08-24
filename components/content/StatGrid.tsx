import { Marquee } from "@/components/motion/Marquee";
import { TICKER_ITEMS } from "@/content/facts";

/**
 * Display figures use tq-200 and nothing else does — that step is
 * reserved for stat numbers and counters.
 */
export function StatGrid({
  stats,
  className = "",
}: {
  stats: readonly { value: string; label: string }[];
  className?: string;
}) {
  return (
    <dl
      className={`grid grid-cols-1 gap-px overflow-hidden rounded-card border border-border-1 bg-border-1 sm:grid-cols-2 lg:grid-cols-4 ${className}`}
    >
      {stats.map((stat) => (
        <div key={stat.label} className="bg-bg-2 px-s5 py-s6 elev">
          <dt className="sr-only">{stat.label}</dt>
          <dd className="m-0">
            <b className="block break-words font-display text-[clamp(1.3rem,2.1vw,1.95rem)] font-extrabold leading-[1.14] tracking-[-.03em] text-tq-200">
              {stat.value}
            </b>
            <span className="mt-2 block text-[.875rem] leading-[1.5] text-tx-2">
              {stat.label}
            </span>
          </dd>
        </div>
      ))}
    </dl>
  );
}

/**
 * The sliding stat ticker — a brand device carried over from the live
 * site, repopulated with defensible statements only. The six unsourced
 * market-size figures it used to run are not here; see content/facts.ts.
 */
export function StatTicker() {
  return (
    <section
      aria-label="Key facts"
      className="border-y border-border-1 bg-bg-2"
    >
      <div className="py-s5">
        <Marquee
          ariaLabel="Key facts about Yeshara"
          durationSeconds={44}
          items={TICKER_ITEMS.map((item) => (
            <span key={item.label} className="flex items-baseline gap-s3 whitespace-nowrap">
              <b className="font-display text-[1.1rem] font-extrabold tracking-[-.02em] text-tq-200">
                {item.value}
              </b>
              <span className="font-mono text-[.75rem] uppercase tracking-[.09em] text-tx-3">
                {item.label}
              </span>
              <span
                aria-hidden="true"
                className="ml-s5 h-[5px] w-[5px] self-center rounded-full bg-border-2"
              />
            </span>
          ))}
        />
      </div>
    </section>
  );
}
