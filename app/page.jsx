"use client";

import Image from "next/image";

import Button from "@/components/Button";
import ScrollText from "@/components/ScrollText";
import StickyCards from "@/components/StickyCards";
import FloatingImageGallery from "@/components/FloatingImageGallery";

import { useEffect } from "react";
import Lenis from "lenis";

export default function Home() {
  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis();

    // Use requestAnimationFrame to continuously update the scroll
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);
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
          <Button className="md:text-step-1 w-fit font-extrabold">
            SEE THIS WEEK'S MENU
          </Button>
        </div>
      </div>
      <ScrollText />

      <FloatingImageGallery />

      {/* Sticky Cards */}
      <StickyCards />
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
