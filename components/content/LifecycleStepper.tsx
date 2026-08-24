"use client";

import { useId, useRef, useState } from "react";
import { LIFECYCLE } from "@/content/facts";

const NODE_Y = [42, 102, 162, 222, 282];

/**
 * The five-phase lifecycle: a tablist of phases beside a sticky
 * diagram.
 *
 * Full keyboard operation — arrow keys move between phases with
 * roving tabindex, Home and End jump to the ends. Every phase's body
 * text is in the server-rendered HTML.
 */
export function LifecycleStepper() {
  const baseId = useId();
  const [active, setActive] = useState(0);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const current = LIFECYCLE[active] ?? LIFECYCLE[0]!;

  const move = (next: number) => {
    const index = (next + LIFECYCLE.length) % LIFECYCLE.length;
    setActive(index);
    buttonRefs.current[index]?.focus();
  };

  const onKeyDown = (e: React.KeyboardEvent, i: number) => {
    const keys: Record<string, number> = {
      ArrowDown: i + 1,
      ArrowRight: i + 1,
      ArrowUp: i - 1,
      ArrowLeft: i - 1,
      Home: 0,
      End: LIFECYCLE.length - 1,
    };
    const next = keys[e.key];
    if (next === undefined) return;
    e.preventDefault();
    move(next);
  };

  return (
    <div className="mt-s8 grid items-start gap-s6 lg:grid-cols-[.94fr_1.06fr] lg:gap-s8">
      <div
        role="tablist"
        aria-label="Tokenization lifecycle"
        aria-orientation="vertical"
        className="border-t border-border-1"
      >
        {LIFECYCLE.map((phase, i) => (
          <button
            key={phase.title}
            type="button"
            role="tab"
            id={`${baseId}-tab-${i}`}
            aria-selected={active === i}
            aria-controls={`${baseId}-panel`}
            tabIndex={active === i ? 0 : -1}
            ref={(el) => {
              buttonRefs.current[i] = el;
            }}
            onClick={() => setActive(i)}
            onFocus={() => setActive(i)}
            onKeyDown={(e) => onKeyDown(e, i)}
            className={`relative grid w-full grid-cols-1 gap-s2 border-b border-border-1 px-s4 py-s5 text-left transition-colors duration-200 sm:grid-cols-[auto_1fr] sm:gap-s5 ${
              active === i ? "bg-tq-500/[.07]" : "hover:bg-white/[.02]"
            }`}
          >
            <span
              aria-hidden="true"
              className={`absolute -bottom-px -top-px left-0 w-[2px] bg-tq-500 transition-opacity duration-200 ${
                active === i ? "opacity-100" : "opacity-0"
              }`}
            />
            <span
              className={`pt-1 font-mono text-[.75rem] ${
                active === i ? "text-tq-300" : "text-tx-3"
              }`}
            >
              0{i + 1}
            </span>
            <span>
              <span className="block font-display text-[1.06rem] font-bold tracking-[-.024em]">
                {phase.title}
              </span>
              <span className="mt-1.5 block text-[.875rem] leading-[1.58] text-tx-2">
                {phase.summary}
              </span>
            </span>
          </button>
        ))}
      </div>

      <div
        id={`${baseId}-panel`}
        role="tabpanel"
        aria-labelledby={`${baseId}-tab-${active}`}
        className="rounded-[20px] border border-border-1 bg-[linear-gradient(168deg,#101D1D_0%,#050C0C_62%,#020707_100%)] p-s6 shadow-[inset_0_1px_0_rgba(166,225,226,.07)] lg:sticky lg:top-[calc(var(--nav-h)+30px)]"
      >
        <svg
          viewBox="0 0 420 320"
          role="img"
          aria-label={`Five-phase tokenization lifecycle diagram. Phase ${active + 1} of 5, ${current.title}, is selected.`}
          className="w-full"
        >
          {NODE_Y.slice(0, -1).map((y, i) => (
            <line
              key={y}
              x1={82}
              y1={y + 18}
              x2={82}
              y2={NODE_Y[i + 1]}
              strokeWidth="1"
              className="transition-[stroke] duration-[350ms]"
              stroke={i < active ? "var(--tq-500)" : "var(--border-2)"}
            />
          ))}
          {LIFECYCLE.map((phase, i) => {
            const on = i === active;
            const y = NODE_Y[i]!;
            return (
              <g key={phase.title} className="transition-all duration-[350ms]">
                <rect
                  x={64}
                  y={y - 16}
                  width={300}
                  height={34}
                  rx={11}
                  strokeWidth="1"
                  fill={on ? "rgba(82,184,188,.1)" : "var(--surface)"}
                  stroke={on ? "var(--tq-500)" : "var(--border-2)"}
                />
                <text
                  x={80}
                  y={y + 4}
                  fontFamily="var(--font-mono)"
                  fontSize="10"
                  letterSpacing=".05em"
                  fill={on ? "var(--tq-200)" : "var(--tx-2)"}
                >
                  {`PHASE 0${i + 1}  ·  ${phase.title.toUpperCase()}`}
                </text>
              </g>
            );
          })}
        </svg>

        <div className="mt-s5 border-t border-border-1 pt-s5">
          <span className="mono text-tq-300">Phase 0{active + 1}</span>
          <h3 className="d3 mt-2.5">{current.title}</h3>
          <p className="bd mt-s3">{current.body}</p>
        </div>
      </div>
    </div>
  );
}
