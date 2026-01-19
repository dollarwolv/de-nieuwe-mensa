"use client";

import { motion } from "framer-motion";

export default function Curtain() {
  return (
    <motion.div
      className="bg-dnm-black pointer-events-none fixed inset-0 z-9999"
      initial={{ clipPath: "inset(0% 0% 0% 0%)" }}
      animate={{ clipPath: "inset(0% 0% 100% 0%)" }}
      transition={{ duration: 1, ease: [0.85, 0, 0.15, 1], delay: 0.25 }}
    />
  );
}
