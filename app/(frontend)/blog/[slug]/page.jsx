import { RichText } from "@payloadcms/richtext-lexical/react";

import config from "@payload-config";
import { getPayload } from "payload";
import BlogMetaPanel from "@/components/Blog/BlogMetaPanel";

async function getBlogPost(slug) {
  try {
    const payload = await getPayload({ config });
    const { docs } = await payload.find({
      collection: "blogPosts",
      depth: 2,
      limit: 1,
      where: {
        slug: {
          equals: slug,
        },
      },
    });

    return { post: docs?.[0] || null, error: null };
  } catch (error) {
    console.error("Failed to load blog post:", error);
    return { post: null, error };
  }
}

function formatDate(date) {
  if (!date) return null;
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

export default async function BlogPostPage({ params }) {
  const { post, error } = await getBlogPost(params?.slug);

  if (error || !post) {
    return (
      <div className="flex w-full flex-col items-center">
        <div className="mt-12 w-full max-w-460">
          <h1 className="text-5xl leading-[100%] font-extrabold">BLOG</h1>
          <p className="text-test-step--1 mt-6 max-w-[50ch]">
            We couldn&apos;t find that post. Please check the URL and try again.
          </p>
        </div>
      </div>
    );
  }

  const postDate = formatDate(
    post?.postedDate ? new Date(post.postedDate) : null,
  );
  const coverImage = post?.coverImage?.url;
  const coverAlt = post?.coverImage?.alt || post?.title || "Blog post cover";

  return (
    <div className="flex w-full flex-col items-center">
      <div className="mt-12 w-full max-w-460">
        <h1
          id="blog-post-title"
          className="text-test-step-6 leading-[100%] font-extrabold tracking-tight"
        >
          {post?.title}
        </h1>
      </div>

      <div className="mt-4 grid w-full max-w-460 gap-10 lg:mt-10 lg:grid-cols-24">
        <aside className="lg:col-start-1 lg:col-end-9">
          <BlogMetaPanel
            title={post?.title}
            summary={post?.summary}
            author={post?.author}
            date={postDate}
            coverImage={coverImage}
            coverAlt={coverAlt}
          />
        </aside>

        <section className="lg:col-start-9 lg:col-end-25 lg:mr-12 xl:mr-18">
          {post?.textBody ? (
            <RichText
              data={post.textBody}
              className="text-dnm-black text-lg leading-[170%] [&_h2]:mt-10 [&_h2]:mb-4 [&_h2]:text-3xl [&_h2]:font-extrabold [&_h3]:mt-8 [&_h3]:mb-3 [&_h3]:text-2xl [&_h3]:font-extrabold [&_li]:mb-2 [&_ol]:mb-6 [&_p]:mb-6 [&_ul]:mb-6"
            />
          ) : (
            <p className="text-dnm-gray text-lg leading-[170%]">
              This post doesn&apos;t have any content yet.
            </p>
          )}
        </section>
      </div>
    </div>
  );
}
