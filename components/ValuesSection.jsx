import { useScroll, motion, useTransform, easeInOut } from "framer-motion";
import { useEffect, useRef } from "react";
import Image from "next/image";
import { cubicBezier } from "framer-motion";

function ValuesSection() {
  const values = [
    {
      heading: "Democratic",
      subheading:
        "We want a canteen that allows students to decide what they want to eat ",
      svg: "M195.767,66.465c-0.761-1.838-2.221-3.298-4.059-4.059L63.483,9.295c-3.824-1.583-8.214,0.232-9.799,4.059L0.571,141.58 c-0.762,1.838-0.762,3.902,0,5.74c0.761,1.838,2.221,3.298,4.059,4.059l86.104,35.665c0.919,0.38,1.895,0.571,2.87,0.571 c0.976,0,1.951-0.19,2.87-0.571l59.566-24.676c1.838-0.761,3.298-2.221,4.059-4.059l35.667-86.105 C196.528,70.368,196.528,68.303,195.767,66.465z M107.464,166.256l7.647-18.463l18.462,7.647L107.464,166.256z M149.112,145.639 l-35.19-14.575c-3.823-1.583-8.214,0.232-9.799,4.059l-14.577,35.193l-72.248-29.925L64.672,26.023l114.367,47.371L149.112,145.639 z",
      bgColor: "bg-dnm-light-green",
    },
    {
      heading: "Affordable",
      subheading:
        "The canteen should operate to feed students, not for profit.",
      svg: "M195.767,66.465c-0.761-1.838-2.221-3.298-4.059-4.059L63.483,9.295c-3.824-1.583-8.214,0.232-9.799,4.059L0.571,141.58 c-0.762,1.838-0.762,3.902,0,5.74c0.761,1.838,2.221,3.298,4.059,4.059l86.104,35.665c0.919,0.38,1.895,0.571,2.87,0.571 c0.976,0,1.951-0.19,2.87-0.571l59.566-24.676c1.838-0.761,3.298-2.221,4.059-4.059l35.667-86.105 C196.528,70.368,196.528,68.303,195.767,66.465z M107.464,166.256l7.647-18.463l18.462,7.647L107.464,166.256z M149.112,145.639 l-35.19-14.575c-3.823-1.583-8.214,0.232-9.799,4.059l-14.577,35.193l-72.248-29.925L64.672,26.023l114.367,47.371L149.112,145.639 z",
      bgColor: "bg-dnm-light-green",
    },
    {
      heading: "Transparent",
      subheading:
        "Every student should be able to see how the canteen functions.",
      svg: "M195.767,66.465c-0.761-1.838-2.221-3.298-4.059-4.059L63.483,9.295c-3.824-1.583-8.214,0.232-9.799,4.059L0.571,141.58 c-0.762,1.838-0.762,3.902,0,5.74c0.761,1.838,2.221,3.298,4.059,4.059l86.104,35.665c0.919,0.38,1.895,0.571,2.87,0.571 c0.976,0,1.951-0.19,2.87-0.571l59.566-24.676c1.838-0.761,3.298-2.221,4.059-4.059l35.667-86.105 C196.528,70.368,196.528,68.303,195.767,66.465z M107.464,166.256l7.647-18.463l18.462,7.647L107.464,166.256z M149.112,145.639 l-35.19-14.575c-3.823-1.583-8.214,0.232-9.799,4.059l-14.577,35.193l-72.248-29.925L64.672,26.023l114.367,47.371L149.112,145.639 z",
      bgColor: "bg-dnm-light-green",
    },
    {
      heading: "Healthy",
      subheading:
        "The canteen should operate to feed students, not for profit.",
      svg: "M195.767,66.465c-0.761-1.838-2.221-3.298-4.059-4.059L63.483,9.295c-3.824-1.583-8.214,0.232-9.799,4.059L0.571,141.58 c-0.762,1.838-0.762,3.902,0,5.74c0.761,1.838,2.221,3.298,4.059,4.059l86.104,35.665c0.919,0.38,1.895,0.571,2.87,0.571 c0.976,0,1.951-0.19,2.87-0.571l59.566-24.676c1.838-0.761,3.298-2.221,4.059-4.059l35.667-86.105 C196.528,70.368,196.528,68.303,195.767,66.465z M107.464,166.256l7.647-18.463l18.462,7.647L107.464,166.256z M149.112,145.639 l-35.19-14.575c-3.823-1.583-8.214,0.232-9.799,4.059l-14.577,35.193l-72.248-29.925L64.672,26.023l114.367,47.371L149.112,145.639 z",
      bgColor: "bg-dnm-light-green",
    },
  ];

  const container = useRef();

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  return (
    <div className="relative h-[400vh]" ref={container}>
      {/* This sticky section causes everything to break on mobile */}
      <div className="sticky top-0 flex h-[90vh] w-full flex-col">
        <div className="flex flex-row items-center justify-between border-t-2 pt-6">
          <h2 className="text-step-4 leading-[92%] font-semibold tracking-tight">
            Our values
          </h2>
          <span className="text-step-0 max-w-[24ch] leading-[92%] tracking-tight">
            These are the principles by which De Nieuwe Mensa runs.
          </span>
        </div>

        <div className="mt-auto flex flex-row gap-6">
          {values.map((value, i) => {
            const firstValue = 0.25 * i;
            const secondValue = 0.25 * (i + 1);
            const yValue = useTransform(
              scrollYProgress,
              [firstValue, secondValue],
              [400, 0],
              { ease: easeInOut },
            );
            return (
              <motion.div
                className={`${value.bgColor} flex h-[48vh] flex-col gap-4 rounded-3xl border border-black p-8 text-white shadow-[4px_4px_0px_0px_rgb(35,35,35)]`}
                key={i}
                style={{ y: yValue }}
              >
                <h4 className="text-step-1 leading-[92%] font-semibold tracking-tight">
                  {value.heading}
                </h4>
                <p className="text-step--1 max-w-[24ch] leading-[92%] tracking-tight">
                  {value.subheading}
                </p>
                <svg
                  fill="#FFFFFF"
                  height="150px"
                  width="150px"
                  version="1.1"
                  id="Capa_1"
                  viewBox="0 0 196.338 196.338"
                  className="mt-auto self-end"
                >
                  <g>
                    <path d={value.svg} />
                    <polygon points="133.374,98.043 127.632,84.186 89.229,100.098 82.708,84.358 68.851,90.098 81.111,119.697 	" />
                  </g>
                </svg>
                {/* <Image
                  src="vote-svgrepo-com.svg"
                  width="150"
                  height="150"
                  alt="Picture of a ballot"
                  className="mt-auto self-end"
                ></Image> */}
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default ValuesSection;
