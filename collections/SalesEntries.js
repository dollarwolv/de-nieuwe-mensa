/** @type {import('payload').CollectionConfig} */

export const SalesEntries = {
  slug: "salesEntries",
  admin: { useAsTitle: "date" },
  fields: [
    { name: "date", type: "date", required: true },
    { name: "amount", type: "number", required: true },
  ],
};
