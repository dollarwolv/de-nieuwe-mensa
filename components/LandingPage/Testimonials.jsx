import Marquee from "react-fast-marquee";
import Button from "../General/Button";

function Testimonials() {
  const testimonials = [
    {
      name: "Lara Student",
      major: "Psychology Student",
      text: "De Nieuwe Mensa is such a great initiative. I used to survive off of Albert Heijn Croissants during exam season. Now, I pay 4 Euros for a healthy meal - couldn’t be happier! De Nieuwe Mensa is such a great initiative. I used to survive off of Albert Heijn Croissants during exam season. Now, I pay 4 Euros for a healthy meal - couldn’t be happier!",
    },
    {
      name: "Noah Bisinger",
      major: "PPLE Student",
      text: "I love eating food, especially if it's tasty. And let me tell you, this is definitely food alright. Freaking awesome dude.",
    },
    {
      name: "Matteo Abraham",
      major: "PPLE Student",
      text: "De Nieuwe Mensa is so great. I would usually just survive off of licking stinky feet, but now I can actually eat some real food. Congratulations, you cured me.",
    },
    {
      name: "John F. Kennedy",
      major: "Politics Student",
      text: "Ich bin ein Berliner",
    },
  ];
  return (
    <div className="mt-24 flex flex-col items-center">
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
            {testimonials.map((testimonial) => {
              return (
                <div
                  className="mx-4 flex h-63 w-80 flex-col rounded-2xl bg-white p-4 md:w-120"
                  key={testimonial.index}
                >
                  <div className="flex flex-row items-center gap-2 border-b-[0.5px] border-gray-200 pb-4">
                    <img
                      src="https://picsum.photos/56/56"
                      alt=""
                      className="rounded-full"
                    />
                    <div className="flex flex-col">
                      <span className="text-xl font-bold">
                        {testimonial.name}
                      </span>
                      <span className="">{testimonial.major}</span>
                    </div>
                  </div>
                  <p className="line-clamp-5 h-full max-w-[40ch] pt-6">
                    {testimonial.text}
                  </p>
                </div>
              );
            })}
          </Marquee>
        );
      })}
      <Button className="mt-8 text-xl font-bold">
        <a href="https://www.instagram.com/denieuwemensa/">
          Leave feedback - good or bad ❤️
        </a>
      </Button>
    </div>
  );
}

export default Testimonials;
