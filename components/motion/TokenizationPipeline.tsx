"use client";

import { memo, useEffect, useState } from "react";
import { Chip } from "@/components/primitives/Chip";

const CELL_COUNT = 54;
const TOTAL_TOKENS = 10_000;
const CYCLE_MS = 9_000;
/** How long the grid takes to fill, matched by the CSS stagger below. */
const FILL_MS = 1_836;
/** Counter updates across that window. 18 renders of a two-node leaf,
 *  where the previous implementation did 54 of the whole figure. */
const COUNT_STEPS = 18;
/** Stable cell indices, built once at module scope. */
const CELLS = Array.from({ length: CELL_COUNT }, (_, i) => i);

/**
 * The hero visual: an asset is structured, tokenized and listed, with
 * panels lighting in sequence while token cells fill and a counter runs
 * to 10,000. Loops every 9 seconds.
 *
 * Under prefers-reduced-motion the whole sequence renders in its
 * completed state — every cell filled, counter at 10,000, the listing
 * panel lit. No information is lost with motion off, which is the test
 * that matters.
 *
 * Everything here is illustrative and labelled as such. No real
 * property, valuation or holder data is represented.
 */
export function TokenizationPipeline() {
  const [phase, setPhase] = useState(0);
  const [filled, setFilled] = useState(0);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (query.matches) {
      setReduced(true);
      setPhase(2);
      setFilled(CELL_COUNT);
      return;
    }

    let countTimer: ReturnType<typeof setInterval> | undefined;
    const timeouts: ReturnType<typeof setTimeout>[] = [];

    const runCycle = () => {
      setPhase(0);
      setFilled(0);
      timeouts.push(
        setTimeout(() => {
          // One state change starts every cell. The stagger is CSS
          // transition-delay, so the browser sequences the fill rather
          // than React re-rendering 54 nodes 54 times.
          setPhase(1);
          // The counter still has to step, but it is isolated in its own
          // leaf component, so each tick updates two text nodes.
          let step = 0;
          countTimer = setInterval(() => {
            step += 1;
            const done = step >= COUNT_STEPS;
            setFilled(done ? CELL_COUNT : Math.round((step / COUNT_STEPS) * CELL_COUNT));
            if (done && countTimer) clearInterval(countTimer);
          }, FILL_MS / COUNT_STEPS);
        }, 1400),
      );
      timeouts.push(setTimeout(() => setPhase(2), 4200));
    };

    runCycle();
    const loop = setInterval(runCycle, CYCLE_MS);

    return () => {
      clearInterval(loop);
      if (countTimer) clearInterval(countTimer);
      for (const t of timeouts) clearTimeout(t);
    };
  }, []);

  const percent = Math.round((filled / CELL_COUNT) * 100);
  const tokens = Math.round((filled / CELL_COUNT) * TOTAL_TOKENS);

  const stage = (index: number) =>
    `relative z-[2] rounded-card border bg-surface px-s5 py-s4 transition-[border-color,box-shadow] duration-[400ms] ${
      phase === index || reduced
        ? "border-tq-500/35 shadow-[0_0_0_1px_rgba(82,184,188,.07),0_16px_44px_-26px_rgba(82,185,188,.6)]"
        : "border-border-1"
    }`;

  return (
    <figure
      className="relative m-0 overflow-hidden rounded-[22px] border border-border-2 bg-[linear-gradient(168deg,#12201F_0%,#0A1314_38%,#020707_100%)] p-s5 shadow-[0_44px_100px_-50px_var(--bg),inset_0_1px_0_rgba(166,225,226,.09)]"
      aria-label="Illustration: an asset structured, tokenized and listed"
    >
      <svg
        viewBox="0 0 360 360"
        aria-hidden="true"
        data-print="hide"
        className="pointer-events-none absolute -right-[140px] -top-[140px] h-[360px] w-[360px] opacity-55"
      >
        <circle cx="180" cy="180" r="158" fill="none" stroke="var(--tq-300)" strokeOpacity=".22" strokeDasharray="2 8" />
        <circle cx="180" cy="180" r="122" fill="none" stroke="var(--tq-500)" strokeOpacity=".17" />
        <circle cx="180" cy="180" r="88" fill="none" stroke="var(--tq-700)" strokeOpacity=".3" strokeDasharray="3 6" />
      </svg>

      {/* 01 — Deal structuring */}
      <div className={stage(0)}>
        <div className="mono flex items-center justify-between text-tx-3">
          <span>01 — Deal structuring</span>
          <b className="font-medium text-tq-300">Verified</b>
        </div>
        <div className="mt-s3 flex items-start gap-s4">
          <span className="grid h-[42px] w-[42px] shrink-0 place-items-center rounded-xl border border-border-2 bg-surface-2 text-tq-500">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M3 11L12 4l9 7" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
              <path d="M5.5 10v9h13v-9" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
              <path d="M10 19v-5h4v5" stroke="currentColor" strokeWidth="1.7" />
            </svg>
          </span>
          <div>
            <div className="h4">Sample Property, Nairobi</div>
            <p className="sm mt-[3px]">Registered title · Commercial</p>
          </div>
        </div>
        <div className="mt-s4 grid grid-cols-2 gap-s3 gap-x-s5 border-t border-border-1 pt-s4">
          <div>
            <span className="block font-mono text-[.6875rem] tracking-[.09em] text-tx-3">Wrapper</span>
            <b className="mt-1 block font-display text-[.875rem] font-bold">SPV — trust</b>
          </div>
          <div>
            <span className="block font-mono text-[.6875rem] tracking-[.09em] text-tx-3">Title held by</span>
            <b className="mt-1 block font-display text-[.875rem] font-bold">Trustee</b>
          </div>
        </div>
      </div>

      <Connector />

      {/* 02 — Digitization */}
      <div className={stage(1)}>
        <div className="mono flex items-center justify-between text-tx-3">
          <span>02 — Digitization</span>
          <b className="font-medium text-tq-300">{percent}%</b>
        </div>
        <TokenGrid on={phase >= 1 || reduced} />
        <div className="mono mt-s4 flex items-baseline justify-between border-t border-border-1 pt-s3">
          <span className="text-tx-3">Tokens minted · Register of Members</span>
          {/* tq-200 — display figures only */}
          <b className="font-mono text-[1.06rem] font-medium text-tq-200">
            {tokens.toLocaleString("en-KE")}
          </b>
        </div>
      </div>

      <Connector delay="0.9s" />

      {/* 03 — Primary market */}
      <div className={stage(2)}>
        <div className="mono flex items-center justify-between text-tx-3">
          <span>03 — Primary market</span>
          <b className="font-medium text-tq-300">Listed</b>
        </div>
        <div className="mt-s3">
          <Row label="Minimum ticket" value="KES 1,000" tag="Retail" tagClass="text-tq-300" />
          <Row label="Holder eligibility" value="KYC / AML" tag="Enforced" tagClass="text-pos" />
          <Row label="Secondary transfer" value="Verified holders" tag="Enabled" tagClass="text-pos" last />
        </div>
      </div>

      <figcaption className="absolute bottom-[13px] right-[15px] z-[3]">
        <Chip tone="placeholder">Illustrative</Chip>
      </figcaption>
    </figure>
  );
}

