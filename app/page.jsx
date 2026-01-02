import Image from "next/image";
import Button from "@/components/Button";

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      {/* Hero section */}
      <div className="mt-12 flex max-w-460 flex-col justify-center gap-8 px-2 md:mt-32 md:grid md:grid-cols-24 md:items-center md:gap-0">
        <div className="relative aspect-square w-full md:col-start-17 md:col-end-25 md:row-start-1 md:-mt-5 md:-mb-5 md:ml-auto">
          <Image
            src="/daal.png"
            className="object-cover"
            alt="Daal at de nieuwe mensa"
            fill
          />
        </div>
        <div className="flex flex-col gap-2 md:col-start-1 md:col-end-16 md:gap-4 lg:gap-8">
          <div className="flex flex-col">
            <span className="md:text-step-5 text-4xl leading-[92%] font-extrabold tracking-tight">
              REAL FOOD.
            </span>
            <span className="md:text-step-5 text-4xl leading-[92%] font-extrabold tracking-tight">
              STUDENT PRICED.
            </span>
            <span className="md:text-step-5 text-4xl leading-[92%] font-extrabold tracking-tight">
              NO COMPROMISE.
            </span>
          </div>
          <span className="text-step-0 leading-[92%] font-medium tracking-tight">
            Student-led. Non-profit. Taking back the canteen with healthy, vegan
            meals.
          </span>
          <Button className="md:text-step-1 w-fit font-extrabold">
            SEE THIS WEEK'S MENU
          </Button>
        </div>
      </div>
    </div>
  );
}
