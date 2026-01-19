import { RichText } from "@payloadcms/richtext-lexical/react";

import config from "@payload-config";
import { getPayload } from "payload";

import Curtain from "@/components/General/Curtain";

async function getDish(slug) {
  try {
    const payload = await getPayload({ config });
    const { docs } = await payload.find({
      collection: "dishes",
      depth: 2,
      limit: 1,
      where: {
        slug: {
          equals: slug,
        },
      },
    });

    return { dish: docs?.[0] || null, error: null };
  } catch (error) {
    console.error("Failed to load dish:", error);
    return { dish: null, error };
  }
}

function formatNutritionValue(value, unit) {
  if (value === null || value === undefined || value === "") {
    return "—";
  }

  if (typeof value === "number") {
    return unit ? `${value} ${unit}` : `${value}`;
  }

  return unit ? `${value} ${unit}` : `${value}`;
}

export default async function DishPage({ params }) {
  const { dish, error } = await getDish(params?.slug);

  if (error || !dish) {
    return (
      <div className="flex w-full flex-col items-center">
        <div className="mt-12 w-full max-w-460">
          <h1 className="text-5xl leading-[100%] font-extrabold">DISHES</h1>
          <p className="text-test-step--1 mt-6 max-w-[50ch]">
            We couldn&apos;t find that dish. Please check the URL and try again.
          </p>
        </div>
      </div>
    );
  }

  const dishImage = dish?.image?.url;
  const dishAlt = dish?.image?.alt || dish?.name || "Dish image";
  const nutrition = [
    { label: "Calories", value: dish?.nutrition?.calories, unit: "kcal" },
    { label: "Protein", value: dish?.nutrition?.protein, unit: "g" },
    { label: "Carbs", value: dish?.nutrition?.carbs, unit: "g" },
    { label: "Fat", value: dish?.nutrition?.fat, unit: "g" },
  ];
  const hasNutrition = nutrition.some(
    (item) =>
      item.value !== null && item.value !== undefined && item.value !== "",
  );
  const ingredients = (dish?.ingredients || []).filter(
    (item) => item?.amount || item?.item,
  );

  return (
    <>
      <Curtain />
      <div className="flex w-full flex-col items-center">
        <section className="mt-12 w-full max-w-460">
          <div className="grid gap-8 lg:grid-cols-24 lg:items-start">
            <div className="lg:col-start-1 lg:col-end-13">
              {dishImage ? (
                <img
                  src={dishImage}
                  alt={dishAlt}
                  className="aspect-5/3 w-full rounded-4xl object-cover"
                />
              ) : (
                <div className="bg-dnm-black/5 text-dnm-gray flex aspect-4/3 w-full items-center justify-center rounded-4xl text-sm font-semibold">
                  No dish image
                </div>
              )}
            </div>

            <div className="flex flex-col gap-5 lg:col-start-13 lg:col-end-25">
              <span className="text-dnm-gray text-xs font-semibold tracking-[0.35em] uppercase">
                Dish
              </span>
              <h1 className="text-test-step-4 leading-[96%] font-extrabold tracking-tight">
                {dish?.name}
              </h1>
              {dish?.description ? (
                <p className="text-test-step--1 leading-[140%] font-medium">
                  {dish.description}
                </p>
              ) : (
                <p className="text-dnm-gray text-test-step--1 leading-[140%]">
                  A description for this dish is on the way.
                </p>
              )}

              <div className="border-dnm-black/10 rounded-3xl border bg-white p-5">
                <h2 className="text-dnm-gray text-xs font-semibold tracking-[0.2em] uppercase">
                  Nutrition
                </h2>
                {hasNutrition ? (
                  <dl className="mt-4 grid grid-cols-2 gap-x-6 gap-y-3 text-sm font-semibold">
                    {nutrition.map((item) => (
                      <div
                        key={item.label}
                        className="border-dnm-black/10 flex items-center justify-between border-b pb-2"
                      >
                        <dt className="text-dnm-gray">{item.label}</dt>
                        <dd className="text-dnm-black">
                          {formatNutritionValue(item.value, item.unit)}
                        </dd>
                      </div>
                    ))}
                  </dl>
                ) : (
                  <p className="text-dnm-gray mt-3 text-sm">
                    Nutrition info coming soon.
                  </p>
                )}
              </div>
            </div>
          </div>
        </section>

        <section className="mt-12 w-full max-w-460">
          <div className="border-dnm-black/10 bg-dnm-black/5 rounded-4xl border p-6 md:p-8">
            <h2 className="text-test-step-1 leading-[100%] font-extrabold">
              Ingredients
            </h2>
            {ingredients.length ? (
              <ul className="mt-6 grid gap-3 text-lg font-medium md:grid-cols-2">
                {ingredients.map((ingredient, index) => {
                  const label = [ingredient?.amount, ingredient?.item]
                    .filter(Boolean)
                    .join(" ");

                  return (
                    <li
                      key={`${ingredient?.item || "ingredient"}-${index}`}
                      className="border-dnm-black/10 rounded-2xl border bg-white px-4 py-3"
                    >
                      {label}
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p className="text-dnm-gray mt-4 text-lg">
                Ingredient details are coming soon.
              </p>
            )}
          </div>
        </section>

        <section className="mt-12 w-full max-w-460">
          <h2 className="text-test-step-1 leading-[100%] font-extrabold">
            Recipe
          </h2>
          <div className="mt-6">
            {dish?.recipe ? (
              <RichText
                data={dish.recipe}
                className="text-dnm-black text-lg leading-[170%] [&_h2]:mt-10 [&_h2]:mb-4 [&_h2]:text-3xl [&_h2]:font-extrabold [&_h3]:mt-8 [&_h3]:mb-3 [&_h3]:text-2xl [&_h3]:font-extrabold [&_li]:mb-2 [&_ol]:mb-6 [&_p]:mb-6 [&_ul]:mb-6"
              />
            ) : (
              <p className="text-dnm-gray text-lg">
                This recipe isn&apos;t available yet.
              </p>
            )}
          </div>
        </section>
      </div>
    </>
  );
}
