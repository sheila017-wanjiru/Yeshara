/**
 * Lighthouse audit — mobile profile.
 *
 *   npm run build && npx next start -p 3260 &
 *   node scripts/lighthouse.mjs http://localhost:3260
 *
 * Targets from the build spec: Performance, Accessibility and SEO all
 * >= 95 on mobile.
 */
import { launch } from "chrome-launcher";
import lighthouse from "lighthouse";

const BASE = process.argv[2] ?? "http://localhost:3260";
const ROUTES = process.argv[3]?.split(",") ?? ["/", "/tokenization", "/marketplace", "/legal/privacy"];
const TARGET = 95;

const chrome = await launch({
  chromePath: process.env.CHROMIUM_PATH || "/opt/pw-browsers/chromium",
  chromeFlags: ["--headless=new", "--no-sandbox", "--disable-dev-shm-usage"],
});

let failed = 0;
const rows = [];

for (const route of ROUTES) {
  const result = await lighthouse(
    `${BASE}${route}`,
    { port: chrome.port, output: "json", logLevel: "error" },
    // Default Lighthouse config is the mobile profile: Moto G Power
    // emulation with 4x CPU throttling and a slow-4G network.
  );
  const c = result.lhr.categories;
  const score = (k) => Math.round((c[k]?.score ?? 0) * 100);
  const row = {
    route,
    perf: score("performance"),
    a11y: score("accessibility"),
    seo: score("seo"),
    bp: score("best-practices"),
    lcp: result.lhr.audits["largest-contentful-paint"]?.numericValue,
    cls: result.lhr.audits["cumulative-layout-shift"]?.numericValue,
  };
  rows.push(row);
  if (row.perf < TARGET || row.a11y < TARGET || row.seo < TARGET) failed++;
}

await chrome.kill();

console.log("route                perf  a11y   seo    bp     LCP      CLS");
for (const r of rows) {
  console.log(
    `${r.route.padEnd(20)} ${String(r.perf).padStart(4)}  ${String(r.a11y).padStart(4)}  ${String(r.seo).padStart(4)}  ${String(r.bp).padStart(4)}  ${(r.lcp / 1000).toFixed(2)}s  ${r.cls.toFixed(3)}`,
  );
}
console.log(
  failed === 0
    ? `\nPASS — Performance, Accessibility and SEO all >= ${TARGET} on mobile.`
    : `\n${failed} route(s) below ${TARGET}.`,
);
process.exit(failed === 0 ? 0 : 1);
