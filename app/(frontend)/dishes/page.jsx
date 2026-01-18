import config from "@payload-config";
import { getPayload } from "payload";

import DishCard from "@/components/Dishes/DishCard";

const DISH_LIMIT = 50;

async function getDishes() {
  try {
    const payload = await getPayload({ config });
    const { docs } = await payload.find({
      collection: "dishes",
      depth: 1,
      limit: DISH_LIMIT,
      sort: "-createdAt",
    });

    return { dishes: docs, error: null };
  } catch (error) {
    console.error("Failed to load dishes:", error);
    return { dishes: [], error };
  }
}

export default async function DishesPage() {
  const { dishes, error } = await getDishes();

  if (error) {
    return (
      <div className="flex w-full flex-col items-center">
        <div className="mt-12 w-full max-w-460">
          <h1 className="md:text-step-7 text-7xl leading-[92%] font-extrabold tracking-tighter">
            DISHES
          </h1>
          <p className="text-test-step--1 mt-6 max-w-[50ch]">
            We hit a snag loading the dishes. Please check back soon.
          </p>
        </div>
      </div>
    );
  }

  if (!dishes?.length) {
    return (
      <div className="flex w-full flex-col items-center">
        <div className="mt-12 w-full max-w-460">
          <h1 className="md:text-step-7 text-6xl leading-[92%] font-extrabold tracking-tighter">
            DISHES
          </h1>
          <p className="text-test-step--1 mt-6 max-w-[50ch]">
            No dishes yet. Check back soon for fresh ideas from the kitchen.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col items-center">
      <section className="mt-12 w-full max-w-460">
        <div className="border-dnm-black/10 bg-dnm-light-green/10 flex flex-col gap-6 rounded-4xl border px-6 py-8 md:grid md:grid-cols-24 md:items-center md:px-8">
          <div className="col-start-1 col-end-13">
            <span className="text-dnm-gray text-xs font-semibold tracking-[0.35em] uppercase">
              DNM Kitchen
            </span>
            <h1 className="md:text-step-7 text-7xl leading-[92%] font-extrabold tracking-tight">
              DISHES
            </h1>
            <div className="mt-4 flex flex-wrap gap-2 text-sm font-semibold">
              <span className="border-dnm-black/10 rounded-full border px-3 py-1">
                {dishes.length} dishes
              </span>
              <span className="border-dnm-black/10 rounded-full border px-3 py-1">
                Updated from the kitchen
              </span>
            </div>
          </div>
          <p className="text-test-step--1 col-start-13 col-end-25 max-w-[45ch] font-medium">
            A rotating collection of comforting, plant-based meals. Every dish
            is designed to be nourishing, affordable, and cooked for the
            community.
          </p>
        </div>
      </section>

      <section className="mt-12 w-full max-w-460">
        <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <h2 className="text-test-step-1 leading-[100%] font-extrabold">
            All dishes
          </h2>
          <p className="text-dnm-gray text-sm font-semibold">
            Click a dish to see ingredients and instructions.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {dishes.map((dish) => (
            <DishCard key={dish.id} dish={dish} />
          ))}
        </div>
      </section>
    </div>
  );
}
