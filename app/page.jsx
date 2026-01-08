"use client";

import Image from "next/image";

import Button from "@/components/Button";
import ScrollText from "@/components/ScrollText";
import StickyCards from "@/components/StickyCards";
import FloatingImageGallery from "@/components/FloatingImageGallery";
import ValuesSection from "@/components/ValuesSection";

import { useEffect } from "react";
import Lenis from "lenis";

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
      <ScrollText />

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

      <div className="bg-dnm-dark-green mt-25 -mb-12 flex h-24 w-screen rounded-t-4xl border-2"></div>
      <div className="bg-dnm-light-green -mb-12 flex h-22 w-screen rounded-t-4xl border-2"></div>
      <FloatingImageGallery />

      {/* Sticky Cards */}
      <StickyCards />
      <ValuesSection />

      <div className="mt-36 flex w-full flex-col items-center py-12">
        <div className="mb-6 flex flex-col items-center gap-2 tracking-tight">
          <h2 className="text-step-5 leading-[92%] font-extrabold">OUR MENU</h2>
          <span className="text-step-0 leading-[92%]">
            All of our meals 100% plant-based and made by students with ❤️
          </span>
        </div>
        <div className="flex h-75 w-full flex-row justify-between">
          <div className="flex h-75 w-full flex-2 items-center justify-center">
            <img
              src="https://picsum.photos/id/1074/1200/1200"
              alt=""
              className="h-75 rounded-2xl"
            />
          </div>
          <div className="flex h-full w-full flex-3 flex-col items-start justify-center gap-2">
            <p className="text-step-0 leading-[92%] font-bold tracking-tight">
              We believe in a canteen that serves students, not financial
              interests.
            </p>
            <p className="text-step-0 leading-[92%] font-bold tracking-tight">
              We are 100% transparent about where your money goes - so you can
              be sure that you are not paying more than you have to for the food
              you need.
            </p>
            <Button className="font-extrabold">
              SEE FULL FINANCIAL OVERVIEW
            </Button>
          </div>
        </div>
      </div>
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
