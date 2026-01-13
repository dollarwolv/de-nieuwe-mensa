/** @type {import('payload').CollectionConfig} */

export const Boards = {
  slug: "boards",
  admin: { useAsTitle: "year" },
  fields: [
    { name: "year", type: "text", required: true },
    {
      name: "members",
      type: "array",
      fields: [
        { name: "name", type: "text", required: true },
        { name: "role", type: "text", required: true },
        { name: "profilePicture", type: "upload", relationTo: "media" },
      ],
    },
  ],
};
