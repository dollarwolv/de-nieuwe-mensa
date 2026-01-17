"use client";

function ParamsTest() {
  const params = new URLSearchParams({});

  return (
    <div>
      <button
        onClick={async () => {
          const res = await fetch(
            `/api/vote-stats/by-dish?${params.toString()}`,
          );
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
