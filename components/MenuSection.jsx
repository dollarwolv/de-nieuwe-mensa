import Button from "./Button";
import PillSwitch from "./PillSwitch";
import { useState } from "react";
import ScrollText from "./ScrollText";
import { motion, AnimatePresence } from "framer-motion";

function MenuSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05, // This creates the "waterfall" effect
      },
    },
    exit: {
      opacity: 0,
      transition: { staggerChildren: 0.05, staggerDirection: -1 }, // Reverse stagger on exit
    },
  };

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
    exit: { y: -20, opacity: 0 },
  };

  const [toggled, setToggled] = useState(false);
  const foodItems = [
    {
      week: "week1",
      day: "MON",
      name: "Black Bean Stew",
    },
    {
      week: "week1",
      day: "TUE",
      name: "Black Been Stew",
    },
    {
      week: "week1",
      day: "WED",
      name: "Chana Masala",
    },
    {
      week: "week1",
      day: "THU",
      name: "Lentil Daal",
    },
    {
      week: "week1",
      day: "FRI",
      name: "Hamburger",
    },
    {
      week: "week2",
      day: "MON",
      name: "Creamy Vegan Pasta",
    },
    {
      week: "week2",
      day: "TUE",
      name: "Lentil Pasta",
    },
    {
      week: "week2",
      day: "WED",
      name: "Squash Pasta",
    },
    {
      week: "week2",
      day: "THU",
      name: "Spaghetti Aglio e Olio",
    },
    {
      week: "week2",
      day: "FRI",
      name: "Vegan Tacos",
    },
  ];
  return (
    <div className="mt-36 flex w-full flex-col items-center py-12">
      <div className="mb-6 flex flex-col items-center gap-2 tracking-tight">
        <h2 className="text-6xl leading-[92%] font-extrabold lg:text-8xl">
          OUR MENU
        </h2>
        <span className="text-center text-xl leading-[92%]">
          All of our meals 100% plant-based and made by students with ❤️
        </span>
      </div>

      <PillSwitch toggled={toggled} setToggled={setToggled} className="mb-2" />
      <AnimatePresence mode="wait">
        <motion.div
          key={toggled} // This key changing tells AnimatePresence to swap the whole group
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="scrollbar-hide flex w-screen grow-0 gap-8 overflow-x-scroll overflow-y-visible px-8 py-2"
        >
          {foodItems
            .filter((item) =>
              toggled ? item.week == "week1" : item.week == "week2",
            )
            .map((item, i) => {
              return (
                <motion.div
                  className="bg-dnm-light-green/93 flex w-65 shrink-0 flex-col items-center gap-2 rounded-4xl border border-black px-8 py-4 shadow-[4px_4px_0px_0px_rgb(35,35,35)]"
                  key={item.name}
                  variants={cardVariants}
                >
                  <h4 className="text-4xl font-extrabold">{item.day}</h4>
                  <img
                    src="https://picsum.photos/210/270"
                    alt=""
                    className="rounded-2xl"
                  />
                  <p className="my-auto max-w-[16ch] text-center text-xl font-semibold">
                    {item.name}
                  </p>

                  <Button className="bottom-2 py-2 text-xl font-extrabold">
                    SEE DETAILS
                  </Button>
                </motion.div>
              );
            })}
        </motion.div>
      </AnimatePresence>

      {/* <div className="mt-12"></div>
      <ScrollText /> */}
    </div>
  );
}

export default MenuSection;
