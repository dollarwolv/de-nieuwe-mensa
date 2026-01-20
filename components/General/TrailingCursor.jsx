"use client";

import { useEffect, useRef, useState } from "react";
import { useMotionValue, useSpring } from "framer-motion";
import { motion } from "framer-motion";

function TrailingCursor() {
  const trailer = useRef();

  const x = useSpring(0, { stiffness: 300, damping: 30, mass: 0.5 });
  const y = useSpring(0, { stiffness: 300, damping: 30, mass: 0.5 });

  function updateMousePosition(e) {
    x.set(e.clientX);
    y.set(e.clientY);
  }

  useEffect(() => {
    console.log(x, y);
  }, [x]);

  useEffect(() => {
    window.addEventListener("mousemove", updateMousePosition);

    return () => window.removeEventListener("mousemove", updateMousePosition);
  }, []);

  return (
    <div className="pointer-events-none fixed top-0 z-9999 h-screen w-screen">
      <motion.div
        style={{ x, y }}
        transition={{ type: "tween", ease: "backOut" }}
        className="bg-dnm-light-green z-10000000 h-4 w-4 -translate-x-[150%] rounded-full"
        ref={trailer}
      />
    </div>
  );
}

export default TrailingCursor;
