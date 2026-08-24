import { defineField, defineType } from "sanity";

/** Mirrors AssetListing in lib/content/types.ts. */
export const assetListing = defineType({
  name: "assetListing",
  title: "Asset listing",
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (rule) => rule.required().max(120),
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "assetClass",
      type: "string",
      options: {
        list: [
          { title: "Real estate", value: "real-estate" },
          { title: "Financial instruments", value: "financial-instruments" },
        ],
        layout: "radio",
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "propertyType",
      type: "string",
      description: "Real estate only.",
      options: {
        list: ["residential", "commercial", "mixed-use"],
      },
      hidden: ({ document }) => document?.assetClass !== "real-estate",
    }),
    defineField({
      name: "instrumentType",
      type: "string",
      description: "Financial instruments only.",
      options: { list: ["equity", "debt", "hybrid"] },
      hidden: ({ document }) => document?.assetClass !== "financial-instruments",
    }),
    defineField({ name: "location", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "wrapper",
      type: "string",
      description: 'The legal wrapper, e.g. "SPV — trust".',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "trustee",
      type: "string",
      description: "The independent trustee holding title and investor funds.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "tokensIssued",
      type: "number",
      validation: (rule) => rule.required().integer().positive(),
    }),
    defineField({
      name: "minimumTicket",
      type: "string",
      description: 'Formatted, e.g. "KES 1,000".',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "allocationPercent",
      type: "number",
      validation: (rule) => rule.required().min(0).max(100),
    }),
    defineField({
      name: "status",
      type: "string",
      options: { list: ["open", "closed", "proposed"], layout: "radio" },
      initialValue: "proposed",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "summary",
      type: "text",
      rows: 3,
      description: "Also used as the meta description for this listing.",
      validation: (rule) => rule.required().max(300),
    }),
    defineField({ name: "description", type: "array", of: [{ type: "block" }] }),
    defineField({
      name: "documents",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "label", type: "string", validation: (r) => r.required() },
            { name: "file", type: "file", validation: (r) => r.required() },
            {
              name: "required",
              type: "boolean",
              title: "Required reading",
              initialValue: false,
            },
          ],
        },
      ],
    }),
    defineField({
      name: "images",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            {
              name: "alt",
              type: "string",
              title: "Alt text",
              description:
                "Describe the property. Never decorative on a listing.",
              validation: (rule) => rule.required(),
            },
          ],
        },
      ],
    }),
    defineField({
      name: "verificationNotes",
      type: "text",
      rows: 3,
      description:
        "What has been independently verified about this listing, and by whom.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "publishedAt",
      type: "datetime",
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "location", media: "images.0" },
  },
});
