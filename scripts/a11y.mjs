/**
 * Accessibility audit — WCAG 2.2 A/AA, via axe-core in Chromium.
 *
 *   npm run build && npx next start -p 3230 &
 *   node scripts/a11y.mjs http://localhost:3230
 *
 * Checks every route in both the default state and with
 * prefers-reduced-motion forced on, since the reduced-motion path
 * changes what is rendered.
 */
import { chromium } from "playwright";
import { AxeBuilder } from "@axe-core/playwright";

const BASE = process.argv[2] ?? "http://localhost:3230";

const ROUTES = [
  "/",
  "/tokenization",
  "/marketplace",
  "/insights",
  "/about",
  "/investors",
  "/contact",
  "/get-started",
  "/sign-in",
  "/legal/terms",
  "/legal/privacy",
  "/legal/risk-disclosure",
  "/legal/cookies",
];

const TAGS = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"];

let totalViolations = 0;

// Use the Chromium already on the machine when one is present, rather
// than downloading a matching build. CHROMIUM_PATH overrides.
const executablePath = process.env.CHROMIUM_PATH || "/opt/pw-browsers/chromium";
const { existsSync } = await import("node:fs");
const browser = await chromium.launch(
  existsSync(executablePath) ? { executablePath } : {},
);

for (const reducedMotion of ["no-preference", "reduce"]) {
  const context = await browser.newContext({
    reducedMotion,
    viewport: { width: 1280, height: 900 },
  });
  console.log(`\n=== prefers-reduced-motion: ${reducedMotion} ===`);

  for (const route of ROUTES) {
    const page = await context.newPage();
    try {
      await page.goto(`${BASE}${route}`, { waitUntil: "networkidle", timeout: 30_000 });
      const results = await new AxeBuilder({ page }).withTags(TAGS).analyze();

      if (results.violations.length === 0) {
        console.log(`  ok    ${route}`);
      } else {
        totalViolations += results.violations.length;
        console.log(`  FAIL  ${route}`);
        for (const v of results.violations) {
          console.log(`          [${v.impact}] ${v.id}: ${v.help}`);
          for (const node of v.nodes.slice(0, 3)) {
            console.log(`            ${node.target.join(" ")}`);
          }
        }
      }
    } catch (error) {
      totalViolations += 1;
      console.log(`  ERROR ${route} — ${error.message.split("\n")[0]}`);
    } finally {
      await page.close();
    }
  }
  await context.close();
}

await browser.close();

console.log(
  totalViolations === 0
    ? "\nPASS — no WCAG 2.2 A/AA violations detected by axe-core."
    : `\n${totalViolations} violation group(s) found.`,
);
process.exit(totalViolations === 0 ? 0 : 1);
