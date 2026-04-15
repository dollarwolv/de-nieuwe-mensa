import ClickThroughStory from "@/components/AboutPage/ClickThroughStory";
import OurTeamServer from "@/components/AboutPage/OurTeam.server";
import Curtain from "@/components/General/Curtain";
import Button from "@/components/General/Button";
import BentoGrid from "@/components/BentoGrid";
import AnimatedText from "@/components/General/AnimatedText";
import Image from "next/image";

const suppliers = [
  {
    heading: "OREGIONAL",
    text: `Oregional is a Dutch supplier for fresh regional produce, offered at a fair price. What makes them special is their effort to reduce food waste by offering second-rate ("ugly") produce.`,
  },
  {
    heading: "AUTHENTIC INDIA",
    text: "Authentic India is a cozy grocery store near the Dappermarkt. They supply us with nearly all of the spices and condiments that make our food as delicious as it is.",
  },
  {
    heading: "BD-TOTAAL",
    text: "BD-Totaal is an organic food supplier that focuses on providing sustainable, environmentally aware, and biodiversity friendly food options. We primarily use BD-Totaal for rice, some of our vegetables and tomatoes to ensure that our food is biodiverse and organic for your health and peace of mind.",
  },
  {
    heading: "JOYBUY",
    text: "Joybuy is an online retailer specializing primarily in pan-Asian ingredients that we use across our lineup of dishes, particularly our fan-favorite Japanese curry.",
  },
];

const partners = [
  {
    heading: "KRITERION",
    text: `De Nieuwe Mensa is supported by the Kriterion foundation, who pays board grants to the volunteers organizing DNM as a compensation for the work they put in. Doing so, Kriterion supports our mission to make DNM a long-lasting and influential project. Furthermore, they offer help and guidance with legal questions.`,
  },
  {
    heading: "BIODIVERSITEIT OP JE BORD",
    text: `We joined the "Biodiversiteit op je bord" program as ambassadors in October 2025. The Dutch Cuise initiative, supported by the Dutch Ministry of Agriculture and the WWF, promotes more biodiversity in food systems. As ambassadors, we ensure that at least 50% of our menu meets their standards. In practice, this means our meals exclude red-listed ingredients and always include at least one biodiverse main ingredient.`,
  },
  {
    heading: "AMSTERDAM UNIVERSITY FUND",
    text: "De Nieuwe Mensa received a 5000€ grant from the Amsterdam University Fund. With their support, we can continue to expand our impact, strengthen our student community and ensure that De Nieuwe Mensa remains a sustainable and inspiring part of campus life at the UvA.",
  },
];

