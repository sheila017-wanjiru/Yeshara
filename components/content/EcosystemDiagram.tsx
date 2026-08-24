"use client";

import { useState } from "react";
import { ECOSYSTEM } from "@/content/tokenization";
import { BracketText } from "@/components/primitives/BracketText";

const CX = 360;
const CY = 268;
const R = 196;
const W = 158;
const H = 46;

/** Labels longer than 13 characters wrap to two tspan lines rather than
 *  running past the edge of their box. */
function wrapLabel(name: string): string[] {
  const upper = name.toUpperCase();
  const words = upper.split(" ");
  if (upper.length <= 13 || words.length < 2) return [upper];
  const mid = Math.ceil(words.length / 2);
  return [words.slice(0, mid).join(" "), words.slice(mid).join(" ")];
}

/**
 * The ecosystem diagram: eight participants around the platform.
 *
 * Each node is a real focusable control with role="button", responding
 * to focus as well as hover, so the diagram is fully keyboard
 * operable. Below 940px the SVG is replaced by a card grid carrying the
 * identical text — the information never depends on the diagram
 * rendering.
 */
export function EcosystemDiagram() {
  const [active, setActive] = useState(0);
  const current = ECOSYSTEM[active] ?? ECOSYSTEM[0]!;

  return (
    <>
      <div className="mt-s8 hidden items-center gap-s7 lg:grid lg:grid-cols-[1fr_330px]">
        <svg
          viewBox="0 0 720 540"
          role="group"
          aria-label="Diagram: Yeshara connecting eight ecosystem participants"
          className="w-full"
        >
          {ECOSYSTEM.map((participant, i) => {
            const angle = (i / ECOSYSTEM.length) * Math.PI * 2 - Math.PI / 2;
            const x = CX + R * Math.cos(angle);
            const y = CY + R * Math.sin(angle);
            const on = i === active;
            return (
              <path
                key={`line-${participant.name}`}
                d={`M${CX} ${CY} L${x} ${y}`}
                fill="none"
                strokeWidth={on ? 1.5 : 1}
                stroke={on ? "var(--tq-500)" : "var(--border-2)"}
                strokeDasharray={on ? undefined : "3 5"}
                className={on ? "" : "eco-link"}
                style={on ? undefined : { animationDelay: `${i * -2.6}s` }}
                data-print="hide"
              />
            );
          })}

          {ECOSYSTEM.map((participant, i) => {
            const angle = (i / ECOSYSTEM.length) * Math.PI * 2 - Math.PI / 2;
            const x = CX + R * Math.cos(angle);
            const y = CY + R * Math.sin(angle);
            const on = i === active;
            const lines = wrapLabel(participant.name);
            return (
              <g
                key={participant.name}
                role="button"
                tabIndex={0}
                aria-label={participant.name}
                aria-pressed={on}
                className="cursor-pointer"
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setActive(i);
                  }
                }}
              >
                <rect
                  x={x - W / 2}
                  y={y - H / 2}
                  width={W}
                  height={H}
                  rx={13}
                  strokeWidth="1"
                  fill={on ? "rgba(82,184,188,.1)" : "var(--surface)"}
                  stroke={on ? "var(--tq-500)" : "var(--border-2)"}
                  className="transition-[fill,stroke] duration-[250ms]"
                />
                <text
                  x={x}
                  y={y + (lines.length > 1 ? -2 : 4)}
                  textAnchor="middle"
                  fontFamily="var(--font-mono)"
                  fontSize="10"
                  letterSpacing=".04em"
                  fill={on ? "var(--tq-200)" : "var(--tx-2)"}
                  className="transition-[fill] duration-[250ms]"
                >
                  {lines.map((line, k) => (
                    <tspan key={line} x={x} dy={k ? 12 : 0}>
                      {line}
                    </tspan>
                  ))}
                </text>
              </g>
            );
          })}

          <g aria-hidden="true">
            <circle cx={CX} cy={CY} r={62} fill="#0B1314" stroke="var(--tq-300)" strokeOpacity=".5" />
            <circle cx={CX} cy={CY} r={74} fill="none" stroke="var(--tq-500)" strokeOpacity=".2" />
            <text
              x={CX}
              y={CY}
              textAnchor="middle"
              fill="var(--tx)"
              fontFamily="var(--font-display)"
              fontSize="21"
              fontWeight="800"
              letterSpacing="-0.7"
            >
              Yeshara
            </text>
            <text
              x={CX}
              y={CY + 19}
              textAnchor="middle"
              fill="var(--tq-300)"
              fontFamily="var(--font-mono)"
              fontSize="7.8"
              letterSpacing="1.2"
            >
              TOKENIZATION PLATFORM
            </text>
          </g>
        </svg>

        <div
          aria-live="polite"
          className="min-h-[210px] rounded-card border border-border-1 bg-surface p-s5 elev"
        >
          <span className="mono text-tx-3">Participant</span>
          <h3 className="d3 mt-2.5">{current.name}</h3>
          <p className="bd mt-s3">
            <BracketText text={current.body} />
          </p>
        </div>
      </div>

      {/* The same content as cards below the diagram breakpoint. */}
      <div className="mt-s6 grid gap-s3 sm:grid-cols-2 lg:hidden">
        {ECOSYSTEM.map((participant) => (
          <div
            key={participant.name}
            className="rounded-sm2 border border-border-1 bg-surface p-s4 elev"
          >
            <h3 className="h4 text-[.9375rem]">{participant.name}</h3>
            <p className="sm mt-1.5">
              <BracketText text={participant.body} />
            </p>
          </div>
        ))}
      </div>
    </>
  );
}
