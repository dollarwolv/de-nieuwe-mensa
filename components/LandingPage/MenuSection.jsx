"use client";

import Button from "../General/Button";
import PillSwitch from "../General/PillSwitch";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

function MenuSection() {
  const [menu, setMenu] = useState(null);
  const [toggled, setToggled] = useState(false);

  const list = toggled ? menu?.thisWeeksMenu : menu?.nextWeeksMenu;

  const weekDays = ["MON", "TUE", "WED", "THU", "FRI"];

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

  useEffect(() => {
    const load = async () => {
      const res = await fetch("/api/menu");
      const data = await res.json();
      setMenu(data);
    };

    load();
  }, []);

  return (
    <div
      className="mt-36 flex w-full max-w-460 flex-col items-center py-12"
      id="menu"
    >
      <div className="mb-6 flex flex-col items-center gap-2 tracking-tight">
        <div className="relative">
          <Image
            src={"/biodiversiteit_op_je_bord_round.svg"}
            width={100}
            height={100}
            alt="Logo of Biodviersiteit op je bord"
            className="max-sm:bg-dnm-white absolute -top-14 -right-16 z-10 scale-70 rotate-24 rounded-full p-1 max-sm:opacity-90 max-sm:shadow md:-right-21 md:scale-75 lg:-right-24 lg:scale-100"
          />
          <h2 className="pointer-events-none text-6xl leading-[92%] font-extrabold lg:text-8xl">
            OUR MENU
          </h2>
        </div>
        <p className="-mt-2 text-center text-lg leading-tight lg:text-xl">
          All of our meals are{" "}
          <a
            className="text-dnm-light-green"
            href="https://www.biodiversiteitopjebord.nl/koplopers/ambassadeurs/de-nieuwe-mensa"
          >
            biodiversity certified
          </a>
          , 100% plant-based and made by students with ❤️
        </p>
      </div>

      <PillSwitch toggled={toggled} setToggled={setToggled} className="mb-2" />
      <AnimatePresence mode="wait">
        <motion.div
          key={`${toggled}-${list?.length ?? 0}`}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="scrollbar-hide flex w-screen grow-0 gap-8 overflow-x-scroll overflow-y-visible px-8 py-2 xl:justify-center"
        >
          {list?.map((item, i) => {
            console.log("list length:", list?.length, "menu:", menu);
            return (
              <motion.div
                className="bg-dnm-light-green/93 flex w-65 shrink-0 flex-col items-center gap-2 rounded-4xl border border-black px-8 py-4 shadow-[4px_4px_0px_0px_rgb(35,35,35)]"
                key={item.dish.name}
                variants={cardVariants}
              >
                <h4 className="text-4xl font-extrabold">{weekDays[i]}</h4>
                <div className="h-full w-full overflow-hidden rounded-2xl">
                  <img
                    src={item.dish.image.url}
                    alt={item.dish.image.alt}
                    className="h-full w-full object-cover"
                  />
                </div>

                <p className="my-auto max-w-[16ch] text-center text-xl font-semibold">
                  {item.dish.name}
                </p>

                <Button
                  className="bottom-2 py-2 text-xl font-extrabold"
                  navigate
                  navigateTo={`/dishes/${item.dish.slug}`}
                >
                  SEE DETAILS
                </Button>
              </motion.div>
            );
          })}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default MenuSection;
