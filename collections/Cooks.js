/** @type {import('payload').CollectionConfig} */

export const Cooks = {
  slug: "cooks",
  admin: { useAsTitle: "year" },
  fields: [
    { name: "year", type: "text", required: true },
    {
      name: "members",
      type: "array",
      fields: [
        { name: "name", type: "text", required: true },
        { name: "profilePicture", type: "upload", relationTo: "media" },
      ],
    },
  ],
};
