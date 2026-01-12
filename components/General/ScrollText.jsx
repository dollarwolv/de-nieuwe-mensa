import { useAnimationFrame, useScroll, useVelocity } from "framer-motion";
import { useRef } from "react";

function ScrollText({ texts }) {
  const container = useRef();
  const { scrollY } = useScroll({
    target: container,
    offset: ["start end", "end start"],
  });

  const textRefs = useRef([]);
  const scrollVelocity = useVelocity(scrollY);
  const baseOffset = useRef(0);

  // generate array of offsets of the individual texts
  const charWidth = 14.6;
  let offsets = [];
  let current = 0;
  texts.forEach((text) => {
    offsets.push(current);
    current += charWidth * text.length;
  });
  const totalLength = current;

  /**
   * This function is responsible for moving the text along and moving it left/right
   * on scroll.
   */
  useAnimationFrame((time, delta) => {
    // loop through each text ref, and move it to the right.
    textRefs.current.forEach((text, i) => {
      const v = scrollVelocity.get();
      const baseSpeed = 25;
      const boostSpeed = 0.2;
      const speed = baseSpeed + v * boostSpeed;

      // each frame, increase the base offset by speed * time passed (delta)
      baseOffset.current += (speed * delta) / 1000;

      // change startOffset of each text to the length of the text (offset[i]) + the increased baseOffset,
      // and use modulo to wrap around. -800 because it wraps around when the text has just left the screen
      let moveBy = ((offsets[i] + baseOffset.current) % totalLength) - 800;
      text.setAttribute("startOffset", `${moveBy}px`);
    });
  });

  return (
    <div className="hidden w-full max-w-460 md:block" ref={container}>
      <svg viewBox="0 0 1512 137" className="my-12 overflow-visible">
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
