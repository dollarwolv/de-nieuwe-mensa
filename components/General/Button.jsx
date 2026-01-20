"use client";

import Link from "next/link";
import { pageAnimation } from "./Navbar";
import { useTransitionRouter } from "next-view-transitions";

function Button({
  children,
  className = "text-2xl",
  navigate = false,
  navigateTo,
  scrollTo = null,
  type = "button",
}) {
  const router = useTransitionRouter();

  function handleNav(e, route, url) {
    e.preventDefault();
    if (!route) {
      return router.push(url, {
        onTransitionReady: pageAnimation,
      });
    }
    router.push(route.url, {
      onTransitionReady: pageAnimation,
    });
  }

  const scroll = () => {
    const el = document.getElementById(scrollTo);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <button
      className={`bg-dnm-light-green rounded-full border border-black px-5 py-2 text-white shadow-[4px_4px_0px_0px_rgb(35,35,35)] ${className} hover:bg-dnm-black cursor-pointer transition-colors`}
      type={type}
      onClick={(e) => {
        if (scrollTo) {
          scroll(e.preventDefault());
        }
      }}
    >
      {navigate ? (
        <Link href={navigateTo} onClick={(e) => handleNav(e, null, navigateTo)}>
          {children}
        </Link>
      ) : (
        children
      )}
    </button>
  );
}

export default Button;
