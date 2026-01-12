"use client";

import { useState } from "react";
import RoundButton from "../General/RoundButton";
import { AnimatePresence, motion } from "framer-motion";

function ClickThroughStory() {
  const story = [
    {
      year: "2023",
      month: "April",
      monthAbb: "Apr",
      text: "In April of 2023, a few students were fed up with the high food prices, so they formed 'Antikantine': a protest movement against the high prices.",
    },
    {
      year: "2024",
      month: "June",
      monthAbb: "Jun",
      text: "In June, they held their first protest, where they haneded out free food in the canteen to stick it to the canteen overlords.",
    },
    {
      year: "2025",
      month: "August",
      monthAbb: "Aug",
      text: "In August, they held their second protest, where they haneded out EVEN MORE free food in the canteen to stick it to the canteen overlords.",
    },
    {
      year: "2026",
      month: "September",
      monthAbb: "Sep",
      text: "In September, members of ANTIKANTINE talked to the UvA staff, seeing where things could go.",
    },
  ];

  const [index, setIndex] = useState(0);
  const progress = (index + 1) / story.length;

  return (
    <section className="mt-60 w-full">
      <h2 className="text-test-step-0 font-bold">Our Origin</h2>
      <div className="flex flex-row items-start justify-start">
        <div className="relative inline-flex overflow-hidden">
          <AnimatePresence mode="popLayout">
            <motion.span
              key={story[index].text}
              initial={{ y: "100%", opacity: 0.2 }}
              animate={{ y: "0%", opacity: 1 }}
              exit={{ y: "-100%", opacity: 0.2 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
                mass: 1,
              }}
              style={{ willChange: "transform" }}
              className="text-test-step-10 block leading-[80%] font-extrabold"
            >
              {story[index].year}
            </motion.span>
          </AnimatePresence>
        </div>
        <div className="relative inline-flex overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.span
              className="text-test-step-4 hidden leading-[100%] font-bold md:ml-4 md:block"
              key={story[index].text}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                ease: "easeInOut",
                duration: 0.2,
              }}
              style={{ willChange: "transform" }}
            >
              {story[index].month}
            </motion.span>
          </AnimatePresence>
          <AnimatePresence mode="wait">
            <motion.span
              className="text-test-step-2 leading-[100%] font-bold md:ml-4 md:hidden"
              key={story[index].text}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                ease: "easeInOut",
                duration: 0.15,
              }}
              style={{ willChange: "transform" }}
            >
              {story[index].monthAbb}
            </motion.span>
          </AnimatePresence>
        </div>
      </div>

      {/* SVG PROGRESS BAR */}
      <div className="my-8 w-full">
        <svg width="100%" height="2" className="overflow-visible">
          <line x1="0" y1="1" x2="100%" y2="1" stroke="black" strokeWidth="6" />
          <line
            x1="0"
            y1="1"
            x2="100%"
            y2="1"
            stroke="oklch(0.5725 0.1145 151.74)"
            strokeWidth="6"
            pathLength="1"
            strokeDasharray="1"
            strokeDashoffset={1 - progress}
            style={{ transition: "stroke-dashoffset 0.4s ease-out" }}
          />
        </svg>
      </div>

      <div className="flex flex-col justify-between md:flex-row md:items-center">
        <p className="md:text-test-step--2 max-w-[40ch] font-medium md:mt-12">
          {story[index].text}
        </p>
        <div className="flex w-44 justify-between gap-4 max-md:mt-8">
          {index > 0 ? (
            <RoundButton
              onClick={() => {
                if (index > 0 && index < story.length) {
                  setIndex((prev) => prev - 1);
                }
              }}
              direction={"left"}
            />
          ) : (
            <div className="w-20" />
          )}

          {index < story.length - 1 && (
            <RoundButton
              onClick={() => {
                if (index < story.length - 1) {
                  setIndex((prev) => prev + 1);
                }
              }}
            />
          )}
        </div>
      </div>
    </section>
  );
}

export default ClickThroughStory;
