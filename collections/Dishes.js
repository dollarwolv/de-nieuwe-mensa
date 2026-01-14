/** @type {import('payload').CollectionConfig} */

export const Dishes = {
  slug: "dishes",
  admin: { useAsTitle: "name" },
  fields: [
    { name: "name", type: "text", required: true },
    { name: "image", type: "upload", relationTo: "media", required: true },
    { name: "recipe", type: "richText" },
    {
      name: "ingredients",
      type: "array",
      fields: [
        { name: "amount", type: "text" },
        { name: "item", type: "text" },
      ],
    },
    {
      name: "nutrition",
      type: "group",
      fields: [
        { name: "calories", type: "number" },
        { name: "protein", type: "number" },
        { name: "carbs", type: "number" },
        { name: "fat", type: "number" },
      ],
    },
  ],
};
