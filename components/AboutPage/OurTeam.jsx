"use client";

import { useState } from "react";
import YearDropdown from "../General/YearDropdown";

function OurTeam({ boardMembersByYear, cooksByYear }) {
  const years = boardMembersByYear?.map(({ year }) => year);
  const [selectedYear, setSelectedYear] = useState(years.at(-1));
  const selectedBoardMembers =
    boardMembersByYear?.find((set) => set.year === selectedYear)?.members ?? [];
  const selectedCooks =
    cooksByYear?.find((set) => set.year === selectedYear)?.members ?? [];

  return (
    <section className="w-full">
      <div className="bg-dnm-dark-green mt-25 -mb-12 flex h-24 w-full rounded-t-4xl border-3 border-black"></div>
      <div className="bg-dnm-light-green -mb-12 flex h-22 w-full rounded-t-4xl border-3 border-black"></div>
      <div className="bg-dnm-white flex w-full flex-col items-center rounded-4xl border-3 border-black p-8">
        <div className="flex flex-col items-center gap-2">
          <h1 className="md:text-test-step-6 text-5xl leading-[92%] font-extrabold tracking-tight">
            OUR TEAM
          </h1>
          <p className="text-test-step--1 max-w-[48ch] text-center leading-[92%] font-medium tracking-tight">
            Our team consist of two interconnected parts: The board running the
            administrative side, and the cooks who make the food. Some board
            members are also cooks, and some cooks are also board members - we
            are one big team!
          </p>
        </div>
        <div className="mt-12 flex w-full flex-col lg:mt-24">
          <div className="flex flex-col justify-between md:flex-row md:items-end">
            <div className="flex flex-col">
              <h2 className="text-test-step-4 leading-[92%] font-bold tracking-tight">
                The Board
              </h2>
              <p className="text-test-step--2 max-w-[50ch] leading-[92%] font-medium tracking-tight">
                Meet the motivated students who are working on the
                administrative side of De Nieuwe Mensa.
              </p>
            </div>
            <YearDropdown
              years={years}
              selectedYear={selectedYear}
              onChange={setSelectedYear}
              className="w-fit max-md:mt-2"
            />
          </div>
          <div className="mt-6 grid grid-cols-2 justify-between gap-x-20 gap-y-2.5 md:grid-cols-3 lg:mt-12 lg:grid-cols-5">
            {selectedBoardMembers.map((profile, i) => {
              return (
                <div
                  className="flex max-w-53 flex-col"
                  key={`board-member-${i}`}
                >
                  <div className="aspect-square max-w-53 overflow-hidden rounded-full">
                    <img
                      src={`${profile.profilePicture?.url || "https://picsum.photos/212/212"}`}
                      alt=""
                      className="h-full w-full max-w-53 object-cover"
                    />
                  </div>

                  <div className="mt-2 flex flex-col items-center">
                    <span className="md:text-step--1 text-center leading-[92%] font-medium tracking-tight">
                      {profile.name}
                    </span>
                    <span className="italic max-md:text-sm">
                      {profile.role}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-24 flex flex-col">
            <h2 className="text-test-step-4 leading-[92%] font-bold tracking-tight">
              The Cooks
            </h2>
            <p className="text-test-step--2 max-w-[50ch] leading-[92%] font-medium tracking-tight">
              Most importantly - the students who are working on the bringing
              you the best food possible.
            </p>
          </div>
          <div className="mt-6 grid grid-cols-2 justify-between gap-x-20 gap-y-2.5 md:grid-cols-3 lg:mt-12 lg:grid-cols-5">
            {selectedCooks.map((profile, i) => {
              return (
                <div className="flex max-w-53 flex-col" key={`cook-${i}`}>
                  <div className="aspect-square max-w-53 overflow-hidden rounded-full">
                    <img
                      src={`${profile.profilePicture?.url || "https://picsum.photos/212/212"}`}
                      alt=""
                      className="h-full w-full max-w-53 object-cover"
                    />
                  </div>
                  <div className="mt-2 flex flex-col items-center">
                    <span className="md:text-step--1 text-center leading-[92%] font-medium tracking-tight">
                      {profile.name}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default OurTeam;
