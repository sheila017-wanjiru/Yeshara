import "server-only";
import { Pool } from "pg";

/**
 * Postgres (Supabase or Neon) for form submissions and newsletter
 * signups.
 *
 * The pool is created lazily and cached on globalThis so hot reloads in
 * development do not open a new pool per request.
 */
declare global {
  // eslint-disable-next-line no-var
  var __yesharaPool: Pool | undefined;
}

export function isDatabaseConfigured(): boolean {
  return Boolean(process.env.DATABASE_URL);
}

function getPool(): Pool {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error("DATABASE_URL is not set");
  }
  if (!globalThis.__yesharaPool) {
    globalThis.__yesharaPool = new Pool({
      connectionString,
      max: 3,
      idleTimeoutMillis: 15_000,
      connectionTimeoutMillis: 8_000,
      // Managed Postgres (Supabase, Neon) terminates TLS with a chain
      // the Node default store does not always carry.
      ssl: connectionString.includes("sslmode=disable")
        ? false
        : { rejectUnauthorized: false },
    });
  }
  return globalThis.__yesharaPool;
}

/**
 * Schema. Run once against the database before launch:
 *
 *   psql "$DATABASE_URL" -f scripts/schema.sql
 *
 * Kept as a file rather than an auto-migration so a production database
 * is never altered by a page render.
 */
export async function query<T extends Record<string, unknown>>(
  text: string,
  params: unknown[] = [],
): Promise<T[]> {
  const result = await getPool().query(text, params);
  return result.rows as T[];
}

export type ContactSubmission = {
  name: string;
  email: string;
  phone: string;
  company: string | null;
  message: string;
  role: string | null;
  source: string;
  userAgent: string | null;
};

export async function saveContactSubmission(input: ContactSubmission): Promise<void> {
  await query(
    `INSERT INTO contact_submissions
       (name, email, phone, company, message, role, source, user_agent)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
    [
      input.name,
      input.email,
      input.phone,
      input.company,
      input.message,
      input.role,
      input.source,
      input.userAgent,
    ],
  );
}

/**
 * Double opt-in: the row is written unconfirmed and only counts as a
 * subscriber once the emailed token comes back. Re-subscribing an
 * existing unconfirmed address refreshes the token rather than
 * creating a duplicate.
 */
export async function saveNewsletterSignup(input: {
  email: string;
  confirmToken: string;
  unsubscribeToken: string;
}): Promise<void> {
  await query(
    `INSERT INTO newsletter_subscribers (email, confirm_token, unsubscribe_token)
     VALUES ($1, $2, $3)
     ON CONFLICT (email) DO UPDATE
       SET confirm_token = EXCLUDED.confirm_token,
           updated_at = now()
       WHERE newsletter_subscribers.confirmed_at IS NULL`,
    [input.email, input.confirmToken, input.unsubscribeToken],
  );
}

export async function confirmNewsletterSignup(token: string): Promise<boolean> {
  const rows = await query<{ email: string }>(
    `UPDATE newsletter_subscribers
        SET confirmed_at = now(), confirm_token = NULL, updated_at = now()
      WHERE confirm_token = $1
      RETURNING email`,
    [token],
  );
  return rows.length > 0;
}

export async function unsubscribeNewsletter(token: string): Promise<boolean> {
  const rows = await query<{ email: string }>(
    `UPDATE newsletter_subscribers
        SET unsubscribed_at = now(), updated_at = now()
      WHERE unsubscribe_token = $1 AND unsubscribed_at IS NULL
      RETURNING email`,
    [token],
  );
  return rows.length > 0;
}
