/** @type {import('payload').CollectionConfig} */

export const Testimonials = {
  slug: "testimonials",
  admin: { useAsTitle: "name" },
  fields: [
    { name: "name", type: "text", required: true },
    { name: "studyprogram", type: "text" },
    { name: "quote", type: "textarea", required: true },
  ],
};
