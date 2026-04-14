"use client";

const images = [
  {
    src: "/img/landing/values/bellpepper.png",
    pos: "md:top-[-2%] md:left-[-5%] left-[-8%]",
  },
  {
    src: "/img/landing/values/onion.png",
    pos: "top-[-4%] md:left-[28%] left-[40%]",
  },
  {
    src: "/img/landing/values/potato.png",
    pos: "md:top-[0%] md:left-[60%] left-[80%] top-[1%]",
  },
  {
    src: "/img/landing/values/onion.png",
    pos: "md:top-[-2%] left-[92%] top-[58%]",
  },
  {
    src: "/img/landing/values/onion.png",
    pos: "md:top-[35%] left-[-1%] top-[28%]",
  },
  {
    src: "/img/landing/values/potato.png",
    pos: "md:bottom-[4%] left-[-4%] max-md:top-[64%]",
  },
  {
    src: "/img/landing/values/bellpepper.png",
    pos: "bottom-[-6%] md:left-[29%] left-1/2",
  },
  {
    src: "/img/landing/values/onion.png",
    pos: "bottom-[-4%] md:left-[63%]",
  },
  {
    src: "/img/landing/values/bellpepper.png",
    pos: "bottom-[1%] left-[92%]",
  },
  {
    src: "/img/landing/values/onion.png",
    pos: "md:top-[35%] right-[-5%] top-[22%]",
  },
];

const text = [
  {
    heading: "VEGAN",
    text: "With an ever-looming climate crisis, De Nieuwe Mensa is steadfast in its mission to uphold sustainability. Therefore, we ensure that all our meals are 100% plant-based. Our ingredients are also sourced from local, ethical suppliers.",
    img: {
      src: "/img/landing/values/bellpepper.png",
    },
  },
  {
    heading: "CHEAP",
    text: "University canteens shouldn’t be a luxury, but at UvA, that seems to be the status quo. De Nieuwe Mensa challenges that by showing how filling meals are still possible at an accessible price point for all students.",
    img: {
      src: "/img/landing/values/potato.png",
    },
  },
  {
    heading: "TASTY",
    text: "We never compromise on quality. Our menu has been lovingly cooked and curated by students passionate about the culinary arts, and we’re always looking forward to brightening your day with a warm, hearty dish!",
    img: {
      src: "/img/landing/values/onion.png",
    },
  },
];

function ValuesSection() {
  return (
    <div className="relative w-screen md:mt-24 md:h-screen">
      {images.map((img, index) => (
        <img
          src={img.src}
          className={`${img.pos} absolute z-0 h-32 object-contain md:h-44 xl:h-48`}
          key={index}
        />
      ))}
      <div className="flex h-full w-full">
        <div className="z-10 m-auto flex h-fit w-fit flex-col gap-4 max-md:mt-24">
          <h1 className="mx-auto text-6xl leading-[92%] font-extrabold tracking-tighter lg:text-8xl">
            OUR VALUES
          </h1>
          <div className="flex flex-col gap-4 md:flex-row">
            {text.map((item, index) => (
              <div
                className="bg-dnm-white mx-auto flex h-fit flex-col items-center justify-center gap-1 rounded-2xl border-2 border-black p-4 shadow"
                key={index}
              >
                <img src={item.img.src} alt="" className="h-32" />
                <h2 className="md:text-step-1 text-4xl font-bold">
                  {item.heading}
                </h2>
                <p className="max-w-[28ch] md:max-w-[24ch]">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ValuesSection;
