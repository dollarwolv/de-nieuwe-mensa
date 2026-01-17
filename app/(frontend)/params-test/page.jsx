"use client";

function ParamsTest() {
  const params = new URLSearchParams({
    dateRange: "30",
  });

  return (
    <div>
      <button
        onClick={async () => {
          const res = await fetch(`/api/vote-stats?${params.toString()}`);
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
