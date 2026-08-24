#!/usr/bin/env bash
# Acceptance test for §2.1 and §14: every route must return its real
# headings and body copy to a client that runs no JavaScript.
#
#   npm run build && npx next start -p 3210 &
#   scripts/verify-ssr.sh http://localhost:3210
#
# Each line is a route and a phrase that only that route contains.
set -uo pipefail
BASE="${1:-http://localhost:3210}"
fail=0

check() {
  local path="$1" phrase="$2"
  local body
  body="$(curl -sf "$BASE$path" 2>/dev/null)" || { printf '  FAIL  %-34s (request failed)\n' "$path"; fail=1; return; }
  if grep -qF "$phrase" <<<"$body"; then
    printf '  ok    %-34s %s\n' "$path" "\"$phrase\""
  else
    printf '  FAIL  %-34s missing: %s\n' "$path" "\"$phrase\""
    fail=1
  fi
}

# A route's <title> must be unique across the site.
titles() {
  local seen
  seen="$(for p in "$@"; do curl -sf "$BASE$p" | grep -o '<title>[^<]*</title>'; done)"
  local total unique
  total="$(wc -l <<<"$seen")"
  unique="$(sort -u <<<"$seen" | wc -l)"
  if [ "$total" -eq "$unique" ]; then
    printf '  ok    %-34s %s routes, %s distinct titles\n' "<title> uniqueness" "$total" "$unique"
  else
    printf '  FAIL  %-34s %s routes but only %s distinct titles\n' "<title> uniqueness" "$total" "$unique"
    fail=1
  fi
}

echo "Server-rendered content:"
check /                        "secure, tradeable"
check /tokenization            "Five phases"
check /marketplace             "in structuring"
check /insights                "Yeshara Insights"
check /about                   "cowrie"
check /investors               "structural moat"
check /contact                 "Wu-Yi Plaza"
check /get-started             "Choose your role"
check /sign-in                 "Sign in"
check /legal/terms             "not a registered broker-dealer"
check /legal/privacy           "Data Protection Act 2019"
check /legal/risk-disclosure   "Capital is at risk"
check /legal/cookies           "cookieless"

echo
echo "Machine-readable surfaces:"
check /robots.txt              "GPTBot"
check /sitemap.xml             "https://www.yeshara.com"
check /llms.txt                "Yeshara Tokens Limited"

echo
echo "Per-route metadata:"
titles / /tokenization /marketplace /insights /about /investors /contact \
       /get-started /legal/terms /legal/privacy /legal/risk-disclosure /legal/cookies

echo
if [ "$fail" -eq 0 ]; then echo "PASS — every checked route server-renders."; else echo "FAILURES ABOVE."; fi
exit "$fail"
