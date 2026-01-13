"use client";

import { useState } from "react";
import Button from "../General/Button";

function CateringQuoteForm() {
  const [wantsDifferentDish, setWantsDifferentDish] = useState(false);
  const [dateUnknown, setDateUnknown] = useState(false);
  const [timeUnknown, setTimeUnknown] = useState(false);
  const [guestsUnknown, setGuestsUnknown] = useState(false);
  const [locationUnknown, setLocationUnknown] = useState(false);
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <section className="w-full max-w-460 px-4">
      <div className="bg-dnm-dark-green mt-25 -mb-12 flex h-24 w-full rounded-t-4xl border-2"></div>
      <div className="bg-dnm-light-green -mb-12 flex h-22 w-full rounded-t-4xl border-2"></div>
      <div className="bg-dnm-white w-full rounded-4xl border-2 border-black px-6 py-12 md:px-12">
        <div className="flex flex-col items-center text-center">
          <h1 className="text-test-step-6 text-5xl leading-[92%] font-extrabold tracking-tight md:text-7xl">
            GET A CATERING QUOTE
          </h1>
          <p className="text-test-step--1 mt-4 max-w-[60ch] leading-[120%] font-medium">
            Interested? Just fill out the form below with your event details.
            Our Catering representative will get back to you with a quote and a
            menu in the next 1–2 business days.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-12"
        >
          <div className="flex flex-col gap-6">
            <h2 className="text-test-step-1 text-2xl leading-[92%] font-extrabold tracking-tight">
              ABOUT YOU
            </h2>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold" htmlFor="name">
                Your Name / Name of the Organization
              </label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Enter name"
                required
                className="w-full rounded-xl border border-black/20 bg-white px-4 py-3 text-sm font-medium placeholder:text-black/50"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold" htmlFor="email">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Enter email"
                required
                className="w-full rounded-xl border border-black/20 bg-white px-4 py-3 text-sm font-medium placeholder:text-black/50"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold" htmlFor="phone">
                Phone number
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                placeholder="Enter phone number"
                className="w-full rounded-xl border border-black/20 bg-white px-4 py-3 text-sm font-medium placeholder:text-black/50"
              />
              <p className="text-xs font-medium text-black/60">
                Optional – just useful for last-minute communication.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <h2 className="text-test-step-1 text-2xl leading-[92%] font-extrabold tracking-tight">
              ABOUT THE EVENT
            </h2>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold" htmlFor="event-about">
                What is your event about?
              </label>
              <input
                id="event-about"
                name="eventAbout"
                type="text"
                placeholder="Enter quick description"
                required
                className="w-full rounded-xl border border-black/20 bg-white px-4 py-3 text-sm font-medium placeholder:text-black/50"
              />
              <p className="text-xs font-medium text-black/60">
                Just so we can get to know you a bit better – a quick
                description is fine!
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <label className="text-sm font-semibold" htmlFor="event-date">
                  When is your event?
                </label>
                <label className="flex items-center gap-2 text-xs font-medium text-black/70">
                  <input
                    type="checkbox"
                    checked={dateUnknown}
                    onChange={(event) => setDateUnknown(event.target.checked)}
                    className="h-4 w-4 accent-black"
                  />
                  still unknown
                </label>
              </div>
              <input
                id="event-date"
                name="eventDate"
                type="date"
                placeholder="Enter date"
                disabled={dateUnknown}
                className="w-full rounded-xl border border-black/20 bg-white px-4 py-3 text-sm font-medium placeholder:text-black/50 disabled:opacity-60"
              />
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <label className="text-sm font-semibold" htmlFor="event-time">
                  At what time would you like the food to be delivered?
                </label>
                <label className="flex items-center gap-2 text-xs font-medium text-black/70">
                  <input
                    type="checkbox"
                    checked={timeUnknown}
                    onChange={(event) => setTimeUnknown(event.target.checked)}
                    className="h-4 w-4 accent-black"
                  />
                  still unknown
                </label>
              </div>
              <input
                id="event-time"
                name="eventTime"
                type="time"
                placeholder="Enter time"
                disabled={timeUnknown}
                className="w-full rounded-xl border border-black/20 bg-white px-4 py-3 text-sm font-medium placeholder:text-black/50 disabled:opacity-60"
              />
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <label className="text-sm font-semibold" htmlFor="location">
                  Location
                </label>
                <label className="flex items-center gap-2 text-xs font-medium text-black/70">
                  <input
                    type="checkbox"
                    checked={locationUnknown}
                    onChange={(event) =>
                      setLocationUnknown(event.target.checked)
                    }
                    className="h-4 w-4 accent-black"
                  />
                  still unknown
                </label>
              </div>
              <input
                id="location"
                name="location"
                type="text"
                placeholder="Enter location"
                disabled={locationUnknown}
                className="w-full rounded-xl border border-black/20 bg-white px-4 py-3 text-sm font-medium placeholder:text-black/50 disabled:opacity-60"
              />
              <p className="text-xs font-medium text-black/60">
                By default, we only deliver to locations on Roeterseilandcampus.
                If you have another location in mind, please still send in a
                request, and we will see what is possible!
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <label className="text-sm font-semibold" htmlFor="guest-count">
                  How many guests do you expect?
                </label>
                <label className="flex items-center gap-2 text-xs font-medium text-black/70">
                  <input
                    type="checkbox"
                    checked={guestsUnknown}
                    onChange={(event) => setGuestsUnknown(event.target.checked)}
                    className="h-4 w-4 accent-black"
                  />
                  still unknown
                </label>
              </div>
              <input
                id="guest-count"
                name="guestCount"
                type="number"
                placeholder="Enter number of guests"
                disabled={guestsUnknown}
                className="w-full rounded-xl border border-black/20 bg-white px-4 py-3 text-sm font-medium placeholder:text-black/50 disabled:opacity-60"
              />
            </div>

            <div className="flex flex-col gap-3">
              <span className="text-sm font-semibold">
                Would you like to request a different dish?
              </span>
              <label className="flex items-start gap-3 text-sm font-medium text-black/80">
                <input
                  type="radio"
                  name="dish-request"
                  value="default"
                  defaultChecked
                  onChange={() => setWantsDifferentDish(false)}
                  className="mt-1 h-4 w-4 accent-black"
                />
                No, I’m fine with the dish of the day! (Most likely: dish)
              </label>
              <label className="flex items-start gap-3 text-sm font-medium text-black/80">
                <input
                  type="radio"
                  name="dish-request"
                  value="custom"
                  onChange={() => setWantsDifferentDish(true)}
                  className="mt-1 h-4 w-4 accent-black"
                />
                Yes, I would like to request a different dish
              </label>
              <p className="text-xs font-medium text-black/60">
                By default, we serve the same dish that we regularly serve in
                the canteen on that day (for your selected date, this is dish).
                Exceptions are possible, but as this requires significant
                additional effort on our side, it would cost more.
              </p>
            </div>

            {wantsDifferentDish && (
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold" htmlFor="desired-dish">
                  What dish would you like to be served?
                </label>
                <input
                  id="desired-dish"
                  name="desiredDish"
                  type="text"
                  placeholder="Enter desired dish"
                  className="w-full rounded-xl border border-black/20 bg-white px-4 py-3 text-sm font-medium placeholder:text-black/50"
                />
              </div>
            )}

            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold" htmlFor="remarks">
                Any remarks or questions?
              </label>
              <textarea
                id="remarks"
                name="remarks"
                rows={3}
                placeholder="Enter questions/remarks"
                className="w-full rounded-xl border border-black/20 bg-white px-4 py-3 text-sm font-medium placeholder:text-black/50"
              />
              <p className="text-xs font-medium text-black/60">
                We are happy to answer any additional questions – feel free to
                send us an email at catering@denieuwemensa.nl.
              </p>
            </div>

            <div className="pt-2">
              <Button className="px-8 py-3 text-sm font-semibold">
                SEND REQUEST
              </Button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}

export default CateringQuoteForm;
