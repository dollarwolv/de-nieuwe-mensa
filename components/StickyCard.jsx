import "./StickyCards.css";
import { useScroll, useTransform, motion } from "framer-motion";
import { useEffect, useRef } from "react";

function StickyCard({ data }) {
  const ref = useRef();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const opacityValue = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const scaleValue = useTransform(scrollYProgress, [0, 1], [1, 0.9]);
  const rotationValue = useTransform(scrollYProgress, [0, 1], [0, 2]);

  useEffect(() => {
    scrollYProgress.on("change", (e) => {
      console.log(e);
    });
  }, []);

  return (
    <div
      className={`relative ${data.index !== "03" ? "h-[200vh]" : "h-full"} w-full`}
      ref={ref}
      style={{ marginTop: data.index === "01" ? "0" : "-100vh" }}
    >
      <motion.div
        className={`${data.bgColor} sticky-card sticky top-0 flex h-screen w-screen flex-col rounded-t-[80px] px-6 pt-12 text-white lg:flex-row`}
        style={{
          "--after-opacity": data.index !== "03" ? opacityValue : "",
          scale: data.index !== "03" ? scaleValue : "",
          rotate: data.index !== "03" ? rotationValue : "",
        }}
      >
        <div className="flex flex-1 lg:flex-2">
          <h1 className="lg:text-step-7 text-8xl leading-[92%] font-bold tracking-tight">
            {data.index}
          </h1>
        </div>
        <div className="flex flex-4 flex-col items-start gap-6 pt-12">
          <h1 className="text-step-7 leading-[92%] font-bold tracking-tight md:w-[75%]">
            {data.title}
          </h1>
          <img
            src="https://picsum.photos/1920/1080"
            alt="placeholder image"
            className="aspect-5/3 md:w-[75%]"
          />
          <div className="lg:text-step--1 flex flex-col gap-2 md:w-[75%] md:flex-row md:gap-6">
            <h2 className="flex-3 font-semibold uppercase">{`(About the ${data.title})`}</h2>
            <p className="flex-4"> {data.description}</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default StickyCard;
