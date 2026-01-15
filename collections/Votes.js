/** @type {import('payload').CollectionConfig} */

export const Votes = {
  slug: "votes",
  admin: {
    defaultColumns: [
      "dish",
      "satisfaction",
      "tastiness",
      "fillingness",
      "healthiness",
      "valueForMoney",
      "remarks",
      "voteDate",
    ],
  },
  fields: [
    {
      name: "dish",
      type: "relationship",
      relationTo: "dishes",
      required: "true",
    },
    {
      name: "satisfaction",
      type: "number",
      required: true,
      min: 1,
      max: 10,
    },
    {
      name: "tastiness",
      type: "number",
      min: 1,
      max: 10,
    },
    {
      name: "fillingness",
      type: "number",
      min: 1,
      max: 10,
    },
    {
      name: "healthiness",
      type: "number",
      min: 1,
      max: 10,
    },
    {
      name: "valueForMoney",
      type: "number",
      min: 1,
      max: 10,
    },
    {
      name: "remarks",
      type: "text",
    },
    {
      name: "voteDate",
      type: "date",
      required: true,
      index: true,
    },
    {
      name: "voterId",
      type: "text",
      required: true,
      index: true,
    },
  ],
};
