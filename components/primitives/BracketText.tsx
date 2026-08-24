import { Fragment } from "react";

/**
 * Renders a string in which [BRACKETED SPANS] are unconfirmed values,
 * styling each as a visible amber placeholder inline in the sentence.
 *
 * This is what keeps a non-answer legible as a non-answer. The
 * alternative — quietly dropping the clause — would read as a complete
 * statement that happens to be missing, which is exactly the failure
 * the status badge system exists to prevent.
 */
export function BracketText({ text }: { text: string }) {
  const parts = text.split(/(\[[^\]]+\])/g);
  return (
    <>
      {parts.map((part, i) =>
        part.startsWith("[") && part.endsWith("]") ? (
          <span
            key={i}
            className="font-mono text-[.78rem] tracking-[.06em] text-warn"
          >
            {part}
          </span>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        ),
      )}
    </>
  );
}
