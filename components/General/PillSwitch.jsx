import { useState } from "react";
import { motion } from "framer-motion";
import { clipPath } from "framer-motion/client";

function PillSwitch({ toggled, setToggled, className = "" }) {
  return (
    <div
      className={`relative cursor-pointer ${className}`}
      onClick={() => setToggled((prev) => !prev)}
    >
      <motion.div
        className="bg-dnm-light-green absolute flex h-10 justify-between gap-4 rounded-full px-4 py-2 shadow"
        animate={{
          clipPath: toggled
            ? "inset(10% 2.5% 10% 48% round 20px)"
            : "inset(10% 49% 10% 2.5% round 20px)",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 22 }}
      >
        <span className="text-white">This week</span>
        <span className="text-white">Next week</span>
      </motion.div>
      <div className="bg-dnm-white flex justify-between gap-4 rounded-full px-4 py-2 shadow">
        <span>This week</span>
        <span>Next week</span>
      </div>
    </div>
  );
}

export default PillSwitch;
