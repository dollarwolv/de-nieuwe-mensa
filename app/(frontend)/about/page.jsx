import ClickThroughStory from "@/components/AboutPage/ClickThroughStory";
import OurTeamServer from "@/components/AboutPage/OurTeam.server";
import Curtain from "@/components/General/Curtain";
import Button from "@/components/General/Button";
import BentoGrid from "@/components/BentoGrid";

const suppliers = [
  {
    heading: "VEGETABLES",
    text: "Our vegetables are supplied by Orgenional - a local vegetable supply company sourcing ingredients exclusively from the Netherlands. ",
  },
  {
    heading: "SPICES",
    text: "A random indian store..? Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent dictum faucibus augue, ut lacinia neque.",
  },
  {
    heading: "ITALIAN STUFF?",
    text: "Matteo’s buddy? Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent dictum faucibus augue, ut lacinia neque. ",
  },
  {
    heading: "SOMETHING ELSE?",
    text: "Appie for the win? Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent dictum faucibus augue, ut lacinia neque. ",
  },
];

function About() {
  return (
    <>
      <Curtain />
      <div className="flex w-full flex-col items-center">
        <div className="mt-12 flex w-full max-w-460 flex-col gap-y-4 md:grid md:aspect-93/27 md:grid-cols-24 md:grid-rows-4">
          <h1 className="lg:text-test-step-7 md:text-mobile-step-8 col-start-1 row-start-1 row-end-2 text-8xl leading-[92%] font-extrabold lg:col-end-12">
            ABOUT
          </h1>
          <h1 className="lg:text-test-step-7 md:text-mobile-step-8 col-start-1 row-start-2 row-end-3 text-8xl leading-[92%] font-extrabold max-md:-mt-4 lg:col-end-7">
            DNM
          </h1>
          <div className="col-start-10 col-end-25 row-start-3 row-end-5 max-md:mt-4 lg:col-start-7 lg:col-end-19 lg:row-start-2 lg:px-8">
            <img
              src="https://picsum.photos/570/381"
              alt=""
              className="h-full w-full rounded-2xl object-cover lg:max-xl:rounded-[48px] lg:max-lg:rounded-4xl xl:rounded-[80px] 2xl:mt-4"
            />
          </div>

          <div className="order-5 col-end-25 row-start-2 flex-col max-md:mt-12 md:order-0 md:col-start-11 md:row-end-3 lg:col-start-19 lg:row-end-5 lg:flex">
            <div className="md:max-lg:hidden">
              <img
                src="https://picsum.photos/422/170"
                alt=""
                className="h-full w-full rounded-4xl object-cover md:max-lg:hidden lg:rounded-[44px]"
              />
            </div>

            <div className="mt-4 flex h-full flex-col gap-2 font-medium lg:mt-8">
              <h2 className="text-test-step-1 leading-[92%] font-extrabold max-md:text-3xl">
                Our Philosophy
              </h2>

              <p className="text-test-step--2 max-md:text-base lg:mt-auto">
                We believe that food is a basic human right that every student
                should have access to. That’s why we operate as a non-profit.
              </p>
            </div>
          </div>

          <div className="lg:text-test-step--2 text-mobile-step--1 col-start-1 col-end-9 row-start-3 row-end-5 flex flex-col font-medium lg:col-end-7">
            <h3 className="leading-[92%] font-semibold max-md:text-3xl max-md:font-extrabold md:my-auto">
              A new canteen for everyone
            </h3>
            <p className="max-md:mt-2 max-md:text-base">
              We started De Nieuwe Mensa with a clear goal: Provide affordable,
              healthy, and sustainable food for every student at the University
              of Amsterdam.
            </p>
          </div>
        </div>

        <ClickThroughStory />

        <div className="mt-32 flex flex-col gap-18 px-4 lg:flex-row">
          <div className="flex h-full flex-1 flex-col gap-4">
            <h2 className="text-test-step-3 leading-[92%] font-extrabold tracking-tight lg:max-w-[15ch]">
              A NEW CANTEEN - FOR STUDENTS, NOT PROFIT
            </h2>
            <div className="w-full flex-1 lg:hidden">
              <div className="relative h-full w-full overflow-hidden rounded-2xl">
                <img
                  src="https://picsum.photos/1920/1080"
                  alt=""
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
            <p className="font-medium max-lg:text-base lg:text-base">
              We believe that food is a human right, and that it should be
              accessible to everyone. Sadly, the Netherlands are expensive, and
              for-profit businesses (such as the other canteen stalls) end up
              charging prices that are unsustainable for most students.
            </p>
            <p className="font-medium max-lg:text-base lg:text-base">
              To combat this situation, we run as a non-profit, charging as
              little as we possibly can while ensuring high-quality food and
              fair wages for our cooks.
            </p>
            <Button
              navigate={true}
              navigateTo={"/transparency"}
              className="w-fit text-2xl font-extrabold"
            >
              SEE FULL FINANCIAL OVERVIEW
            </Button>
          </div>
          <div className="hidden w-full flex-1 lg:block">
            <div className="relative h-full w-full overflow-hidden rounded-2xl">
              <img
                src="https://picsum.photos/1920/1080"
                alt=""
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>

        <div className="mt-32 flex flex-col justify-between gap-8 px-4 lg:flex-row lg:gap-18">
          <div className="flex flex-1 flex-col gap-4">
            <h2 className="text-test-step-3 leading-[92%] font-extrabold tracking-tight">
              OUR PLEDGE TO SUSTAINABILITY
            </h2>
            <p className="font-medium max-lg:text-base lg:text-lg">
              We work exclusively with local suppliers to provide our
              ingredients, ensuring that the food we make is as sustainable as
              it can be.
            </p>
            <div className="w-full">
              <div className="relative h-full w-full overflow-hidden rounded-2xl">
                <img
                  src="https://picsum.photos/1920/1080"
                  alt=""
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-1 flex-row gap-8">
            <div className="flex flex-col justify-between max-lg:gap-4">
              {suppliers.map((item) => {
                return (
                  <div key={item.text}>
                    <h3 className="text-test-step-2 font-extrabold tracking-tight">
                      {item.heading}
                    </h3>
                    <p className="">{item.text}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <BentoGrid
          className="mt-24 px-4 lg:pr-20 lg:pl-8"
          heading={"A PLANT-BASED CANTEEN"}
          subheading={
            "De Nieuwe Mensa only sells plant-based meals, which has several benefits for our cause."
          }
          boxes={[
            {
              title: "Sustainable",
              text: "Meat consumes more water and has a larger carbon footprint than plants.",
            },
            {
              title: "Accessible",
              text: "Plant-based meals are also accessible to students that don’t eat meat.",
            },
            {
              title: "Affordable",
              text: "Plant-based meals are often cheaper than those containing meat.",
            },
            {
              title: "Ethical",
              text: "Plant-based meals reflect considerations around animal welfare.",
            },
          ]}
        />

        <OurTeamServer />
      </div>
    </>
  );
}

export default About;
