/** @type {import('payload').CollectionConfig} */

export const CateringRequests = {
  slug: "cateringRequests",
  admin: { useAsTitle: "name" },
  fields: [
    { name: "name", type: "text", required: true },
    { name: "email", type: "email", required: true },
    { name: "phone", type: "text" },
    { name: "eventAbout", type: "text", required: true },
    { name: "eventDate", type: "date" },
    { name: "eventTime", type: "text" },
    { name: "location", type: "text" },
    { name: "guestCount", type: "number" },
    { name: "dishRequest", type: "text" },
    { name: "desiredDish", type: "text" },
    { name: "remarks", type: "text" },
    { name: "submittedAt", type: "date" },
  ],
};
