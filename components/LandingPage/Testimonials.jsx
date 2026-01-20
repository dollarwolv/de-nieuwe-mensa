import Marquee from "react-fast-marquee";
import Button from "../General/Button";

import config from "@payload-config";
import { getPayload } from "payload";

async function Testimonials() {
  const payload = await getPayload({ config });
  const { docs } = await payload.find({
    collection: "testimonials",
  });

  return (
    <div className="mt-24 flex max-w-460 flex-col items-center overflow-clip">
      <div className="mb-6 flex flex-col items-center gap-2 tracking-tight">
        <h2 className="text-center text-5xl leading-[92%] font-extrabold lg:text-8xl">
          WHAT STUDENTS SAY
        </h2>
        <span className="text-center text-xl leading-[92%]">
          We are always open to feedback - and so far, it’s been nothing but
          positive ❤️
        </span>
      </div>

      {[0, 1].map((i) => {
        return (
          <Marquee
            style={{ width: "100vw", margin: "24px 0px 0px 0px" }}
            direction={i == 0 ? "left" : "right"}
            key={i}
            pauseOnHover={true}
          >
            {docs.map((testimonial) => {
              return (
                <div
                  className="mx-4 flex h-63 w-80 flex-col rounded-2xl bg-white p-4 md:w-120"
                  key={testimonial.index}
                >
                  <div className="flex flex-row items-center gap-2 border-b-[0.5px] border-gray-200 pb-4">
                    <div className="h-14 w-14 overflow-hidden rounded-full">
                      <img
                        src={
                          testimonial.profilePicture?.url ||
                          "https://picsum.photos/56/56"
                        }
                        alt={
                          testimonial.profilePicture?.alt || testimonial.name
                        }
                        className="object-cover"
                      />
                    </div>

                    <div className="flex flex-col">
                      <span className="text-xl font-bold">
                        {testimonial.name}
                      </span>
                      <span className="">{testimonial.studyprogram}</span>
                    </div>
                  </div>
                  <p className="line-clamp-5 h-full max-w-[40ch] pt-6">
                    {testimonial.quote}
                  </p>
                </div>
              );
            })}
          </Marquee>
        );
      })}
      <div className="pb-2">
        <Button className="mt-8 text-xl font-bold">
          <a href="https://www.instagram.com/denieuwemensa/">
            Leave feedback - good or bad ❤️
          </a>
        </Button>
      </div>
    </div>
  );
}

export default Testimonials;
