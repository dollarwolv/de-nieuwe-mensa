import Link from "next/link";

function DishCard({ dish }) {
  const dishImage = dish?.image?.url;
  const dishAlt = dish?.image?.alt || dish?.name || "Dish image";

  return (
    <Link
      href={`/dishes/${dish?.slug}`}
      className="group border-dnm-black/10 focus-visible:outline-dnm-black/40 flex h-full flex-col gap-4 rounded-3xl border bg-white p-5 transition-transform duration-200 hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-offset-2"
    >
      {dishImage ? (
        <img
          src={dishImage}
          alt={dishAlt}
          className="aspect-4/3 w-full rounded-2xl object-cover"
        />
      ) : (
        <div className="bg-dnm-black/5 text-dnm-gray flex aspect-4/3 w-full items-center justify-center rounded-2xl text-sm font-semibold">
          No dish image
        </div>
      )}

      <div className="flex flex-col gap-2">
        <span className="text-dnm-gray text-xs font-semibold tracking-[0.2em] uppercase">
          Dish
        </span>
        <h3 className="text-2xl leading-[100%] font-extrabold tracking-tight">
          {dish?.name}
        </h3>
        {dish?.description && (
          <p className="line-clamp-3 text-lg leading-[120%] font-medium">
            {dish.description}
          </p>
        )}
      </div>
    </Link>
  );
}

export default DishCard;
