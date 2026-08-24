import { defineField, defineType } from "sanity";

/** Mirrors Partner in lib/content/types.ts. */
export const partner = defineType({
  name: "partner",
  title: "Partner",
  type: "document",
  fields: [
    defineField({ name: "name", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "category",
      type: "string",
      options: {
        list: [
          "trustee",
          "custodian",
          "auditor",
          "legal",
          "compliance-tech",
          "payments",
          "network",
          "institution",
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "logoLight", title: "Logo (for light grounds)", type: "image" }),
    defineField({ name: "logoDark", title: "Logo (for dark grounds)", type: "image" }),
    defineField({
      name: "needsPlate",
      title: "Needs a white plate",
      type: "boolean",
      description:
        "Set this when the supplied logo is dark-on-transparent. Without a plate it disappears against the dark card.",
      initialValue: false,
    }),
    defineField({ name: "url", type: "url" }),
    defineField({
      name: "logoPermissionOnFile",
      title: "Written logo permission on file",
      type: "boolean",
      description:
        "Gates rendering entirely. Only set this true when a signed permission exists — an integration or a conversation is not permission.",
      initialValue: false,
      validation: (rule) => rule.required(),
    }),
  ],
  preview: { select: { title: "name", subtitle: "category", media: "logoDark" } },
});
