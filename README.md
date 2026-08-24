# Yeshara — production website

Server-rendered marketing and marketplace site for Yeshara Tokens
Limited. Next.js 15 App Router, TypeScript strict, Tailwind v4.

Every route returns rendered HTML. That is the defect this build exists
to fix: the previous site was a client-rendered SPA returning
byte-identical meta on every URL, which made it invisible to search
engines and to AI retrieval.

---

## Running it

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # production build
npm start            # serve the production build
```

### Environment

Copy `.env.example` to `.env.local`. Nothing is required to build or to
render any page; the variables only enable form delivery.

| Variable | Needed for |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Canonical URLs, sitemap, OG image URLs. Defaults to `https://www.yeshara.com`. |
| `DATABASE_URL` | Persisting contact submissions and newsletter signups. |
| `RESEND_API_KEY`, `RESEND_FROM` | Sending enquiry notifications and newsletter confirmations. |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | Cookieless analytics. Leave unset to disable. |

Before launch, create the tables once:

```bash
psql "$DATABASE_URL" -f scripts/schema.sql
```

**Forms fail loudly rather than silently.** If a submission can be
neither stored nor emailed, the form returns the direct email address
instead of reporting success. Telling someone their message was sent
when nothing was written is the worst failure mode a contact form has.

---

## Verifying it

Three suites, each runnable against a running production server.

```bash
npm run build && npm start &

npm run verify:ssr    http://localhost:3000   # server-rendered content + metadata
npm run verify:a11y   http://localhost:3000   # WCAG 2.2 A/AA via axe-core
npm run verify:print  http://localhost:3000   # ink-on-paper contrast
```

- **`verify:ssr`** — curls every route and asserts its real headings and
  body copy are in the HTML, that titles are unique, and that
  `robots.txt`, `sitemap.xml` and `llms.txt` serve.
- **`verify:a11y`** — runs axe-core over all 13 routes in both the
  default and `prefers-reduced-motion: reduce` states.
- **`verify:print`** — emulates print media and measures real contrast
  against the effective background. Someone will export this to PDF for
  a bank.

All three pass on the current tree.

---

## Architecture

```
app/                    routes; one file per URL
  actions.ts            Server Actions for both forms
  og/route.tsx          per-route Open Graph images
  llms.txt/route.ts     plain-text summary for AI retrieval
components/
  primitives/           Button, Chip, Placeholder, Section, Icons
  layout/               header, footer, logo, legal shell
  content/              the content sections
  marketplace/          asset cards and empty state
  motion/               marquee, scroll reveal, hero pipeline
  forms/                fields, contact form, newsletter
content/                confirmed facts and copy, each with a source
lib/
  content/              typed content accessors — the CMS seam
  db.ts mailer.ts       persistence and transactional email
sanity/schemas/         schemas for the Studio (not wired yet)
scripts/                schema.sql and the three verification suites
```

### Design tokens

`app/globals.css` holds the token block as the single source of truth,
with a `@theme` bridge mapping every Tailwind utility back to it.
Changing a colour means editing one line there. No component carries a
hex value except two documented exceptions: `app/og/route.tsx`, because
Satori renders with no stylesheet, and the logo mark, which is artwork
that must render identically on any ground.

Base resets live in `@layer base` and typographic helpers in
`@layer components`. This matters: unlayered CSS beats layered CSS
regardless of specificity, so leaving `a{color:inherit}` unlayered
silently defeats every Tailwind text-colour utility on a link.

### Accent rationing

Each step of the teal ramp has one job.

| Step | Sole use |
|---|---|
| `tq-200` | Display figures only |
| `tq-300` | Every interactive element, link, active state, label |
| `tq-500` | Marks, fills, the logo |
| `tq-600` | Card hover borders |
| `tq-700` | Strokes, gradient tails |
| `tq-900` | Section edges, tinted rules |

Teal never appears on body copy, card backgrounds or decorative shapes.
`--tx-4` fails AA at 3.7:1 and is decorative only — it must never carry
a word.

### Content

Routes never hard-code listings, articles or partners. They await the
accessors in `lib/content/`, which are file-backed today. Swapping to
Sanity means reimplementing three functions against GROQ; the matching
schemas are in `sanity/schemas/`.

`lib/content/fixture-guard.ts` withholds listings carrying demo-fixture
tells from the public marketplace, and logs why.

---

## Editorial rules this codebase enforces

**No fabricated claims.** Every factual statement traces to
`content/facts.ts`, which carries a source per entry. Anything
unconfirmed renders as a visible amber `Placeholder`, never as invented
copy and never silently dropped.

**The status badge system stays.** Every claim carries Confirmed
(green), Stated direction (neutral) or Placeholder (amber). An analyst
can tell at a glance what is tested, what is intended and what is
missing. Colour is always paired with a word. Do not remove this to make
the site look more polished — it is the most institutionally persuasive
element here.

**Language that must stay precise.** Write "admitted to the CMA
Regulatory Sandbox" and add that sandbox admission is a supervised test,
not a licence. Never write that Yeshara is "a regulated fintech" — it is
inaccurate and the distinction has consequences under the VASP Act 2025.
Reference the VASP Act 2025 and VASP Regulations 2026, never "the VASP
Bill".

**Market figures.** Only the White Paper 2025 set is published, each
under a visible source line. The previous homepage's $1 trillion Kenyan
real estate market — with residential at $693B and commercial at $79B,
labelled 90% and 10% despite summing to $772B — conflicts with the White
Paper's $40bn by a factor of twenty-five and carried no citation. It
must not be reinstated without a source.

---

## Still needed before launch

**Blocking:**

1. Logo as SVG — icon and wordmark, light and dark lockups
2. Licensed display typeface, or written approval to ship Figtree
3. Confirmed blockchain and token standard
4. Confirmed licensing status under the VASP Act 2025 / Regulations 2026
5. Trustee, custodian and auditor names
6. Legal review of the Privacy Policy
7. A decision on **Yeshara Coin** and **the Yeshara Exchange Platform**

**Needed for a credible launch:**

8. Team names, roles, photographs, founding date
9. Partner logos with written permission on file
10. At least one real asset listing, or agreement to launch with the
    empty state
11. Sourced market figures, or agreement to publish only the White Paper
    set
12. Institutional contact routing — an inbox that is not WhatsApp
13. Three to five Insights articles

### Two items escalated, not built

**Yeshara Coin.** The existing Terms of Service describe a 1:1
USD-pegged internal settlement unit that trades convert into and out of,
with proceeds paid in it and converted via third-party exchanges. It
appears nowhere else. A fiat-pegged unit is a licensable activity under
the VASP Act 2025, whose transition period runs to 4 November 2026. No
UI references it.

**The Yeshara Exchange Platform.** Named once on the existing
`/investors` page and nowhere else. No copy repeats it until its status
is confirmed.

---

## Deploying

Vercel, with the environment variables above set for Production. The
marketplace index reads `searchParams` so it renders per request; every
other content route is static.
