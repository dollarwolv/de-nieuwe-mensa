"use client";

import { useEffect, useState } from "react";

function BlogMetaPanel({ title, author, date, coverImage, coverAlt }) {
  const [titleInView, setTitleInView] = useState(true);

  useEffect(() => {
    // this is for hiding and showing the metadata post title when the big title is out of view
    const target = document.getElementById("blog-post-title");

    if (!target) {
      setTitleInView(false);
      return undefined;
    }

    const observer = new IntersectionObserver(([entry]) => {
      setTitleInView(entry.isIntersecting);
    });

    observer.observe(target);

    return () => observer.disconnect();
  }, []);

  const showMetaTitle = !titleInView;

  return (
    <div className="border-dnm-black/10 flex flex-col gap-4 rounded-3xl p-2 md:sticky md:top-6 lg:p-6">
      {/* see global CSS file for sticky-title class; basically when it's hidden it has opacity 0 and is pushed to the top,
       and when visible it has opacity 1 and gets pushed down to its normal position */}
      <h2
        className={`sticky-title ${showMetaTitle ? "visible" : ""} text-4xl leading-[110%] font-extrabold tracking-tight`}
      >
        {title}
      </h2>

      <div className="flex flex-col gap-6">
        <div className="border-dnm-black/10 flex flex-col gap-3 border-t pt-4 text-sm">
          {date && (
            <div className="text-dnm-gray flex items-center justify-between font-semibold">
              <span className="tracking-wide uppercase">Date</span>
              <span className="text-dnm-black">{date}</span>
            </div>
          )}
          {author && (
            <div className="text-dnm-gray flex items-center justify-between font-semibold">
              <span className="tracking-wide uppercase">Author</span>
              <span className="text-dnm-black">{author}</span>
            </div>
          )}
        </div>

        <div>
          {coverImage ? (
            <img
              src={coverImage}
              alt={coverAlt}
              className="aspect-4/3 w-full rounded-2xl object-cover"
            />
          ) : (
            <div className="bg-dnm-black/5 text-dnm-gray flex aspect-4/3 w-full items-center justify-center rounded-2xl text-sm font-semibold">
              No cover image
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default BlogMetaPanel;
