"use client";

import AnimatedText from "@/components/General/AnimatedText";

function ParamsTest() {
  const date = new Date("2026-11-05");
  const params = new URLSearchParams({
    date,
  });

  return (
    <div>
      <AnimatedText text={"This is a test"} splitBy="character"></AnimatedText>
      <button
        onClick={async () => {
          const res = await fetch(`/api/dish-on-date?${params.toString()}`);
          const data = await res.json();
          console.log(data);
        }}
      >
        Gimme dat data
      </button>
    </div>
  );
}

export default ParamsTest;
