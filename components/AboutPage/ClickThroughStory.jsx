"use client";

import { useState } from "react";
import RoundButton from "../General/RoundButton";
import { AnimatePresence, motion } from "framer-motion";

function ClickThroughStory() {
  const story = [
    {
      year: "2023",
      month: "February",
      monthAbb: "Feb",
      text: "In February of 2023, a few students were fed up with the high food prices, so they formed 'ANTIKANTINE': a protest movement against the high prices.",
    },
    {
      year: "2023",
      month: "March",
      monthAbb: "Mar",
      text: "In March, they held their first protest, giving out free sandwiches on campus. This attracted attention from several regional news platforms, which made many students join to fight for the cause.",
    },
    {
      year: "2024",
      month: "February",
      monthAbb: "Feb",
      text: `A year later, ANTIKANTINE announced their biggest protest yet, giving out free Daal in the canteen. 
      This announcement sparked a controversy among students — while many were in favor of the cause, some did not agree that canteen food should be affordable, attesting that "Appie is around the corner".`,
    },
    {
      year: "2024",
      month: "March",
      monthAbb: "Mar",
      text: `This controversy helped the announcement go viral, which caused many students to show up to the March protests. The huge turnout attracted the attention of the UvA, 
      which invited ANTIKANTINE to join a stakeholder meeting with the Facility Services department, who are in charge of the canteen.`,
    },
    {
      year: "2024",
      month: "May",
      monthAbb: "May",
      text: `During our meeting with the UvA's Facility Services in May, we discussed how the canteen could be improved.
      The UvA carefully listened to our vision for the canteen and the idea of an entirely student-run, non-profit food stall emerged.
      We agreed to set up a pilot project to make our vision a reality.`,
    },
    {
      year: "2024",
      month: "September",
      monthAbb: "Sep",
      text: `In September, we started recruiting a team and prepared for our launch in February 2025. With a budget of 10.000€ from the UvA, we
      covered initial bureaucratic, as well as operational costs, and managed to set up a business.`,
    },
    {
      year: "2025",
      month: "February",
      monthAbb: "Feb",
      text: `In February of 2025, De Nieuwe Mensa finally opened as a fully non-profit, student-run canteen stall. The project was extremely well-received
      by both students and staff, managing to sell around 1800 portions every week.`,
    },
    {
      year: "2025",
      month: "August",
      monthAbb: "Aug",
      text: "In August, the initial test phase of the project ended, and we were able to prolong our contract for an additional year at REC. Currently, we are expanding our menu and optimizing our operations to make De Nieuwe Mensa a permanent part of campus life.",
    },
  ];

  const [index, setIndex] = useState(0);
  const progress = (index + 1) / story.length;
  const markerPositions = story.map(
    (_, markerIndex) => ((markerIndex + 1) / story.length) * 100,
  );

  return (
    <section className="mt-24 w-full max-w-460 md:mt-54 md:px-8">
      <h2 className="text-test-step-0 font-bold">Our Journey — Timeline</h2>
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
              className="md:text-test-step-9 block text-8xl leading-[80%] font-extrabold"
            >
              {story[index].year}
            </motion.span>
          </AnimatePresence>
        </div>
        <div className="relative inline-flex overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.span
              className="text-test-step-3 hidden leading-[100%] font-bold md:ml-4 md:block"
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
        <svg width="100%" height="16" className="overflow-visible">
          <line x1="0" y1="8" x2="100%" y2="8" stroke="black" strokeWidth="8" />
          <line
            x1="0"
            y1="8"
            x2="100%"
            y2="8"
            stroke="oklch(0.5725 0.1145 151.74)"
            strokeWidth="8"
            pathLength="1"
            strokeDasharray="1"
            strokeDashoffset={1 - progress}
            style={{ transition: "stroke-dashoffset 0.4s ease-out" }}
          />
          {markerPositions.map((position, markerIndex) => {
            const isCompleted = markerIndex <= index;

            return (
              <circle
                key={story[markerIndex].year * markerIndex}
                cx={`${position}%`}
                cy="8"
                r="6"
                fill={isCompleted ? "oklch(0.5725 0.1145 151.74)" : "white"}
                stroke="black"
                strokeWidth="1"
                style={{ transition: "fill 0.3s ease-out" }}
                onClick={() => setIndex(markerIndex)}
                className="hover:r- cursor-pointer shadow hover:fill-[oklch(0.5725_0.0629_151.74)]"
              />
            );
          })}
        </svg>
      </div>

      <div className="flex flex-col justify-between md:flex-row md:items-start">
        <p className="md:text-test-step--2 max-w-[48ch] font-medium md:mt-4">
          {story[index].text}
        </p>
        <div className="flex w-104 justify-between gap-4 max-md:mt-8 max-md:w-full md:mr-4">
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
              direction={"right"}
            />
          )}
        </div>
      </div>
    </section>
  );
}

export default ClickThroughStory;
