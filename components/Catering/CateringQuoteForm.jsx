"use client";

import { useEffect, useState } from "react";
import Button from "../General/Button";
import { useRouter } from "next/navigation";
import AnimatedText from "../General/AnimatedText";
import { SquareLoader } from "react-spinners";

function CateringQuoteForm() {
  const [wantsDifferentDish, setWantsDifferentDish] = useState(false);
  const [dateUnknown, setDateUnknown] = useState(false);
  const [timeUnknown, setTimeUnknown] = useState(false);
  const [guestsUnknown, setGuestsUnknown] = useState(false);
  const [locationUnknown, setLocationUnknown] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [dishOnDate, setDishOnDate] = useState("");
  const [dishOnDateError, setDishOnDateError] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const values = Object.fromEntries(formData.entries());

    const res = await fetch("/api/catering", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...values,
      }),
    });

    const data = await res.json();

    if (!data.ok) {
      setError(data.error);
      setLoading(false);
    } else {
      setLoading(false);
      router.push("/catering/request-success");
    }
  }

  useEffect(() => {
    if (!selectedDate) return;

    setDishOnDate("");
    setDishOnDateError("");

    const controller = new AbortController();
    const timeoutId = setTimeout(async () => {
      try {
        const params = new URLSearchParams({
          date: selectedDate,
        });

        setDishOnDate("loading...");

        const res = await fetch(`/api/dish-on-date?${params.toString()}`, {
          signal: controller.signal,
        });
        const data = await res.json();

        if (!data.ok) {
          setDishOnDateError(data.error);
          setDishOnDate("");
          return;
        }

        setDishOnDate(data.dishOnDate.name);
      } catch (error) {
        if (error.name !== "AbortError") {
          setError(error);
        }
      }
    }, 600);

    return () => {
      (clearTimeout(timeoutId), controller.abort());
    };
  }, [selectedDate]);

  return (
    <section className="w-full max-w-460">
      <div className="bg-dnm-dark-green mt-25 -mb-12 flex h-24 w-full rounded-t-4xl border-2"></div>
      <div className="bg-dnm-light-green -mb-12 flex h-22 w-full rounded-t-4xl border-2"></div>
      <div className="bg-dnm-white w-full rounded-4xl border-2 border-black px-6 py-12 md:px-12">
        <div className="flex flex-col items-center text-center">
          <AnimatedText
            text={"GET A CATERING QUOTE"}
            className="text-test-step-6 text-5xl leading-[92%] font-extrabold tracking-tight md:text-7xl"
            as="h1"
            splitBy="character"
            delayChildren={0}
            staggerChildren={0.02}
          />

          <AnimatedText
            text={`Interested? Just fill out the form below with your event details.
            Our Catering representative will get back to you with a quote and a
            menu in the next 2-3 business days.`}
            className="text-test-step--1 mt-4 max-w-[60ch] leading-[120%] font-medium"
            as="p"
            splitBy="line"
            delayChildren={0.2}
            staggerChildren={0.15}
          />
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
                value={selectedDate}
                onChange={(event) => setSelectedDate(event.target.value)}
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
                  name="dishRequest"
                  value="default"
                  defaultChecked
                  disabled={dishOnDateError}
                  onChange={() => setWantsDifferentDish(false)}
                  className="mt-1 h-4 w-4 accent-black"
                />
                No, I’m fine with the dish of the day!
                {dishOnDate && ` (Most likely: ${dishOnDate})`}
              </label>
              <label className="flex items-start gap-3 text-sm font-medium text-black/80">
                <input
                  type="radio"
                  name="dishRequest"
                  value="custom"
                  onChange={() => setWantsDifferentDish(true)}
                  className="mt-1 h-4 w-4 accent-black"
                />
                Yes, I would like to request a different dish
              </label>
              <p className="text-xs font-medium text-black/60">
                By default, we serve the same dish that we regularly serve in
                the canteen on that day.
                {!dishOnDateError && selectedDate ? (
                  <>
                    {" "}
                    For the date you selected, this would most likely be{" "}
                    <span className="font-bold">{dishOnDate}</span>. Exceptions
                    are possible, but as this requires significant additional
                    effort on our side, it would cost more.
                  </>
                ) : selectedDate && dishOnDateError ? (
                  ` ${dishOnDateError} This means that some special arrangement
                  needs to be made. Once you submit this form, our catering representative 
                  will get back to you to you and see what can be done!`
                ) : !selectedDate ? (
                  ` Exceptions
                    are possible, but as this requires significant additional
                    effort on our side, it would cost more.`
                ) : (
                  ""
                )}
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
                <p className="text-xs font-medium text-black/60">
                  Do keep in mind that whether or not we can accommodate your
                  wish depends on several factors, and it might not be possible
                  to serve your requested dish on this day.
                </p>
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
              <p className="text-xs font-medium text-red-600/80">{error}</p>
            </div>

            <div className="pt-2">
              <Button className="px-8 py-3 text-sm font-semibold" type="submit">
                {loading ? (
                  <>
                    Submitting...
                    <SquareLoader
                      color={"var(--color-dnm-white)"}
                      size={18}
                      className="ml-4"
                    />
                  </>
                ) : (
                  "SEND REQUEST"
                )}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}

export default CateringQuoteForm;
