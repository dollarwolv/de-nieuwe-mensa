"use client";

import { useState, useEffect } from "react";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import Button from "@/components/General/Button";
import { useTransitionRouter } from "next-view-transitions";
import Curtain from "@/components/General/Curtain";

function Vote() {
  const [menu, setMenu] = useState(null);
  const [selectedDish, setSelectedDish] = useState("");
  const [ratings, setRatings] = useState({
    tastiness: 5,
    fillingness: 5,
    healthiness: 5,
    valueForMoney: 5,
    satisfaction: 5,
  });
  const ratingCategories = [
    { id: "tastiness", label: "Tastiness" },
    { id: "fillingness", label: "Fillingness" },
    { id: "healthiness", label: "Healthiness" },
    { id: "valueForMoney", label: "Value for Money" },
    { id: "satisfaction", label: "Overall satisfaction" },
  ];

  const router = useTransitionRouter();

  const [remarks, setRemarks] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      const res = await fetch("/api/menu");
      const data = await res.json();
      setMenu(data);
      if (data && data.todaysDish == null) {
        setError(
          "Today's dish couldn't be loaded because we are not open today - please come back on Monday!",
        );
      }
      setSelectedDish(data.todaysDish);
    };

    load();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    const res = await fetch("/api/vote", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        dish: selectedDish.id,
        remarks,
        ...ratings,
      }),
    });

    const data = await res.json();

    if (!data.ok) {
      console.error(data.error);
      setError(error);
    } else if (data.updated) {
      router.push("/vote/vote-updated");
    } else {
      router.push("/vote/vote-success");
    }
  }

  const allDishes = [
    ...(menu?.thisWeeksMenu ?? []),
    ...(menu?.nextWeeksMenu ?? []),
  ];

  function findAndSetSelectedDish(dishName) {
    for (const dish of allDishes) {
      if (dish.dish.name === dishName) {
        setSelectedDish(dish.dish);
        return dish;
      }
    }
  }

  function handleRatingChange(categoryId, value) {
    setRatings((prev) => ({
      ...prev,
      [categoryId]: value[0],
    }));
  }

  return (
    <>
      <Curtain />
      <div className="mx-auto flex w-full max-w-460 flex-col items-center justify-center">
        <div>
          <h1 className="text-test-step-6 mt-12 text-center leading-[92%] font-extrabold tracking-tight">
            RATE OUR FOOD
          </h1>
          <p className="mt-2 text-center font-medium">
            We want to make better decisions about what to serve, and your input
            really helps. On this page, you can tell us what you think of
            today's food.
          </p>
          <p className="mt-2 text-center font-light">
            Note: You can vote once per day to keep things fair. Come back daily
            to vote on each dish.
          </p>
        </div>

        <div className="flex w-full flex-col items-center justify-center lg:flex-row lg:gap-16">
          <div className="bg-dnm-light-green flex max-w-120 flex-col items-center rounded-2xl p-6 shadow-[4px_4px_0px_0px_rgb(35,35,35)] max-lg:mt-12">
            <h2 className="text-4xl leading-[92%] font-bold tracking-tight">
              Today's dish:
            </h2>
            <p className="text-3xl">{selectedDish?.name}</p>
            <div className="aspect-4/5 h-72 overflow-hidden rounded-2xl">
              <img
                src={selectedDish?.image?.url}
                alt={selectedDish?.image?.alt}
                className="mt-3 h-full w-full rounded-2xl object-cover"
              />
            </div>
            <label className="mt-6 font-light" htmlFor="dish-select">
              Not correct? Select what you had:
            </label>
            <select
              name="dish-select"
              id="dish-select"
              className="bg-dnm-dark-green/50 h-full w-full rounded-2xl p-1 text-black/60"
              value={selectedDish?.name}
              onChange={(e) => findAndSetSelectedDish(e.target.value)}
            >
              {allDishes.map((dish) => {
                return (
                  <option key={dish.dish.name} value={dish.dish.name}>
                    {dish.dish.name}
                  </option>
                );
              })}
            </select>
          </div>

          <form
            className="mt-12 flex w-full max-w-160 flex-col gap-6"
            onSubmit={(e) => handleSubmit(e)}
          >
            {ratingCategories.map((category) => (
              <div key={category.id} className="flex w-full flex-col gap-2">
                <div className="flex items-center justify-between text-sm font-medium">
                  <label htmlFor={`rating-${category.id}`}>
                    {category.label}
                  </label>
                  <span className="text-base font-semibold">
                    {ratings[category.id]}
                  </span>
                </div>
                <Slider
                  id={`rating-${category.id}`}
                  value={[ratings[category.id]]}
                  min={1}
                  max={10}
                  step={1}
                  className={cn("w-full")}
                  onValueChange={(value) =>
                    handleRatingChange(category.id, value)
                  }
                />
                <input
                  type="hidden"
                  name={category.id}
                  value={ratings[category.id]}
                />
              </div>
            ))}
            <div className="flex flex-col text-sm font-medium">
              <label htmlFor="remarks">Remarks</label>
              <textarea
                type="text"
                name="remarks"
                value={remarks}
                onChange={(e) => {
                  setRemarks(e.target.value);
                }}
                className="bg-dnm-black rounded-lg px-3 py-2 text-white"
              />
            </div>

            {error && <p className="text-red-600">Error: {error}</p>}

            <Button type="submit" className="text-2xl font-bold">
              SUBMIT RATING
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Vote;
