-- Yeshara — form persistence schema.
-- Run once against the target database before launch:
--   psql "$DATABASE_URL" -f scripts/schema.sql
-- Kept as a file rather than an auto-migration so a production
-- database is never altered by a page render.

CREATE TABLE IF NOT EXISTS contact_submissions (
  id          bigserial PRIMARY KEY,
  name        text        NOT NULL,
  email       text        NOT NULL,
  phone       text        NOT NULL,
  company     text,
  message     text        NOT NULL,
  role        text,
  source      text        NOT NULL,
  user_agent  text,
  created_at  timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS contact_submissions_created_at_idx
  ON contact_submissions (created_at DESC);

CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id                 bigserial PRIMARY KEY,
  email              text        NOT NULL UNIQUE,
  -- Double opt-in: a row only counts as a subscriber once
  -- confirmed_at is set by the emailed token coming back.
  confirm_token      text,
  confirmed_at       timestamptz,
  unsubscribe_token  text        NOT NULL,
  unsubscribed_at    timestamptz,
  created_at         timestamptz NOT NULL DEFAULT now(),
  updated_at         timestamptz NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX IF NOT EXISTS newsletter_confirm_token_idx
  ON newsletter_subscribers (confirm_token) WHERE confirm_token IS NOT NULL;
CREATE UNIQUE INDEX IF NOT EXISTS newsletter_unsubscribe_token_idx
  ON newsletter_subscribers (unsubscribe_token);
