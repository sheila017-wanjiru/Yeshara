import { INFRASTRUCTURE, COMPLIANCE } from "@/content/tokenization";
import { CubeIcon, BarsIcon, VaultIcon, CheckCircleIcon } from "@/components/primitives/Icons";

const ICONS = {
  cube: CubeIcon,
  bars: BarsIcon,
  vault: VaultIcon,
} as const;

/** The three layers underneath every token. */
export function InfrastructureGrid() {
  return (
    <div className="mt-s8 grid gap-s4 lg:grid-cols-3">
      {INFRASTRUCTURE.map((layer) => {
        const Icon = ICONS[layer.icon];
        return (
          <article
            key={layer.title}
            className="overflow-hidden rounded-[20px] border border-border-1 bg-surface transition-[border-color,transform,box-shadow] duration-[250ms] elev hover:-translate-y-1 hover:border-tq-600 elev-h"
          >
            <div className="grid place-items-center border-b border-border-1 bg-[linear-gradient(180deg,rgba(132,214,216,.14)_0%,rgba(82,185,188,.06)_46%,transparent_100%)] px-s5 pb-s6 pt-s7">
              <span className="block h-11 w-11 text-tq-300">
                <Icon />
              </span>
            </div>
            <div className="px-s5 py-s6 text-center">
              <h3 className="m-0 font-display text-[1.14rem] font-bold tracking-[-.026em]">
                {layer.title}
              </h3>
              <em className="mt-1.5 block text-[.92rem] italic text-tq-300">
                {layer.caption}
              </em>
              <p className="mt-s4 text-[.875rem] leading-[1.58] text-tx-2">{layer.body}</p>
            </div>
          </article>
        );
      })}
    </div>
  );
}

/** Compliance items. Each one is factual or explicitly hedged. */
export function ComplianceGrid() {
  return (
    <div className="mt-s8 grid gap-s4 md:grid-cols-2">
      {COMPLIANCE.map((item) => (
        <div
          key={item.title}
          className="grid grid-cols-[auto_1fr] gap-s4 rounded-card border border-border-1 bg-surface p-s5 transition-[border-color] duration-[250ms] elev hover:border-tq-500/35"
        >
          <span className="mt-[3px] block h-[22px] w-[22px] text-tq-500">
            <CheckCircleIcon />
          </span>
          <div>
            <h3 className="m-0 font-display text-[1rem] font-bold tracking-[-.02em]">
              {item.title}
            </h3>
            <p className="mt-1.5 text-[.875rem] leading-[1.6] text-tx-2">{item.body}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
