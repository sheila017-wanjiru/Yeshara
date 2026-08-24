# Sanity schemas

These files define the content model for the Yeshara site. They are not
wired to a live dataset yet — no Sanity project has been provisioned.

## What is here

| Schema | Feeds |
|---|---|
| `assetListing.ts` | `/marketplace` and `/marketplace/[slug]` |
| `insight.ts` | `/insights` and `/insights/[slug]` |
| `partner.ts` | The partner belt on `/` |

Each mirrors a TypeScript type in `lib/content/types.ts`. Keep the two in
step: the types are what the routes compile against.

## Wiring it up

1. Create a Sanity project and copy these schemas into its studio.
2. Add `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET` and
   a read token to the environment.
3. Replace the bodies of the accessor functions in
   `lib/content/assets.ts`, `insights.ts` and `partners.ts` with GROQ
   queries returning the same shapes.

Nothing else changes. Every route already awaits those functions, so the
swap is confined to three files.

## Two rules the schemas encode

**`logoPermissionOnFile` gates partner rendering.** A partner belt is the
most screenshotted element on a site like this, and "we integrate with
them" is not "they are a partner". The flag means a signed permission
exists, not that a conversation happened.

**No demo content is imported.** All 8 records in the previous
platform's listings endpoint are fixtures — "Test new Asset", Lorem
Ipsum, `Seller Test`, `123 Main Street, Cityville`, and a Nairobi
listing describing a location near a Texas highway. The marketplace
launches with its empty state instead.
