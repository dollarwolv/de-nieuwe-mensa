"use client";

import {
  useAnimationFrame,
  useInView,
  useScroll,
  useSpring,
} from "framer-motion";
import { useId, useMemo, useRef } from "react";

function ScrollText({ texts }) {
  const container = useRef();
  const textRef = useRef(null);
  const curveId = useId();
  const isInView = useInView(container, { amount: 0.1 });
  const { scrollY } = useScroll({
    target: container,
    offset: ["start end", "end start"],
  });

  const scrollVelocity = useSpring(scrollY, {
    stiffness: 300,
    damping: 30,
    mass: 0.5,
  });
  const baseOffset = useRef(0);

  const { repeatedText, totalLength } = useMemo(() => {
    const sequence = texts.join("");
    const charWidth = 14.4;
    const current = charWidth * sequence.length;

    // Repeat the sequence so Safari only has to animate one textPath.
    return {
      repeatedText: `${sequence}${sequence}${sequence}`,
      totalLength: current,
    };
  }, [texts]);

  /**
   * This function is responsible for moving the text along and moving it left/right
   * on scroll.
   */
  useAnimationFrame((time, delta) => {
    if (!isInView) return;

    const velocity = scrollVelocity.getVelocity();
    const baseSpeed = 200;
    const boostSpeed = 0.4;
    const speed = baseSpeed + velocity * boostSpeed;

    // Advance the marquee once per frame, not once per text node.
    baseOffset.current += (speed * delta) / 1000;

    // Safari is much smoother when only one textPath offset changes per frame.
    const moveBy = (baseOffset.current % totalLength) - totalLength - 800;
    textRef.current?.setAttribute("startOffset", `${moveBy}px`);
  });

  return (
    <div
      className="hidden w-full max-w-460 will-change-auto md:block"
      ref={container}
    >
      <svg viewBox="0 0 1512 137" className="my-12 overflow-visible">
        <path
          d="M0 136.001C287.5 136.001 472.5 0.499903 751 0.5C1029.5 0.500097 1262.5 136.001 1512 136.001"
          id={curveId}
          fill="none"
        />
        <text className="text-3xl font-medium text-black will-change-auto">
          <textPath href={`#${curveId}`} ref={textRef}>
            {repeatedText}
          </textPath>
        </text>
      </svg>
    </div>
  );
}

export default ScrollText;
