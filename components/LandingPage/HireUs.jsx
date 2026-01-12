import Button from "../General/Button";

function HireUs() {
  return (
    <div className="max-w-460">
      <div className="bg-dnm-dark-green mt-25 -mb-12 flex h-24 w-full rounded-t-4xl border-2"></div>
      <div className="bg-dnm-light-green -mb-12 flex h-22 w-full rounded-t-4xl border-2"></div>
      <div className="bg-dnm-white flex flex-col gap-8 rounded-4xl border-2 px-8 py-16 md:flex-row">
        <div className="flex flex-1 flex-row gap-2">
          <img
            src="https://picsum.photos/200/360"
            alt=""
            className="w-full min-w-0 rounded"
          />
          <img
            src="https://picsum.photos/200/360"
            alt=""
            className="w-full min-w-0 rounded"
          />
          <img
            src="https://picsum.photos/200/360"
            alt=""
            className="w-full min-w-0 rounded"
          />
        </div>
        <div className="flex flex-1 flex-col justify-between gap-2">
          <div className="flex flex-col">
            <span className="md:text-step-1 text-lg">Catering & Events</span>
            <h2 className="md:text-step-5 text-5xl leading-[92%] font-extrabold tracking-tight">
              HIRE US FOR YOUR EVENT
            </h2>
          </div>
          <p className="md:text-step--1 text-lg leading-[92%] tracking-tight">
            Do you have an event coming up and want healthy, sustainable and
            affordable dining for your attendees? We offer all-inclusive
            catering for 100+ people. Click the button below to get in touch
            with us.
          </p>
          <Button className="md:text-step-0 font-extrabold md:w-fit">
            GET A QUOTE NOW
          </Button>
        </div>
      </div>
    </div>
  );
}

export default HireUs;