function About() {
  return (
    <>
      <Curtain />
      <div className="flex w-full flex-col items-center">
        <div className="mt-12 flex w-full max-w-460 flex-col gap-y-4 md:grid md:aspect-93/27 md:grid-cols-24 md:grid-rows-4">
          <AnimatedText
            as="h1"
            text={"ABOUT"}
            splitBy="character"
            delayChildren={0.7}
            onRender={true}
            className="lg:text-test-step-7 md:text-mobile-step-8 col-start-1 row-start-1 row-end-2 text-8xl leading-[92%] font-black lg:col-end-12"
          />

          <AnimatedText
            as="h1"
            delayChildren={0.8}
            onRender={true}
            text={"DNM"}
            splitBy="character"
            className="lg:text-test-step-7 md:text-mobile-step-8 col-start-1 row-start-2 row-end-3 text-8xl leading-[92%] font-black max-md:-mt-4 lg:col-end-7"
          />

          <div className="col-start-10 col-end-25 row-start-3 row-end-5 max-md:mt-4 lg:col-start-7 lg:col-end-19 lg:row-start-2 lg:px-8">
            <img
              src="/img/about/kitchen.jpeg"
              alt=""
              className="h-full w-full rounded-2xl object-cover lg:max-xl:rounded-[48px] lg:max-lg:rounded-4xl xl:rounded-[80px] 2xl:mt-4"
              loading="eager"
            />
          </div>

          <div className="order-5 col-end-25 row-start-2 flex-col max-md:mt-12 md:order-0 md:col-start-11 md:row-end-3 lg:col-start-19 lg:row-end-5 lg:flex">
            <div className="md:max-lg:hidden">
              <img
                src="/img/about/koshari.jpeg"
                alt=""
                className="aspect-2/1 h-full w-full rounded-4xl object-cover md:max-lg:hidden lg:rounded-[44px]"
                loading="eager"
              />
            </div>

            <div className="mt-4 flex h-full flex-col gap-2 font-medium lg:mt-8">
              <AnimatedText
                as="p"
                text={"Our Philosophy"}
                className="text-test-step-1 leading-[92%] font-extrabold max-md:text-3xl"
                splitBy="line"
                delayChildren={1.1}
                onRender={true}
              />

              <AnimatedText
                as="p"
                text={`We believe that food is a basic human right that every student
                should have access to. That’s why we operate as a non-profit.`}
                splitBy="line"
                delayChildren={1.2}
                onRender={true}
                className="text-test-step--2 max-md:text-base lg:mt-auto"
              />
            </div>
          </div>

          <div className="lg:text-test-step--2 text-mobile-step--1 col-start-1 col-end-9 row-start-3 row-end-5 flex flex-col font-medium lg:col-end-7">
            <AnimatedText
              as="p"
              text={"A new canteen for everyone"}
              delayChildren={0.9}
              onRender={true}
              splitBy="line"
              className="leading-[92%] font-semibold max-md:text-3xl max-md:font-extrabold md:my-auto"
            />

            <AnimatedText
              as="p"
              text={`We started De Nieuwe Mensa with a clear goal: Provide affordable,
              healthy, and sustainable food for every student at the University
              of Amsterdam.`}
              delayChildren={1}
              onRender={true}
              splitBy="line"
              className="max-md:mt-2 max-md:text-base"
            />
          </div>
        </div>

        <ClickThroughStory />

        <div className="mt-32 flex flex-col gap-18 px-4 lg:flex-row">
          <div className="flex h-full flex-1 flex-col gap-4">
            <h2 className="text-test-step-3 leading-[92%] font-extrabold tracking-tight lg:max-w-[15ch]">
              A NEW CANTEEN - FOR STUDENTS, NOT PROFIT
            </h2>
            <div className="w-full flex-1 lg:hidden">
              <div className="relative h-full w-full overflow-hidden rounded-4xl">
                <img
                  src="/img/about/handingoutfood.jpeg"
                  alt="Picture showing a student handing out food"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
            <p className="max-lg:text-lg lg:text-lg">
              We believe that food is a human right, and that it should be
              accessible to everyone. Sadly, the Netherlands are expensive, and
              for-profit businesses (such as the other canteen stalls) end up
              charging prices that are unsustainable for most students.
            </p>
            <p className="max-lg:text-lg lg:text-lg">
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
            <div className="relative h-full w-full overflow-hidden rounded-4xl">
              <img
                src="/img/about/handingoutfood.jpeg"
                alt=""
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>

        <div className="mt-20 flex flex-col justify-between gap-8 px-4 md:mt-32 lg:flex-row lg:gap-18">
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
              <div className="relative aspect-video h-full w-full overflow-hidden rounded-2xl">
                <Image
                  src="/img/about/1A.jpeg"
                  fill={true}
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
                    <h3 className="text-test-step-2 font-bold tracking-tight">
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
          className="mt-0 px-4 md:mt-24 lg:pr-20 lg:pl-8"
          heading={"A PLANT-BASED CANTEEN"}
          subheading={
            "De Nieuwe Mensa only sells plant-based meals, which has several benefits for our cause."
          }
          image={{
            src: "/img/about/1B.jpeg",
            alt: "Image showing students buying our food.",
          }}
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

        <div className="mt-0 flex flex-col justify-between gap-8 px-4 md:mt-32 lg:flex-row lg:gap-18">
          <div className="flex flex-1 flex-col gap-4">
            <h2 className="text-test-step-3 leading-[92%] font-extrabold tracking-tight">
              BUILT WITH THE SUPPORT OF OUR PARTNERS
            </h2>
            <p className="font-medium max-lg:text-base lg:text-lg">
              Supported by partners who believe in our mission and help bring it
              to life.
            </p>
            <div className="w-full">
              <div className="relative aspect-video h-full w-full overflow-hidden rounded-2xl shadow">
                <Image
                  src="/img/about/partners.jpeg"
                  fill={true}
                  alt=""
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-1 flex-row gap-8">
            <div className="flex flex-col justify-between max-lg:gap-4">
              {partners.map((item) => {
                return (
                  <div key={item.text}>
                    <h3 className="text-test-step-2 leading-[92%] font-bold tracking-tight">
                      {item.heading}
                    </h3>
                    <p className="">{item.text}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <OurTeamServer />
      </div>
    </>
  );
}

export default About;
