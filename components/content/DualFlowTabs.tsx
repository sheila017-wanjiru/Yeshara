"use client";

import { useId, useRef, useState } from "react";
import { FLOWS } from "@/content/tokenization";
import { ButtonLink } from "@/components/primitives/Button";
import { MarkerList } from "./Cards";

/**
 * Two paths through the same platform — one for the owner bringing an
 * asset, one for the investor buying into it.
 *
 * Both panels stay in the DOM; the inactive one carries the `hidden`
 * attribute, so both journeys are in the server-rendered HTML.
 */
export function DualFlowTabs() {
  const baseId = useId();
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKeyDown = (e: React.KeyboardEvent, i: number) => {
    const delta = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!delta) return;
    e.preventDefault();
    const next = (i + delta + FLOWS.length) % FLOWS.length;
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <div className="mt-s7">
      <div role="tablist" aria-label="Tokenization flows" className="flex flex-col gap-s2 sm:flex-row">
        {FLOWS.map((flow, i) => (
          <button
            key={flow.id}
            type="button"
            role="tab"
            id={`${baseId}-tab-${flow.id}`}
            aria-selected={active === i}
            aria-controls={`${baseId}-panel-${flow.id}`}
            tabIndex={active === i ? 0 : -1}
            ref={(el) => {
              tabRefs.current[i] = el;
            }}
            onClick={() => setActive(i)}
            onKeyDown={(e) => onKeyDown(e, i)}
            className={`h-[46px] rounded-btn border px-s6 font-display text-[.9rem] font-bold transition-all duration-200 ${
              active === i
                ? "border-tq-300 bg-tq-300 text-on-tq"
                : "border-border-2 text-tx-2 hover:bg-white/[.04] hover:text-tx"
            }`}
          >
            {flow.label}
          </button>
        ))}
      </div>

      {FLOWS.map((flow, i) => (
        <div
          key={flow.id}
          role="tabpanel"
          id={`${baseId}-panel-${flow.id}`}
          aria-labelledby={`${baseId}-tab-${flow.id}`}
          hidden={active !== i}
        >
          <ol className="mt-s6 grid list-none gap-s4 p-0 sm:grid-cols-2 lg:grid-cols-3">
            {flow.steps.map((step, k) => (
              <li
                key={step.title}
                className="rounded-card border border-border-1 bg-surface p-s5 transition-[border-color,transform,background-color] duration-[250ms] elev hover:-translate-y-1 hover:border-tq-500/35 hover:bg-surface-2"
              >
                <span className="mono text-tq-300">Step 0{k + 1}</span>
                <h3 className="mt-s4 font-display text-[1.04rem] font-bold tracking-[-.022em]">
                  {step.title}
                </h3>
                <p className="mt-2 text-[.875rem] leading-[1.58] text-tx-2">{step.body}</p>
              </li>
            ))}
          </ol>

          <div className="mt-s6 grid gap-s5 border-t border-border-1 pt-s6 md:grid-cols-2">
            <div>
              <span className="mono text-tq-300">{flow.benefitsHeading}</span>
              <MarkerList items={flow.benefits} />
            </div>
            <div className="flex items-end">
              <ButtonLink href="/get-started" size="sm" withArrow>
                Get Started
              </ButtonLink>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
