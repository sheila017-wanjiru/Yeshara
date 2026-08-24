"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * One 20px rise and fade, once per element, via IntersectionObserver.
 *
 * The wrapped content is always present in the server-rendered HTML —
 * the reveal only animates opacity and transform, so a crawler, a
 * reader with JavaScript disabled, and a reduced-motion user all get
 * the full content. The `in` class is applied immediately when the
 * observer is unavailable or motion is reduced.
 */
export function ScrollReveal({
  children,
  className = "",
  as: As = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "section";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setShown(true);
            observer.disconnect();
          }
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -6% 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <As ref={ref} className={`rv ${shown ? "in" : ""} ${className}`}>
      {children}
    </As>
  );
}
