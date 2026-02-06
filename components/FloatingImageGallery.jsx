"use client";

import { useSpring, motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";
import AnimatedText from "./General/AnimatedText";

const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };

function FloatingImageGallery({
  bgColor,
  headingText,
  subHeadingText,
  textColor,
  showTop = true,
}) {
  const container = useRef();

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["end start", "start end"],
  });

  const deplaceValue1 = useTransform(scrollYProgress, [1, 0], [0, 200]);
  const deplaceValue2 = useTransform(scrollYProgress, [1, 0], [0, 250]);
  const deplaceValue3 = useTransform(scrollYProgress, [1, 0], [0, 300]);

  const planesData = [
    {
      speed: 0.05,
      opacity: "opacity-30 brightness-70",
      x: useSpring(0, springConfig),
      y: useSpring(0, springConfig),
      deplaceValue: deplaceValue1,
      images: [
        { src: "1015/800/500", pos: "top-[12%] left-[10%] h-44" },
        { src: "1027/400/700", pos: "top-[15%] left-[85%] h-56" },
        { src: "1035/600/600", pos: "top-[60%] left-[58%] h-40" },
      ],
    },
    {
      speed: 0.1,
      opacity: "opacity-80 brightness-90",
      x: useSpring(0, springConfig),
      y: useSpring(0, springConfig),
      deplaceValue: deplaceValue2,
      images: [
        { src: "1043/500/800", pos: "top-[8%] left-[55%] h-52" },
        { src: "1052/900/500", pos: "top-[60%] left-[8%] h-44" },
        { src: "1069/600/600", pos: "top-[72%] left-[70%] h-36" },
      ],
    },
    {
      speed: 0.15,
      opacity: "opacity-100",
      x: useSpring(0, springConfig),
      y: useSpring(0, springConfig),
      deplaceValue: deplaceValue3,
      images: [
        { src: "1074/700/450", pos: "top-[18%] left-[20%] h-40" },
        { src: "1084/450/750", pos: "top-[55%] left-[80%] h-56" },
        { src: "109/550/550", pos: "top-[75%] left-[30%] h-38" },
      ],
    },
  ];

  // 2. Logic: Loop through the array to update all springs
  const manageMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const offsetX = clientX - innerWidth / 2;
    const offsetY = clientY - innerHeight / 2;

    planesData.forEach((plane) => {
      plane.x.set(offsetX * plane.speed);
      plane.y.set(offsetY * plane.speed);
    });
  };

  return (
    <>
      {showTop && (
        <>
          <div className="bg-dnm-dark-green mt-25 -mb-12 flex h-24 w-screen rounded-t-4xl border-2"></div>
          <div className="bg-dnm-light-green -mb-12 flex h-22 w-screen rounded-t-4xl border-2"></div>
        </>
      )}

      <div
        className={`${bgColor} relative h-screen w-screen ${showTop && "rounded-t-4xl border-t-2"} rounded-t-4xl`}
      >
        <motion.div
          className="sticky top-0 flex h-screen w-screen items-center justify-center overflow-hidden"
          onMouseMove={manageMouseMove}
          ref={container}
        >
          <div className="absolute flex flex-col items-center justify-center">
            <AnimatedText
              className={`text-step-8 stroke-red ${textColor} z-20 stroke-3 leading-[92%] font-black tracking-tight`}
              text={headingText}
              as="h1"
              delayChildren={0.6}
              onRender={true}
            />
            <AnimatedText
              className={`text-step-0 ${textColor} z-20 mx-auto -mt-4 text-center font-bold`}
              text={subHeadingText}
              as="p"
              delayChildren={0.8}
              staggerChildren={0.02}
              onRender={true}
            />
          </div>

          <span
            className={`text-step-7 ${textColor} absolute right-5 bottom-0 z-20 tracking-[-10.85876px]`}
          >
            (↓)
          </span>

          {/* 3. Rendering: Double map for Planes and Images */}
          {planesData.map((plane, index) => (
            <motion.div
              key={index}
              style={{ y: plane.deplaceValue }}
              className="absolute mt-[-30vh] h-screen w-screen"
            >
              <motion.div
                style={{ x: plane.x, y: plane.y }}
                className={`absolute h-screen w-screen ${plane.opacity} will-change-transform`}
              >
                {plane.images.map((img, imgIndex) => (
                  <img
                    key={imgIndex}
                    src={`https://picsum.photos/id/${img.src}`}
                    className={`absolute ${img.pos}`}
                    alt=""
                  />
                ))}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </>
  );
}

export default FloatingImageGallery;
