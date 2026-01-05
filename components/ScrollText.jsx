"use client";

import { useAnimationFrame, useScroll } from "framer-motion";
import { useEffect } from "react";
import { useRef } from "react";

function ScrollText() {
  const texts = [
    "  [40.000+] Students served  |",
    "  [200.000+] Total Euros saved  |",
    "  [50%+] Meal costs reduced  |",
    "  [20.000+] Appie runs eliminated  |",
    "  [12+] Students employed  |",
  ];

  const container = useRef();
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"],
  });

  const textRefs = useRef([]);

  const charWidth = 14.6;
  let cumulative = 0;

  let offsets = [];
  let current = 0;
  texts.forEach((text) => {
    offsets.push(current);
    current += charWidth * text.length;
  });

  const totalLength = current;

  console.log(offsets);

  useEffect(() => {
    scrollYProgress.on("change", (e) => {
      textRefs.current.forEach((text, i) => {
        text.setAttribute("startOffset", offsets[i] - 800 + e * 800 + "px");
      });
    });
  }, []);

  return (
    <div className="w-full" ref={container}>
      <svg viewBox="0 0 1512 137" className="mt-12 overflow-visible">
        <path
          d="M0 136.001C287.5 136.001 472.5 0.499903 751 0.5C1029.5 0.500097 1262.5 136.001 1512 136.001"
          id="curve"
          fill="none"
        />
        <text className="text-3xl text-black">
          {texts.map((text, i) => {
            return (
              <textPath
                href="#curve"
                key={i}
                startOffset={offsets[i] + "px"} // when i comment this out, it doesn't work anymore. why?
                ref={(ref) => (textRefs.current[i] = ref)}
              >
                {text}
              </textPath>
            );
          })}
        </text>
      </svg>
    </div>
  );
}

export default ScrollText;
