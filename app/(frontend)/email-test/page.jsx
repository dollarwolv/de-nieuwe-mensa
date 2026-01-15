"use client";

function EmailTest() {
  return (
    <div>
      <button
        onClick={async () => {
          const res = await fetch("/api/catering", {
            method: "POST",
          });
        }}
      >
        {" "}
        send email
      </button>
    </div>
  );
}

export default EmailTest;
