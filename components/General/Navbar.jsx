"use client";

import Image from "next/image";
import Button from "./Button";
import { useState } from "react";
import { Squeeze as Hamburger } from "hamburger-react";
import { motion, AnimatePresence } from "framer-motion";

function Navbar() {
  const [isOpen, setOpen] = useState(false);

  return (
    <>
      <div className="fixed top-4 left-4 z-10 block md:hidden">
        <Hamburger toggled={isOpen} toggle={setOpen} />
      </div>

      <div className="lg:text-step-0 md:text-step-1 flex w-full items-center justify-between px-5 font-extrabold">
        <div className="relative hidden shrink-0 md:block md:h-13 md:w-16 lg:h-18 lg:w-22">
          <Image
            src="/logo.png"
            alt="De Nieuwe Mensa Logo"
            fill
            className="object-cover"
          />
        </div>

        <div className="hidden items-center gap-5 md:flex">
          <span>About</span>
          <span>Transparency</span>
          <span>Catering</span>
          <span>Blog</span>
          <Button className="text-2xl">SUPPORT US</Button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ clipPath: "inset(0% 0% 100%)" }}
            animate={{ clipPath: "inset(0% 0% 0%)" }}
            exit={{ clipPath: "inset(0% 0% 100%)" }}
            transition={{ duration: 0.7, ease: [0.85, 0, 0.15, 1] }}
            key="hamburger"
            className="bg-dnm-dark-green fixed top-0 left-0 z-1 flex h-full w-full flex-col justify-end px-2 md:hidden"
          >
            <div className="flex flex-col gap-2 text-3xl text-white uppercase">
              <span>About</span>
              <span>Transparency</span>
              <span>Catering</span>
              <span>Blog</span>
              <Button>SUPPORT US</Button>
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
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navbar;
