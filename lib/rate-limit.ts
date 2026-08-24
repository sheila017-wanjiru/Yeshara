import "server-only";

/**
 * Fixed-window rate limiter.
 *
 * State is per-instance and in-memory: on a serverless platform each
 * cold instance starts empty, so this raises the cost of casual abuse
 * rather than guaranteeing a global ceiling. It is deliberately paired
 * with a honeypot instead of a CAPTCHA — the spec rules CAPTCHA out,
 * and an institutional audience should not be asked to identify
 * traffic lights to send a message.
 *
 * If submission volume ever justifies a hard global limit, swap the
 * Map for a Redis INCR with EXPIRE behind this same signature.
 */
type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();

/** Drop expired buckets so the Map cannot grow without bound. */
function sweep(now: number) {
  if (buckets.size < 512) return;
  for (const [key, bucket] of buckets) {
    if (bucket.resetAt <= now) buckets.delete(key);
  }
}

export function rateLimit(
  key: string,
  { limit = 5, windowMs = 10 * 60 * 1000 } = {},
): { ok: boolean; retryAfterSeconds: number } {
  const now = Date.now();
  sweep(now);

  const existing = buckets.get(key);
  if (!existing || existing.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true, retryAfterSeconds: 0 };
  }

  existing.count += 1;
  if (existing.count > limit) {
    return {
      ok: false,
      retryAfterSeconds: Math.max(1, Math.ceil((existing.resetAt - now) / 1000)),
    };
  }
  return { ok: true, retryAfterSeconds: 0 };
}

/**
 * Best-effort client identity from proxy headers. Vercel sets
 * x-forwarded-for; the first entry is the client. Falls back to a
 * shared bucket, which is stricter rather than looser.
 */
export function clientKey(headers: Headers, scope: string): string {
  const forwarded = headers.get("x-forwarded-for");
  const ip = forwarded?.split(",")[0]?.trim() || headers.get("x-real-ip") || "unknown";
  return `${scope}:${ip}`;
}
