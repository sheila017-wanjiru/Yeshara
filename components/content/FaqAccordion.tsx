"use client";

import { useId, useState } from "react";
import { BracketText } from "@/components/primitives/BracketText";

/**
 * FAQ accordion.
 *
 * Every answer is present in the server-rendered HTML — collapsing is
 * done with max-height, not by removing the node — so the FAQPage
 * structured data on the page has matching visible text and a reader
 * with JavaScript disabled can still get at the content.
 */
export function FaqAccordion({
  items,
}: {
  items: readonly { question: string; answer: string }[];
}) {
  const baseId = useId();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="mt-s8 border-t border-border-1">
      {items.map((item, i) => {
        const isOpen = open === i;
        const panelId = `${baseId}-panel-${i}`;
        const buttonId = `${baseId}-button-${i}`;
        return (
          <div key={item.question} className="border-b border-border-1">
            <h3 className="m-0">
              <button
                type="button"
                id={buttonId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-s5 px-s3 py-s5 text-left font-display text-[1.04rem] font-bold tracking-[-.022em] transition-colors duration-200 hover:text-tq-300"
              >
                <span>{item.question}</span>
                <svg
                  viewBox="0 0 18 18"
                  fill="none"
                  aria-hidden="true"
                  className={`h-[18px] w-[18px] shrink-0 text-tq-500 transition-transform duration-[250ms] ${
                    isOpen ? "rotate-45" : ""
                  }`}
                >
                  <path
                    d="M9 3v12M3 9h12"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className={`grid transition-[grid-template-rows] duration-300 ease-[cubic-bezier(.4,0,.2,1)] ${
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="overflow-hidden">
                <p className="bd max-w-[74ch] px-s3 pb-s5">
                  <BracketText text={item.answer} />
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