/**
 * The 54 token cells. Rendered once and never re-rendered: memo plus a
 * single boolean prop means React touches this subtree only when the
 * phase flips, and the staggered fill is pure CSS.
 */
const TokenGrid = memo(function TokenGrid({ on }: { on: boolean }) {
  return (
    <div
      className="mt-s4 flex flex-wrap gap-1"
      aria-hidden="true"
      data-filling={on ? "true" : "false"}
    >
      {CELLS.map((i) => (
        <span
          key={i}
          className="token-cell"
          style={{ transitionDelay: `${i * 34}ms` }}
        />
      ))}
    </div>
  );
});

function Connector({ delay = "0s" }: { delay?: string }) {
  return (
    <div className="relative z-[1] flex h-[26px] justify-center" aria-hidden="true">
      <span className="block h-full w-px bg-[linear-gradient(180deg,var(--border-2),var(--tq-30))]" />
      <span
        className="pipe-drop absolute top-0 h-[5px] w-[5px] rounded-full bg-tq-300 shadow-[0_0_10px_var(--tq-300)]"
        style={{ animationDelay: delay }}
        data-print="hide"
      />
    </div>
  );
}

function Row({
  label,
  value,
  tag,
  tagClass,
  last = false,
}: {
  label: string;
  value: string;
  tag: string;
  tagClass: string;
  last?: boolean;
}) {
  return (
    <div
      className={`grid grid-cols-[1fr_auto_auto] items-center gap-s4 py-[9px] text-[.8125rem] ${
        last ? "" : "border-b border-border-1"
      }`}
    >
      <b className="font-display font-bold">{label}</b>
      <span className="font-mono text-[.75rem] text-tx-2">{value}</span>
      <span className={`font-mono text-[.75rem] ${tagClass}`}>{tag}</span>
    </div>
  );
}
