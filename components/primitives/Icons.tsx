/**
 * Inline SVG icon set. Decorative throughout — every icon sits beside a
 * text label that carries the meaning, so each is aria-hidden and no
 * information depends on it.
 */
type IconProps = { className?: string };

const BOX = "h-full w-full";

export function HouseIcon({ className = BOX }: IconProps) {
  return (
    <svg viewBox="0 0 38 38" fill="none" className={className} aria-hidden="true">
      <path d="M4 16L19 5l15 11" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
      <path d="M8 14v18h22V14" stroke="currentColor" strokeWidth="1.9" />
      <path d="M15 32v-8h8v8" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  );
}

export function PulseIcon({ className = BOX }: IconProps) {
  return (
    <svg viewBox="0 0 38 38" fill="none" className={className} aria-hidden="true">
      <path
        d="M4 25h6l4-14 5 20 4-14h11"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function ShieldCheckIcon({ className = BOX }: IconProps) {
  return (
    <svg viewBox="0 0 38 38" fill="none" className={className} aria-hidden="true">
      <path
        d="M19 4l12 5v9c0 8-5 13.5-12 16-7-2.5-12-8-12-16V9z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinejoin="round"
      />
      <path d="M13.5 19l4 4 8-9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function BuildingIcon({ className = BOX }: IconProps) {
  return (
    <svg viewBox="0 0 40 40" fill="none" className={className} aria-hidden="true">
      <path d="M4 17L20 5l16 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M8 15v18h24V15" stroke="currentColor" strokeWidth="2" />
      <rect x="16" y="23" width="8" height="10" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  );
}

export function InstrumentIcon({ className = BOX }: IconProps) {
  return (
    <svg viewBox="0 0 40 40" fill="none" className={className} aria-hidden="true">
      <path d="M20 4l16 7v4H4v-4z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path
        d="M9 15v16M15 15v16M25 15v16M31 15v16M4 34h32"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function CubeIcon({ className = BOX }: IconProps) {
  return (
    <svg viewBox="0 0 44 44" fill="none" className={className} aria-hidden="true">
      <path
        d="M22 4L38 13v18L22 40 6 31V13z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path d="M22 15l7 4v8l-7 4-7-4v-8z" fill="none" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

export function BarsIcon({ className = BOX }: IconProps) {
  return (
    <svg viewBox="0 0 44 44" fill="none" className={className} aria-hidden="true">
      <path d="M6 34h32" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <rect x="9" y="21" width="6" height="13" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <rect x="19" y="13" width="6" height="21" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <rect x="29" y="8" width="6" height="26" fill="none" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

export function VaultIcon({ className = BOX }: IconProps) {
  return (
    <svg viewBox="0 0 44 44" fill="none" className={className} aria-hidden="true">
      <rect x="5" y="9" width="30" height="24" rx="3" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="20" cy="21" r="6" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <path d="M20 14v3M20 25v3M13 21h3M24 21h3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function CheckCircleIcon({ className = BOX }: IconProps) {
  return (
    <svg viewBox="0 0 22 22" fill="none" className={className} aria-hidden="true">
      <circle cx="11" cy="11" r="9" stroke="currentColor" strokeWidth="1.6" />
      <path d="M7.2 11.3l2.7 2.7 5-5.4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export function PieIcon({ className = BOX }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.7" />
      <path d="M12 3a9 9 0 018.5 6H12z" fill="currentColor" />
    </svg>
  );
}

export function ClockIcon({ className = BOX }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.7" />
      <path d="M12 6.5V12l4 2.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

export function DiversifyIcon({ className = BOX }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.7" />
      <path d="M12 3v9l6.4 6.4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

export function ShieldSmallIcon({ className = BOX }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M12 3l8 3.5v6c0 5-3.4 8.6-8 10.5-4.6-1.9-8-5.5-8-10.5v-6z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path d="M8.5 12.2l2.5 2.5 4.6-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export function PersonIcon({ className = BOX }: IconProps) {
  return (
    <svg viewBox="0 0 26 26" fill="none" className={className} aria-hidden="true">
      <circle cx="13" cy="9" r="4.6" stroke="currentColor" strokeWidth="1.7" />
      <path d="M4.5 22a8.5 8.5 0 0117 0" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

export function OwnerIcon({ className = BOX }: IconProps) {
  return (
    <svg viewBox="0 0 26 26" fill="none" className={className} aria-hidden="true">
      <path d="M3 11L13 4l10 7" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <path d="M5.5 10v11h15V10" stroke="currentColor" strokeWidth="1.7" />
      <path d="M10.5 21v-5h5v5" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

export function EmptyBoxIcon({ className = BOX }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
      <rect x="7" y="12" width="34" height="26" rx="4" stroke="currentColor" strokeWidth="1.6" />
      <path d="M7 20h34" stroke="currentColor" strokeWidth="1.6" />
      <path d="M18 28h12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function WarningIcon({ className = BOX }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={className} aria-hidden="true">
      <path d="M8 1.5l6.5 12h-13z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
      <path d="M8 6.5v3.2M8 11.6v.1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
