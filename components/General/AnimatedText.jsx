"use client";

import { useInView } from "framer-motion";
import { useLayoutEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import SplitType from "split-type";

function AnimatedText({
  text,
  as: Tag = "h1",
  className = "",
  splitBy = "character",
  delayChildren = 0.8,
  staggerChildren = 0.03,
  onRender = false,
}) {
  const container = useRef();
  const isInView = useInView(container, { once: true });

  const measureRef = useRef();
  const [lines, setLines] = useState([]);
  const isLine = splitBy === "line";
  const ready = !isLine || lines.length > 0;

  const parentSpan = {
    hidden: {},
    show: {
      transition: {
        staggerChildren,
        delayChildren,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const childSpan = {
    hidden: {
      y: "1.2em",
    },
    show: {
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const splitters = {
    character: (t) => Array.from(t),
    word: (t) => t.split(" "),
  };

  const splitText = splitters[splitBy]?.(text) ?? [];

  useLayoutEffect(() => {
    if (splitBy !== "line") return;
    if (!measureRef.current) return;

    let split;

    const compute = () => {
      if (split) split.revert();

      split = new SplitType(measureRef.current, { types: "lines" });
      setLines(split.lines);
    };

    compute();

    const onResize = () => compute();
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      if (split) split.revert();
    };
  }, [text, splitBy]);

  return (
    <Tag className={`relative w-full ${className}`} ref={container}>
      {splitBy === "line" && (
        <span
          ref={measureRef}
          className="pointer-events-none absolute top-0 left-0 w-full opacity-0"
        >
          {text}
        </span>
      )}
      <motion.span
        key={isLine ? `lines-${lines.length}` : "chunks"}
        variants={parentSpan}
        initial="hidden"
        animate={
          !ready ? "hidden" : onRender ? "show" : isInView ? "show" : "hidden"
        }
        role="text"
        style={{ display: "inline-block" }}
        className="overflow-hidden text-nowrap"
      >
        {splitBy === "line"
          ? lines.map((line, i) => (
              <span className="block overflow-hidden" key={i}>
                <motion.span
                  variants={childSpan}
                  style={{
                    display: "block",
                    overflow: "hidden",
                    lineHeight: 1.1,
                  }}
                >
                  {line.textContent}
                </motion.span>
              </span>
            ))
          : splitText.map((chunk, i) => (
              <motion.span
                key={i}
                variants={childSpan}
                style={{
                  display: "inline-block",
                  whiteSpace: chunk === " " ? "pre" : "normal",
                }}
              >
                {chunk}
                {splitBy === "word" ? " " : null}
              </motion.span>
            ))}
      </motion.span>
    </Tag>
  );
}

export default AnimatedText;
