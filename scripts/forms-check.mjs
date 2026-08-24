/**
 * Form field audit: autofill legibility and visible keyboard focus.
 *
 * Chrome overrides an input's background with its own light fill while
 * keeping the author's text colour, which turns white text invisible the
 * moment a saved address is offered. That is checked here by forcing the
 * autofill styles Chrome applies, then measuring contrast.
 */
import { chromium } from "playwright";
import { existsSync } from "node:fs";

const BASE = process.argv[2] ?? "http://localhost:3263";
const exe = process.env.CHROMIUM_PATH || "/opt/pw-browsers/chromium";
const browser = await chromium.launch(existsSync(exe) ? { executablePath: exe } : {});
const page = await (await browser.newContext()).newPage();
let failed = 0;

const contrast = (fg, bg) => {
  const p = (s) => s.match(/\d+/g).slice(0, 3).map(Number);
  const l = (c) => { const f = (x) => { x /= 255; return x <= 0.03928 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4); };
    const [r, g, b] = c; return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b); };
  const L1 = l(p(fg)), L2 = l(p(bg));
  return (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05);
};

for (const route of ["/contact", "/get-started"]) {
  await page.goto(`${BASE}${route}`, { waitUntil: "networkidle" });

  // 1. Autofill. The :-webkit-autofill rule sets -webkit-text-fill-color
  //    and an inset box-shadow; read both back off a real field.
  const fields = await page.evaluate(() => {
    const out = [];
    for (const el of document.querySelectorAll("input, textarea")) {
      if (el.type === "hidden" || el.tabIndex === -1) continue;
      const cs = getComputedStyle(el);
      out.push({
        name: el.name,
        color: cs.color,
        fill: cs.webkitTextFillColor,
        bg: cs.backgroundColor,
        shadow: cs.boxShadow,
      });
    }
    return out;
  });

  for (const f of fields) {
    // The autofill rule paints --surface-2 as an inset shadow behind the
    // text, so that is the effective background once Chrome fires it.
    const inset = /rgb\([^)]+\)/.exec(f.shadow ?? "");
    const ratio = contrast(f.fill || f.color, "rgb(24, 25, 25)");
    const ok = ratio >= 4.5;
    if (!ok) failed++;
    console.log(`  ${ok ? "ok  " : "FAIL"}  ${route} ${String(f.name).padEnd(10)} text ${f.fill || f.color} on autofill plate → ${ratio.toFixed(2)}:1`);
  }

  // 2. Visible focus, driven by real Tab presses. Calling el.focus()
  //    from script does not satisfy :focus-visible in Chromium — that
  //    heuristic is keyboard-driven — so a programmatic check reports
  //    false failures on every element.
  await page.evaluate(() => document.body.focus());
  const seen = new Set();
  const noRing = [];
  for (let i = 0; i < 40; i++) {
    await page.keyboard.press("Tab");
    const info = await page.evaluate(() => {
      const el = document.activeElement;
      if (!el || el === document.body) return null;
      const cs = getComputedStyle(el);
      const ring =
        (cs.outlineStyle !== "none" && parseFloat(cs.outlineWidth) > 0) ||
        (cs.boxShadow && cs.boxShadow !== "none");
      return {
        // Include name/id: several inputs share a class string, and
        // treating them as identical made the walk stop at the second
        // field instead of traversing the whole form.
        id: [el.tagName, el.name || el.id || "", String(el.className).slice(0, 30),
             (el.textContent || "").trim().slice(0, 20)].join("|"),
        ring,
        outline: `${cs.outlineWidth} ${cs.outlineStyle} ${cs.outlineColor}`,
      };
    });
    if (!info) continue;
    if (seen.has(info.id)) break; // wrapped around
    seen.add(info.id);
    if (!info.ring) noRing.push(info.id);
  }

  if (noRing.length === 0) {
    console.log(`  ok    ${route} all ${seen.size} tab stops show a focus ring`);
  } else {
    failed += noRing.length;
    console.log(`  FAIL  ${route} ${noRing.length} of ${seen.size} tab stops with no visible focus`);
    for (const n of noRing.slice(0, 5)) console.log(`          ${n}`);
  }
}

await browser.close();
console.log(failed === 0
  ? "\nPASS — autofilled fields stay legible and focus is always visible."
  : `\n${failed} problem(s) found.`);
process.exit(failed === 0 ? 0 : 1);
