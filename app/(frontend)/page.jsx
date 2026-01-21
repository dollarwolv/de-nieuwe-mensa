import Image from "next/image";

import Button from "@/components/General/Button";
import ScrollText from "@/components/General/ScrollText";
import StickyCards from "@/components/StickyCards";
import FloatingImageGallery from "@/components/FloatingImageGallery";
import ValuesSection from "@/components/LandingPage/ValuesSection";
import HireUs from "@/components/LandingPage/HireUs";
import Testimonials from "@/components/LandingPage/Testimonials";
import CircleScrollText from "@/components/LandingPage/CircleScrollText";
import AnimatedText from "@/components/General/AnimatedText";
import TrailingCursor from "@/components/General/TrailingCursor";

import Lenis from "lenis";
import MenuSection from "@/components/LandingPage/MenuSection";
import Curtain from "@/components/General/Curtain";

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
    <>
      <Curtain />
      <TrailingCursor />
      <div className="relative flex flex-col items-center">
        {/* Hero section */}
        <div className="mt-12 flex w-full max-w-460 flex-col items-center justify-center gap-8 px-2 md:mt-32 md:grid md:grid-cols-24 md:gap-0">
          <div className="relative aspect-square w-full max-w-112.5 md:col-start-17 md:col-end-25 md:row-start-1 md:-mt-5 md:-mb-5 md:ml-auto md:max-w-full">
            <div className="relative max-md:mx-auto max-md:max-w-[90%] md:h-full md:w-full">
              <Image
                src="/daal.png"
                className="absolute object-cover"
                alt="Daal at de nieuwe mensa"
                fill
              />
              <CircleScrollText />
            </div>
          </div>
          <div className="flex flex-col gap-2 md:col-start-1 md:col-end-16 md:gap-4 lg:gap-8">
            <div className="md:text-step-5 text-mobile-step-5 flex flex-col leading-[92%] font-extrabold tracking-tight">
              <AnimatedText
                text={"REAL FOOD."}
                as="h1"
                delayChildren={0.6}
                onRender={true}
              />
              <AnimatedText
                text={"4.50 EUROS."}
                as="h1"
                delayChildren={0.7}
                onRender={true}
              />
              <AnimatedText
                text={"NO COMPROMISE."}
                as="h1"
                delayChildren={0.8}
                onRender={true}
              />
            </div>
            <AnimatedText
              text={`Student-led. Non-profit. Taking back the canteen with healthy,
              vegan meals.`}
              className="text-mobile-step-1 md:text-step-0 leading-[92%] font-medium tracking-tight"
              splitBy="line"
              delayChildren={1}
              staggerChildren={0.1}
              onRender={true}
              as="p"
            />
            <Button
              className="md:text-step-1 w-fit text-2xl font-extrabold"
              scrollTo={"menu"}
            >
              SEE THIS WEEK'S MENU
            </Button>
          </div>
        </div>
        <ScrollText texts={heroTexts} />

        <div className="mt-12 flex w-full max-w-460 flex-col items-stretch justify-center pt-2 md:mt-0">
          <div className="flex w-full justify-between px-4">
            <span className="text-sm font-medium">(ABOUT DNM)</span>
            <span className="text-sm font-medium">(SCROLL TO EXPLORE)</span>
          </div>

          <AnimatedText
            as="p"
            text={`What started as a protest against the status quo is now your daily
            alternative. De Nieuwe Mensa is a student-led non-profit initiative
            serving fresh, vegan meals for a fair price—because affordable food
            shouldn't be a radical idea.`}
            splitBy="line"
            className="md:text-step-3 mx-auto my-12 text-center text-3xl leading-[95%] font-semibold tracking-tight md:my-24 md:max-w-[24ch]"
            delayChildren={0.1}
            staggerChildren={0.07}
          />
        </div>

        <FloatingImageGallery
          headingText={"OUR STORY"}
          subHeadingText={"FROM PROTEST MOVEMENT TO CANTEEN STALL"}
          bgColor={"bg-dnm-black"}
          textColor={"text-white"}
          showTop={false}
        />

        {/* Sticky Cards */}
        <StickyCards />
        {/* <ValuesSection /> */}
        <MenuSection />
        <ScrollText texts={menuTexts} />
        <HireUs />
        <Testimonials />
      </div>
    </>
  );
}
