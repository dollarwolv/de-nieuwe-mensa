import Link from "next/link";

import config from "@payload-config";
import { getPayload } from "payload";

const BLOG_POST_LIMIT = 50;

async function getBlogPosts() {
  try {
    const payload = await getPayload({ config });
    const { docs } = await payload.find({
      collection: "blogPosts",
      depth: 1,
      limit: BLOG_POST_LIMIT,
      sort: "-postedDate",
      where: {
        posted: {
          equals: true,
        },
      },
    });

    return { posts: docs, error: null };
  } catch (error) {
    console.error("Failed to load blog posts:", error);
    return { posts: [], error };
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

function pickFeaturedPost(posts) {
  // Posts are already sorted by date, so return the first featured item.
  const featuredPost = posts.find((post) => post?.featured);
  return featuredPost || posts[0];
}

export default async function BlogPage() {
  const { posts, error } = await getBlogPosts();

  if (error) {
    return (
      <div className="flex w-full flex-col items-center">
        <div className="mt-12 w-full max-w-460">
          <h1 className="md:text-step-7 text-7xl leading-[100%] font-extrabold">
            BLOG
          </h1>
          <p className="text-test-step--1 mt-6 max-w-[50ch]">
            We hit a snag loading the blog posts. Please check back soon.
          </p>
        </div>
      </div>
    );
  }

  if (!posts?.length) {
    return (
      <div className="flex w-full flex-col items-center">
        <div className="mt-12 w-full max-w-460">
          <h1 className="md:text-step-7 text-6xl leading-[100%] font-extrabold">
            BLOG
          </h1>
          <p className="text-test-step--1 mt-6 max-w-[50ch]">
            No posts yet. Check back soon for stories from the DNM kitchen.
          </p>
        </div>
      </div>
    );
  }

  const featuredPost = pickFeaturedPost(posts);
  const remainingPosts = posts.filter((post) => post?.id !== featuredPost?.id);
  const featuredDate = formatDate(
    featuredPost?.postedDate ? new Date(featuredPost.postedDate) : null,
  );
  const featuredImage = featuredPost?.coverImage?.url;
  const featuredAlt =
    featuredPost?.coverImage?.alt || featuredPost?.title || "Featured post";

  return (
    <div className="flex w-full flex-col items-center">
      <div className="mt-12 flex w-full max-w-460 flex-col gap-6 md:grid md:grid-cols-24 md:items-end">
        <h1 className="md:text-step-7 col-start-1 col-end-12 text-7xl leading-[92%] font-extrabold">
          BLOG
        </h1>
        <p className="text-test-step--1 col-start-12 col-end-25 max-w-[45ch] font-medium">
          Stories, updates, and behind-the-scenes moments from the people
          cooking up De Nieuwe Mensa.
        </p>
      </div>

      {featuredPost && (
        <section className="mt-6 w-full max-w-460 md:mt-12">
          <Link
            href={`/blog/${featuredPost.id}`}
            className="group border-dnm-black/10 flex flex-col gap-6 rounded-4xl border bg-white p-6 md:grid md:grid-cols-24 md:gap-8"
          >
            <div className="col-start-1 col-end-15">
              {featuredImage ? (
                <img
                  src={featuredImage}
                  alt={featuredAlt}
                  className="aspect-video w-full rounded-3xl object-cover"
                />
              ) : (
                <div className="bg-dnm-black/5 text-dnm-gray flex aspect-video w-full items-center justify-center rounded-3xl text-sm font-semibold">
                  No cover image
                </div>
              )}
            </div>
            <div className="col-start-15 col-end-25 flex flex-col gap-4">
              <span className="text-dnm-gray text-sm font-semibold">
                Featured
              </span>
              <h2 className="text-test-step-2 leading-[92%] font-extrabold tracking-tight">
                {featuredPost?.title}
              </h2>
              {featuredPost?.summary && (
                <p className="text-test-step--2 leading-[92%] font-medium tracking-tight">
                  {featuredPost.summary}
                </p>
              )}
              <div className="text-dnm-gray mt-auto flex flex-wrap gap-3 text-sm font-semibold">
                {featuredPost?.author && <span>{featuredPost.author}</span>}
                {featuredDate && <span>{featuredDate}</span>}
              </div>
            </div>
          </Link>
        </section>
      )}

      {remainingPosts.length > 0 && (
        <section className="mt-16 w-full max-w-460">
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {remainingPosts.map((post) => {
              const postDate = formatDate(
                post?.postedDate ? new Date(post.postedDate) : null,
              );
              const postImage = post?.coverImage?.url;
              const postAlt =
                post?.coverImage?.alt || post?.title || "Blog post cover";

              return (
                <Link
                  key={post.id}
                  href={`/blog/${post.id}`}
                  className="group border-dnm-black/10 flex h-full flex-col gap-4 rounded-3xl border bg-white p-5 transition-transform duration-200 hover:-translate-y-1"
                >
                  {postImage ? (
                    <img
                      src={postImage}
                      alt={postAlt}
                      className="aspect-4/3 w-full rounded-2xl object-cover"
                    />
                  ) : (
                    <div className="bg-dnm-black/5 text-dnm-gray flex aspect-4/3 w-full items-center justify-center rounded-2xl text-sm font-semibold">
                      No cover image
                    </div>
                  )}
                  <div className="flex flex-col gap-2">
                    <h3 className="text-2xl leading-[100%] font-extrabold tracking-tight">
                      {post?.title}
                    </h3>
                    {post?.summary && (
                      <p className="line-clamp-5 text-lg leading-[100%] font-medium">
                        {post.summary}
                      </p>
                    )}
                  </div>
                  <div className="text-dnm-gray mt-auto flex flex-wrap gap-3 text-sm font-semibold">
                    {post?.author && <span>{post.author}</span>}
                    {postDate && <span>{postDate}</span>}
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}
