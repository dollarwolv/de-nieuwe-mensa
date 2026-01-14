/** @type {import('payload').GlobalConfig} */

export const MenuSettings = {
  slug: "menuSettings",
  label: "Menu Settings",
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "currentWeek",
      type: "select",
      options: ["A", "B"],
      label: "Current Week (A/B)",
      required: true,
      admin: {
        description: `Toggle this option to control what week it is currently (A or B). 
           You can do this when you, for example, did the same week twice in a row, or when there were holidays 
           in between and you are starting with a different week again.`,
      },
    },
    {
      name: "anchorDate",
      type: "date",
      required: true,
      admin: {
        description: `This is the "anchor date" that the system refers to in order to calculate what week it currently is and what dish should be shown. 
        It's best to leave this option alone, and just switch the "Current Week" option.`,
      },
    },
    {
      name: "weekADishes",
      type: "array",
      label: "Dishes in Week A",
      fields: [
        {
          name: "dish",
          type: "relationship",
          relationTo: "dishes",
          required: true,
        },
      ],
      required: true,
      validate: (value) => {
        if (!value) return "Week A is required.";
        if (value.length < 5)
          return `Week A must have exactly 5 dishes. Still missing ${5 - value.length}.`;
        if (value.length > 5)
          return `Week A must have exactly 5 dishes. You added ${value.length - 5} too many.`;
        return true;
      },
      admin: {
        description: `This is a list of the dishes in Week A. Change their order so that it's correct. You have to put exactly 5 dishes in.`,
      },
    },
    {
      name: "weekBDishes",
      type: "array",
      label: "Dishes in Week B",
      fields: [
        {
          name: "dish",
          type: "relationship",
          relationTo: "dishes",
          required: true,
        },
      ],
      required: true,
      validate: (value) => {
        if (!value) return "Week B is required.";
        if (value.length < 5)
          return `Week B must have exactly 5 dishes. Still missing ${5 - value.length}.`;
        if (value.length > 5)
          return `Week B must have exactly 5 dishes. You added ${value.length - 5} too many.`;
        return true;
      },
      admin: {
        description: `This is a list of the dishes in Week B. Change their order so that it's correct. You have to put exactly 5 dishes in.`,
      },
    },
  ],
};
