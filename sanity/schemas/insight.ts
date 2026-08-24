import { defineField, defineType } from "sanity";

/** Mirrors Insight in lib/content/types.ts. */
export const insight = defineType({
  name: "insight",
  title: "Insight",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required().max(140) }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      type: "string",
      options: {
        list: ["Regulation", "Tokenization", "Property", "Structure", "Markets"],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "excerpt",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required().max(300),
    }),
    defineField({
      name: "body",
      type: "array",
      of: [{ type: "block" }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "readingMinutes",
      type: "number",
      validation: (rule) => rule.required().integer().positive(),
    }),
    defineField({ name: "author", type: "string", validation: (r) => r.required() }),
    defineField({ name: "publishedAt", type: "datetime", validation: (r) => r.required() }),
    defineField({
      name: "seo",
      type: "object",
      fields: [
        {
          name: "title",
          type: "string",
          description: "Overrides the article title in <title>. Keep it distinct.",
          validation: (rule) => rule.max(70),
        },
        {
          name: "description",
          type: "text",
          rows: 2,
          validation: (rule) => rule.max(160),
        },
      ],
    }),
  ],
  preview: { select: { title: "title", subtitle: "category" } },
});
