"use client";

import Image from "next/image";

function YearDropdown({ years, selectedYear, onChange, className = "" }) {
  return (
    <div className={className}>
      <label className="sr-only" htmlFor="team-year-select">
        Select team year
      </label>
      <div className="bg-dnm-light-green/90 relative flex items-center justify-between rounded-full border-2 border-black py-2 pr-2 pl-4 text-sm font-semibold tracking-tight shadow-[3px_3px_0px_0px_rgb(35,35,35)]">
        <select
          id="team-year-select"
          value={selectedYear}
          onChange={(event) => onChange(event.target.value)}
          className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
        >
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>

        <span>{selectedYear}</span>

        <Image
          src="/right-arrow-noline.svg"
          width={12}
          height={12}
          alt="down arrow"
          className="pointer-events-none ml-2"
        />
      </div>
    </div>
  );
}

export default YearDropdown;
