import type { ReactNode } from "react";

/**
 * Marquee — used twice on the site: the stat ticker and the partner
 * belt.
 *
 * Deliberately a Server Component. Pausing on hover and on focus-within
 * is pure CSS, so this ships no JavaScript at all, and under
 * prefers-reduced-motion the lane becomes a normal horizontally
 * scrollable strip with every item still reachable.
 *
 * The track duplicates its children and translates -50%. Gutters sit on
 * the items as margin-right, never as a flex `gap` on the track — a gap
 * adds one extra gutter at the seam and produces a visible stutter
 * every cycle.
 */
export function Marquee({
  items,
  durationSeconds,
  ariaLabel,
  gutterClass = "mr-s7",
}: {
  items: ReactNode[];
  durationSeconds: number;
  ariaLabel: string;
  gutterClass?: string;
}) {
  return (
    <div
      className="marquee-lane"
      role="group"
      aria-label={ariaLabel}
      data-print="hide"
    >
      <div
        className="marquee-track"
        style={{ animationDuration: `${durationSeconds}s` }}
      >
        {items.map((item, i) => (
          <div key={`a-${i}`} className={`shrink-0 ${gutterClass}`}>
            {item}
          </div>
        ))}
        {/* The duplicate half exists only to make the loop seamless. It
            is hidden from assistive technology and from the tab order
            so nothing is announced or focusable twice. */}
        {items.map((item, i) => (
          <div
            key={`b-${i}`}
            className={`shrink-0 ${gutterClass}`}
            aria-hidden="true"
            inert
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
