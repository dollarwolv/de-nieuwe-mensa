"use client";

import AnimatedText from "@/components/General/AnimatedText";

function ParamsTest() {
  const params = new URLSearchParams({
    groupBy: "week",
    dateRange: 365,
  });

  return (
    <div>
      <AnimatedText text={"This is a test"} splitBy="character"></AnimatedText>
      <button
        onClick={async () => {
          const res = await fetch(`/api/sales?${params.toString()}`);
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
