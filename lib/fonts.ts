import { Figtree, Manrope, IBM_Plex_Mono } from "next/font/google";

/**
 * Self-hosted via next/font — no runtime request to Google, no CLS,
 * subset to Latin, font-display: swap.
 *
 * SUBSTITUTION NOTE (§6): Figtree is a stand-in. The live site appears
 * to use a Gilroy-family geometric sans. When the client supplies the
 * licensed files, swap this one declaration for `next/font/local` and
 * change nothing else — every rule references --font-figtree.
 */
export const figtree = Figtree({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
  variable: "--font-figtree",
});

export const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--font-manrope",
});

export const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-plex-mono",
});
