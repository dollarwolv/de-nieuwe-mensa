import ClickThroughStory from "@/components/AboutPage/ClickThroughStory";
import OurTeam from "@/components/AboutPage/OurTeam";

function About() {
  return (
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
            healthy, and sustainable food for every student at the University of
            Amsterdam.
          </p>
        </div>
      </div>

      <ClickThroughStory />
      <OurTeam />
    </div>
  );
}

export default About;
