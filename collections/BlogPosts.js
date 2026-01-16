/** @type {import('payload').CollectionConfig} */

export const BlogPosts = {
  slug: "blogPosts",
  admin: {
    useAsTitle: "title",
    defaultColumns: [
      "title",
      "coverImage",
      "author",
      "summary",
      "posted",
      "featured",
    ],
  },
  fields: [
    { name: "title", type: "text", required: true },
    {
      name: "coverImage",
      type: "upload",
      relationTo: "media",
      admin: {
        description:
          "The cover image will be displayed on the page that shows all blog posts and at the top of the blog post. Please choose one before you publish the article.",
      },
    },
    {
      name: "author",
      type: "text",
      admin: {
        description: "You don't have to tell people if you don't want to.",
      },
    },
    {
      name: "slug",
      type: "text",
      required: true,
      defaultValue: ({ siblingData }) => {
        const title = siblingData?.title;
        if (!title) return "";
      },
      unique: true,
      admin: {
        description: `Short URL slug (e.g., 'first-example-post' in denieuwemensa.nl/blog/first-example-post). 
          Please provide a short title for the url, formated in all-lowercase with hyphens for spaces and no special characters. 
          Please try not to use more than 7 words.  
          For example, for an article called "How we founded De Nieuwe Mensa: The hoops we had to get through", 
          a good slug would be "mensa-founding-story" or "how-we-founded-mensa".
          If you leave this field empty, it will be auto-generated from the title, 
          but it's probably going to be very long, so it would be better if you did it manually.`,
      },
      hooks: {
        beforeValidate: [
          ({ value, siblingData }) => {
            if (value) return value;
            if (!siblingData?.title) return value;

            const slug = siblingData.title
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
    {
      name: "summary",
      type: "text",
      admin: {
        description: "A quick summary of the article.",
      },
    },
    {
      name: "posted",
      type: "checkbox",
      admin: {
        description:
          "Only if you check this field will the post appear on the page, so you can keep writing it inside of the CMS and publish it when you're ready.",
      },
    },
    {
      name: "postedDate",
      type: "date",
      admin: {
        readOnly: true,
        description: "Automatically set when the post is published.",
      },
      hooks: {
        beforeChange: [
          ({ siblingData, value }) => {
            if (siblingData.posted && !value) {
              return new Date();
            }

            if (!siblingData.posted) {
              return null;
            }

            return value;
          },
        ],
      },
    },
    {
      name: "featured",
      type: "checkbox",
      admin: {
        description:
          "This field decides whether the post will be displayed as a big, featured post. Please only select one post as featured, or else the site might behave strangely.",
      },
    },
    { name: "textBody", type: "richText", required: true },
  ],
};
