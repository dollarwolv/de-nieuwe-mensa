"use client";

import "./StickyCards.css";
import { useScroll, useTransform, motion } from "framer-motion";
import { useEffect, useRef } from "react";
import Button from "./General/Button";

function StickyCard({ data, rounded = true, cardHeight = 100 }) {
  const ref = useRef();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const opacityValue = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const scaleValue = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  const rotationValue = useTransform(scrollYProgress, [0, 1], [0, -4]);
  const rotateXValue = useTransform(
    scrollYProgress,
    [0, 0.3, 1],
    [0, -10, -50],
  );

  const cardH = `${cardHeight}vh`;
  const wrapperH = `${cardHeight * 2}vh`;

  return (
    <div
      className={`bg-dnm-black relative w-full ${data.index !== "01" && rounded && cardHeight >= 100 && "rounded-t-4xl"} `}
      ref={ref}
      style={{
        height: data.index !== "03" ? wrapperH : "auto",
        marginTop: data.index === "01" ? "0" : `-${cardH}`,
      }}
    >
      <motion.div
        className={`${data.bgColor} sticky-card sticky top-0 flex w-screen flex-col ${rounded && cardHeight >= 100 && "rounded-t-4xl"} border-t px-6 pt-12 lg:flex-row`}
        style={{
          height: cardH,
          perspective: 1200,
          rotateX: data.index !== "03" ? rotateXValue : 0,
          scale: data.index !== "03" ? scaleValue : 1,
          rotateZ: data.index !== "03" ? rotationValue : 0,
          "--after-opacity": data.index !== "03" ? opacityValue : 0,
        }}
      >
        <div className="flex flex-1 lg:flex-2">
          <h1 className="lg:text-test-step-5 text-7xl leading-[92%] font-bold tracking-tight">
            ({data.index})
          </h1>
        </div>
        <div
          className={`flex flex-4 flex-col items-start gap-6 ${cardHeight >= 100 && "pt-12"}`}
        >
          <h1
            className={`${cardHeight === 100 ? "text-step-7" : "text-step-4"} leading-[92%] font-bold tracking-tight md:w-[75%]`}
          >
            {data.title}
          </h1>
          <img
            src="https://picsum.photos/1920/1080"
            alt="placeholder image"
            className="aspect-5/3 max-w-[75%]"
            style={{ aspectRatio: cardHeight < 100 ? 2 / 1 : 5 / 3 }}
          />
          <div className="lg:text-step--1 flex flex-row gap-2 md:w-[75%] md:flex-row md:gap-6">
            <div className="flex flex-col gap-2">
              <p> {data.description}</p>
              {data.index == "03" && cardHeight >= 100 && (
                <Button className="w-fit px-0 font-extrabold">
                  LEARN MORE ABOUT DNM
                </Button>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default StickyCard;
