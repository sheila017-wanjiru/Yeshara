/**
 * Print readability audit.
 *
 * Someone will export this site to PDF for a bank. A dark site printed
 * on paper loses every white word unless the whole ramp inverts, so
 * this measures real contrast against the effective background with
 * media emulated as print.
 *
 *   npx next start -p 3242 &
 *   node scripts/print-check.mjs http://localhost:3242
 */
import { chromium } from "playwright";
import { existsSync } from "node:fs";

const BASE = process.argv[2] ?? "http://localhost:3242";
const ROUTES = ["/", "/tokenization", "/marketplace", "/insights", "/about",
  "/investors", "/contact", "/get-started", "/legal/terms", "/legal/privacy",
  "/legal/risk-disclosure", "/legal/cookies"];

const CHECK = () => {
  const parse = (s) => {
    const m = s.match(/[\d.]+/g);
    if (!m) return null;
    const [r, g, b, a = 1] = m.map(Number);
    return { r, g, b, a };
  };
  const lum = ({ r, g, b }) => {
    const f = (c) => { c /= 255; return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4); };
    return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
  };
  const effBg = (el) => {
    let n = el;
    while (n && n !== document.documentElement) {
      const c = parse(getComputedStyle(n).backgroundColor);
      if (c && c.a >= 0.9) return c;
      n = n.parentElement;
    }
    return { r: 255, g: 255, b: 255, a: 1 };
  };
  const out = [];
  for (const el of document.querySelectorAll("p,h1,h2,h3,h4,li,span,b,em,dd,dt,td,th,a,button")) {
    if (!el.textContent.trim()) continue;
    const cs = getComputedStyle(el);
    if (cs.display === "none" || cs.visibility === "hidden") continue;
    if (el.getBoundingClientRect().width === 0) continue;
    const fg = parse(cs.color);
    if (!fg) continue;
    const bg = effBg(el);
    const L1 = lum(fg), L2 = lum(bg);
    const ratio = (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05);
    // 4.5:1 is the AA threshold for body text.
    if (ratio < 4.5) {
      out.push({ text: el.textContent.trim().slice(0, 40), color: cs.color, ratio: +ratio.toFixed(2) });
    }
  }
  return out;
};

const exe = process.env.CHROMIUM_PATH || "/opt/pw-browsers/chromium";
const browser = await chromium.launch(existsSync(exe) ? { executablePath: exe } : {});
const page = await (await browser.newContext()).newPage();
let total = 0;

for (const route of ROUTES) {
  await page.goto(`${BASE}${route}`, { waitUntil: "networkidle", timeout: 30_000 });
  await page.emulateMedia({ media: "print" });
  // Colour transitions run when the media query flips. Sampling
  // immediately catches intermediate values partway between the screen
  // and print ramps, which is what a printer never sees. Let them land.
  await page.waitForTimeout(600);
  const bad = await page.evaluate(CHECK);
  total += bad.length;
  if (bad.length === 0) {
    console.log(`  ok    ${route}`);
  } else {
    console.log(`  FAIL  ${route} — ${bad.length} below 4.5:1`);
    for (const x of bad.slice(0, 6)) console.log(`          ${x.ratio}  ${x.color}  "${x.text}"`);
  }
  await page.emulateMedia({ media: "screen" });
}

await browser.close();
console.log(total === 0
  ? "\nPASS — printed output is readable ink-on-paper throughout."
  : `\n${total} low-contrast text nodes in print.`);
process.exit(total === 0 ? 0 : 1);
