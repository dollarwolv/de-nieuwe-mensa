/** @type {import('payload').CollectionConfig} */

export const Dishes = {
  slug: "dishes",
  admin: { useAsTitle: "name" },
  fields: [
    { name: "name", type: "text", required: true },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      admin: {
        description:
          "Short URL slug for the dish (e.g., 'mushroom-stew' in denieuwemensa.nl/dishes/mushroom-stew). Leave empty to auto-generate from the name.",
      },
      hooks: {
        beforeValidate: [
          ({ value, siblingData }) => {
            if (value) return value;
            if (!siblingData?.name) return value;

            const slug = siblingData.name
              .toLowerCase()
              .trim()
              .replace(/[^a-z0-9]+/g, "-")
              .replace(/(^-|-$)/g, "");

            if (slug.length <= 60) return slug;

            return slug.slice(0, 60).replace(/-[^-]*$/, "");
          },
        ],
      },
    },
    { name: "image", type: "upload", relationTo: "media", required: true },
    { name: "description", type: "text" },
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
