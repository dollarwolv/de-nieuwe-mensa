"use client";

function ParamsTest() {
  const params = new URLSearchParams({
    groupBy: "week",
    dateRange: 365,
  });

  return (
    <div>
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
