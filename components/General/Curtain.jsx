"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Curtain() {
  return (
    <motion.div
      className="bg-dnm-light-green pointer-events-none fixed inset-0 z-9999"
      initial={{ clipPath: "inset(0% 0% 0% 0%)" }}
      animate={{ clipPath: "inset(0% 0% 100% 0%)" }}
      transition={{ duration: 1, ease: [0.83, 0, 0.17, 1], delay: 0.25 }}
    >
      <motion.div
        initial={{ scale: "75%" }}
        animate={{ scale: "200%" }}
        transition={{ duration: 1, ease: [0.83, 0, 0.17, 1] }}
        className="h-screen w-screen"
      >
        {/* TODO: Add animated SVG of logo */}
        <Image
          src={"/logo_black.svg"}
          width={172}
          height={172}
          className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"
          style={{ objectFit: "cover" }}
          alt="DNM Logo"
        />
      </motion.div>
    </motion.div>
  );
}
