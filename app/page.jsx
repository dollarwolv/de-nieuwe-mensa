"use client";

import Image from "next/image";

import Button from "@/components/Button";
import ScrollText from "@/components/ScrollText";
import StickyCards from "@/components/StickyCards";
import FloatingImageGallery from "@/components/FloatingImageGallery";
import ValuesSection from "@/components/ValuesSection";
import HireUs from "@/components/HireUs";
import Testimonials from "@/components/Testimonials";

import { useEffect } from "react";
import Lenis from "lenis";
import MenuSection from "@/components/MenuSection";

export default function Home() {
  // useEffect(() => {
  //   // Initialize Lenis
  //   const lenis = new Lenis();

  //   // Use requestAnimationFrame to continuously update the scroll
  //   function raf(time) {
  //     lenis.raf(time);
  //     requestAnimationFrame(raf);
  //   }

  //   requestAnimationFrame(raf);
  // }, []);

  const heroTexts = [
    "  [40.000+] Meals served  |",
    "[300+] Daily portions sold  | ",
    " [40%+] Meal costs reduced  | ",
    " [20.000+] Appie runs spared  |",
    "  [12+] Students employed  |",
    "  [100%] plant-powered meals  |  ",
  ];

  const menuTexts = [
    "[15+] Average Grams of Protein  |",
    "  [10+] Filling Food Options |",
    "[20+] Essential Nutrients | ",
    "[1000+] times healthier than Albert Heijn Croissants  | ",
    "  [100%] plant-powered meals  |  ",
  ];
  return (
    <div className="relative flex flex-col items-center">
      {/* Hero section */}
      <div className="mt-12 flex max-w-460 flex-col items-center justify-center gap-24 px-2 md:mt-32 md:grid md:grid-cols-24 md:gap-0">
        <div className="relative aspect-square w-full max-w-112.5 md:col-start-17 md:col-end-25 md:row-start-1 md:-mt-5 md:-mb-5 md:ml-auto md:max-w-full">
          <Image
            src="/daal.png"
            className="object-cover"
            alt="Daal at de nieuwe mensa"
            fill
          />
        </div>
        <div className="flex flex-col gap-2 md:col-start-1 md:col-end-16 md:gap-4 lg:gap-8">
          <div className="md:text-step-5 text-mobile-step-5 flex flex-col leading-[92%] font-extrabold tracking-tight">
            <span className="">REAL FOOD.</span>
            <span className="">4,50 EUROS.</span>
            <span className="">NO COMPROMISE.</span>
          </div>
          <span className="text-mobile-step-1 md:text-step-0 leading-[92%] font-medium tracking-tight">
            Student-led. Non-profit. Taking back the canteen with healthy, vegan
            meals.
          </span>
          <Button className="md:text-step-1 w-fit text-2xl font-extrabold">
            SEE THIS WEEK'S MENU
          </Button>
        </div>
      </div>
      <ScrollText texts={heroTexts} />

      <div className="flex w-screen flex-col items-center justify-center pt-2">
        <div className="flex w-full justify-between px-4">
          <span className="text-sm font-medium">(ABOUT DNM)</span>
          <span className="text-sm font-medium">(SCROLL TO EXPLORE)</span>
        </div>

        <h3 className="text-step-3 mt-25 max-w-[22ch] text-center leading-[95%] font-semibold tracking-tight">
          What started as a protest against the status quo is now your daily
          alternative. De Nieuwe Mensa is a student-led non-profit initiative
          serving fresh, vegan meals for a fair price—because affordable food
          shouldn't be a radical idea.
        </h3>
      </div>

      <FloatingImageGallery />

      {/* Sticky Cards */}
      <StickyCards />
      {/* <ValuesSection /> */}
      <MenuSection />
      <ScrollText texts={menuTexts} />
      <HireUs />
      <Testimonials />
      <p>hi</p>
      <p>hi</p>
      <p>hi</p>
      <p>hi</p>
      <p>hi</p>
      <p>hi</p>
      <p>hi</p>
      <p>hi</p>
      <p>hi</p>
      <p>hi</p>
      <p>hi</p>
      <p>hi</p>
      <p>hi</p>
      <p>hi</p>
      <p>hi</p>
      <p>hi</p>
      <p>hi</p>
      <p>hi</p>
      <p>hi</p>
      <p>hi</p>
      <p>hi</p>
      <p>hi</p>
      <p>hi</p>
      <p>hi</p>
      <p>hi</p>
      <p>hi</p>
      <p>hi</p>
      <p>hi</p>
      <p>hi</p>
      <p>hi</p>
      <p>hi</p>
      <p>hi</p>
      <p>hi</p>
      <p>hi</p>
      <p>hi</p>
      <p>hi</p>
      <p>hi</p>
      <p>hi</p>
      <p>hi</p>
      <p>hi</p>
      <p>hi</p>
      <p>hi</p>
      <p>hi</p>
      <p>hi</p>
      <p>hi</p>
      <p>hi</p>
      <p>hi</p>
      <p>hi</p>
      <p>hi</p>
      <p>hi</p>
      <p>hi</p>
      <p>hi</p>
      <p>hi</p>
      <p>hi</p>
      <p>hi</p>
      <p>hi</p>
      <p>hi</p>
      <p>hi</p>
      <p>hi</p>
      <p>hi</p>
      <p>hi</p>
      <p>hi</p>
      <p>hi</p>
      <p>hi</p>
      <p>hi</p>
      <p>hi</p>
      <p>hi</p>
      <p>hi</p>
      <p>hi</p>
      <p>hi</p>
      <p>hi</p>
      <p>hi</p>
      <p>hi</p>
      <p>hi</p>
      <p>hi</p>
      <p>hi</p>
      <p>hi</p>
      <p>hi</p>
      <p>hi</p>
      <p>hi</p>
    </div>
  );
}
