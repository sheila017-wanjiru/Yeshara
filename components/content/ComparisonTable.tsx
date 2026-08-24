"use client";

import { useId, useState } from "react";
import { COMPARISONS } from "@/content/tokenization";

/**
 * Two comparison datasets behind a toggle.
 *
 * Below 940px the layout stacks, and the dimension label becomes its
 * own row rather than being hidden — dropping it left every row without
 * the one word saying what was being compared.
 *
 * The filled and hollow dots are decoration: each column is named in
 * its header and every cell carries its own words, so nothing here is
 * conveyed by colour or shape alone.
 */
export function ComparisonTable() {
  const baseId = useId();
  const [active, setActive] = useState(0);
  const set = COMPARISONS[active] ?? COMPARISONS[0]!;

  return (
    <>
      <div role="tablist" aria-label="Comparison sets" className="mt-s6 flex flex-col gap-s2 sm:flex-row">
        {COMPARISONS.map((c, i) => (
          <button
            key={c.label}
            type="button"
            role="tab"
            id={`${baseId}-tab-${i}`}
            aria-selected={active === i}
            aria-controls={`${baseId}-panel`}
            onClick={() => setActive(i)}
            className={`h-11 rounded-btn border px-s5 font-display text-[.875rem] font-bold transition-all duration-200 ${
              active === i
                ? "border-tq-300 bg-tq-300 text-on-tq"
                : "border-border-2 text-tx-2 hover:bg-white/[.04] hover:text-tx"
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      <div
        id={`${baseId}-panel`}
        role="tabpanel"
        aria-labelledby={`${baseId}-tab-${active}`}
        className="mt-s8 overflow-hidden rounded-[20px] border border-border-1 bg-surface"
      >
        <div className="grid grid-cols-2 border-b border-border-1 md:grid-cols-[150px_1fr_1fr]">
          <div className="mono hidden items-center p-s5 text-tx-3 md:flex">Dimension</div>
          <div className="border-l border-border-1 bg-tq-500/[.07] p-s5 font-display text-[.95rem] font-bold tracking-[-.02em] text-tq-300 max-md:border-l-0">
            {set.a}
          </div>
          <div className="border-l border-border-1 p-s5 font-display text-[.95rem] font-bold tracking-[-.02em] text-tx-2">
            {set.b}
          </div>
        </div>

        {set.rows.map((row) => (
          <div
            key={row[0]}
            className="grid grid-cols-2 border-b border-border-1 transition-colors duration-200 last:border-b-0 hover:bg-white/[.02] md:grid-cols-[150px_1fr_1fr]"
          >
            <span className="mono col-span-2 flex items-center px-s5 pb-1 pt-s4 text-tq-300 md:col-span-1 md:py-s4 md:text-tx-3">
              {row[0]}
            </span>
            <span className="flex items-center gap-s3 border-l border-border-1 bg-tq-500/[.035] px-s4 py-s3 text-[.8438rem] text-tx max-md:border-l-0 sm:px-s5 md:py-s4 md:text-[.9rem]">
              <span
                aria-hidden="true"
                className="h-[14px] w-[14px] shrink-0 rounded-full bg-tq-500 shadow-[inset_0_0_0_3px_#000]"
              />
              {row[1]}
            </span>
            <span className="flex items-center gap-s3 border-l border-border-1 px-s4 py-s3 text-[.8438rem] text-tx-2 sm:px-s5 md:py-s4 md:text-[.9rem]">
              <span
                aria-hidden="true"
                className="h-[14px] w-[14px] shrink-0 rounded-full bg-surface-3 shadow-[inset_0_0_0_3px_#000]"
              />
              {row[2]}
            </span>
          </div>
        ))}
      </div>
    </>
  );
}
