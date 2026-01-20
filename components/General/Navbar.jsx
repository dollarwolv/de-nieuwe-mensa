"use client";

import Image from "next/image";
import Button from "./Button";
import { useState } from "react";
import { Squeeze as Hamburger } from "hamburger-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useTransitionRouter } from "next-view-transitions";
import { usePathname } from "next/navigation";

export function pageAnimation() {
  document.documentElement.animate(
    [
      {
        clipPath: "inset(80% 30% 15% 30% round 999px)",
      },
      {
        clipPath: "inset(0% 0% 0% 0% round 0px)",
      },
    ],
    {
      duration: 1000,
      easing: "cubic-bezier(0.83, 0, 0.17, 1)",
      pseudoElement: "::view-transition-new(root)",
    },
  );
}

function Navbar() {
  const [isOpen, setOpen] = useState(false);
  const router = useTransitionRouter();
  const pathname = usePathname();

  function handleNav(e, route) {
    e.preventDefault();
    if (!route) {
      if (pathname !== "/") {
        return router.push("/", {
          onTransitionReady: pageAnimation,
        });
      }
    }
    if (pathname !== route.url) {
      router.push(route.url, {
        onTransitionReady: pageAnimation,
      });
    }
  }

  const routes = [
    { label: "About", url: "/about" },
    { label: "Transparency", url: "/transparency" },
    { label: "Catering", url: "/catering" },
    { label: "Blog", url: "/blog" },
    { label: "Dishes", url: "/dishes" },
    { label: "Vote", url: "/vote" },
  ];

  return (
    <>
      <div className="fixed top-4 left-4 z-20 block lg:hidden">
        <Hamburger toggled={isOpen} toggle={setOpen} />
      </div>

      <nav className="lg:text-test-step--1 flex w-full max-w-460 items-center justify-between px-5 font-extrabold">
        <div className="relative hidden shrink-0 md:h-13 md:w-16 lg:block lg:h-18 lg:w-22">
          <Link
            href={"/"}
            onClick={(e) => {
              handleNav(e);
            }}
          >
            <Image
              src="/logo.png"
              alt="De Nieuwe Mensa Logo"
              fill
              className="object-cover"
            />
          </Link>
        </div>

        <div className="hidden items-center gap-5 lg:flex">
          {routes.map((route) => {
            return (
              <Link
                href={route.url}
                key={route.label}
                onClick={(e) => handleNav(e, route)}
              >
                {route.label}
              </Link>
            );
          })}
          <Button className="text-2xl">GET INVOLVED</Button>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.nav
            initial={{ clipPath: "inset(0% 0% 100%)" }}
            animate={{ clipPath: "inset(0% 0% 0%)" }}
            exit={{ clipPath: "inset(0% 0% 100%)" }}
            transition={{ duration: 0.7, ease: [0.85, 0, 0.15, 1] }}
            key="hamburger"
            className="bg-dnm-dark-green fixed top-0 left-0 z-10 flex h-dvh w-full flex-col justify-end overflow-hidden px-2 pb-[env(safe-area-inset-bottom)] lg:hidden"
          >
            <div className="flex flex-col gap-2 text-3xl text-white uppercase">
              <Link
                href="/"
                onClick={(e) => {
                  (handleNav(e), setOpen(false));
                }}
              >
                Home
              </Link>
              {routes.map((route) => {
                return (
                  <Link
                    href={route.url}
                    onClick={(e) => {
                      handleNav(e, route);
                      setOpen(false);
                    }}
                    key={route.label}
                  >
                    {route.label}
                  </Link>
                );
              })}

              <Button>GET INVOLVED</Button>
            </div>
            <div className="mt-12 flex justify-between text-sm text-white uppercase">
              <div className="flex flex-col">
                <span>info@denieuwemensa.nl</span>
                <span>catering@denieuwemensa.nl</span>
                <span>Nieuwe Achtergracht 170, Amsterdam</span>
              </div>
              <div className="flex flex-col">
                <a href="https://www.instagram.com/denieuwemensa/">Instagram</a>
                <a href="https://www.linkedin.com/company/de-nieuwe-mensa/">
                  Linkedin
                </a>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navbar;
