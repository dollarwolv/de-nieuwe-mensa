"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";

const images = [
  {
    src: "/img/landing/values/bellpepper.webp",
    pos: "md:top-[-2%] md:left-[-5%] left-[-8%] top-[4%]",
  },
  {
    src: "/img/landing/values/potato.webp",
    pos: "md:bottom-[4%] left-[-4%] max-md:top-[64%]",
  },
  {
    src: "/img/landing/values/onion.webp",
    pos: "md:top-[48%] right-[-1%] top-[22%]",
  },
  {
    src: "/img/landing/values/onion.webp",
    pos: "bottom-[1%] md:left-[63%]",
  },
  {
    src: "/img/landing/values/onion.webp",
    pos: "md:top-[35%] left-[-1%] top-[28%]",
  },
  {
    src: "/img/landing/values/onion.webp",
    pos: "top-[-4%] md:left-[28%] left-[40%] top-[1%]",
  },

  {
    src: "/img/landing/values/onion.webp",
    pos: "md:top-[-7%] left-[92%] top-[58%]",
  },
  {
    src: "/img/landing/values/bellpepper.webp",
    pos: "bottom-[8%] md:left-[29%] left-1/2",
  },

  {
    src: "/img/landing/values/bellpepper.webp",
    pos: "bottom-[6%] left-[89%]",
  },
  {
    src: "/img/landing/values/potato.webp",
    pos: "md:top-[-3%] md:left-[60%] left-[80%] top-[1%]",
  },
];

const text = [
  {
    heading: "CHEAP",
    text: "We're a non-profit — the money we make only covers our costs, which include ingredients, a service fee we pay to Cirfood, and staff. We keep the price as low as we can to make the canteen accessible to as many students as possible.",
    img: {
      src: "/img/landing/values/bellpepper.webp",
    },
  },
  {
    heading: "SUSTAINABLE",
    text: "Good food starts with responsible sourcing. We cooperate with local farmers and Amsterdam-based stores to keep our supply chain short and direct. DNM is also part of the Dutch cuisine program “Biodiversiteit op je board” that is partnered with the WWF.",
    img: {
      src: "/img/landing/values/potato.webp",
    },
  },
  {
    heading: "TASTY",
    text: "All our dishes are fully vegan, built on staples like rice, couscous, and legumes that form the base of a satisfying meal. We avoid processed ingredients, focusing instead on creating depth of flavor through thoughtful seasoning and high-quality ingredients.",
    img: {
      src: "/img/landing/values/onion.webp",
    },
  },
];

const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };

function ValuesSection() {
  const container = useRef();

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["end start", "start end"],
  });

  const deplaceValue1 = useTransform(scrollYProgress, [1, 0], [-100, 0]);
  const deplaceValue2 = useTransform(scrollYProgress, [1, 0], [-100, 50]);
  const deplaceValue3 = useTransform(scrollYProgress, [1, 0], [-50, 150]);

  const planesData = [
    {
      speed: 0.05,
      opacity: "opacity-70",
      deplaceValue: deplaceValue1,
      images: images.slice(0, 3),
    },
    {
      speed: 0.2,
      opacity: "opacity-85",
      x: useSpring(0, springConfig),
      y: useSpring(0, springConfig),
      deplaceValue: deplaceValue2,
      images: images.slice(3, 6),
    },
    {
      speed: 0.4,
      opacity: "opacity-100",
      x: useSpring(0, springConfig),
      y: useSpring(0, springConfig),
      deplaceValue: deplaceValue3,
      images: images.slice(6, 10),
    },
  ];

  return (
    <div className="relative w-screen md:mt-24 md:h-screen" ref={container}>
      {planesData.map((plane, index) => (
        <motion.div
          key={index}
          style={{ y: plane.deplaceValue }}
          className="absolute h-full w-screen will-change-transform md:h-screen"
        >
          {plane.images.map((img, index) => (
            <img
              src={img.src}
              className={`${img.pos} ${plane.opacity} absolute z-0 h-32 object-contain md:h-44 xl:h-48`}
              key={index}
              loading="eager"
            />
          ))}
        </motion.div>
      ))}

      <div className="flex h-full w-full">
        <div className="z-10 m-auto flex h-fit w-fit flex-col gap-4 max-md:mt-24">
          <h1 className="mx-auto text-6xl leading-[92%] font-extrabold tracking-tighter lg:text-8xl">
            OUR VALUES
          </h1>
          <div className="flex flex-col gap-4 md:flex-row">
            {text.map((item, index) => (
              <div
                className="bg-dnm-white mx-auto flex h-fit flex-col items-center justify-center gap-1 rounded-2xl border-2 border-black p-4 shadow-xl"
                key={index}
              >
                <img src={item.img.src} alt="" className="h-32" />
                <h2 className="md:text-step-1 text-4xl font-bold">
                  {item.heading}
                </h2>
                <p className="max-w-[28ch] md:max-w-[24ch]">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ValuesSection;
