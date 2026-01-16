/** @type {import('payload').CollectionConfig} */

export const BlogPosts = {
  slug: "blogPosts",
  admin: { useAsTitle: "title" },
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
