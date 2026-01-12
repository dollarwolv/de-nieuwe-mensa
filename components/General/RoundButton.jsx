function RoundButton({ onClick, direction }) {
  return (
    <button
      className="bg-dnm-light-green border-dnm-black flex h-20 w-20 cursor-pointer items-center justify-center rounded-full border-2 shadow-[8px_8px_0px_0px_rgb(35,35,35)]"
      onClick={onClick}
    >
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`${direction === "left" ? "rotate-180" : ""}`}
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M0 20C0 19.2424 0.263363 18.5158 0.732152 17.9801C1.20094 17.4443 1.83675 17.1434 2.49972 17.1434H31.4615L20.7277 4.88273C20.2583 4.34633 19.9946 3.61882 19.9946 2.86024C19.9946 2.10166 20.2583 1.37414 20.7277 0.837744C21.1971 0.301346 21.8337 0 22.4975 0C23.1613 0 23.7979 0.301346 24.2673 0.837744L39.2656 17.9775C39.4984 18.2429 39.6831 18.5581 39.8091 18.9051C39.9351 19.2522 40 19.6243 40 20C40 20.3757 39.9351 20.7478 39.8091 21.0948C39.6831 21.4419 39.4984 21.7571 39.2656 22.0225L24.2673 39.1623C23.7979 39.6987 23.1613 40 22.4975 40C21.8337 40 21.1971 39.6987 20.7277 39.1623C20.2583 38.6259 19.9946 37.8983 19.9946 37.1398C19.9946 36.3812 20.2583 35.6537 20.7277 35.1173L31.4615 22.8566H2.49972C1.83675 22.8566 1.20094 22.5557 0.732152 22.0199C0.263363 21.4842 0 20.7576 0 20Z"
          fill="black"
        />
      </svg>
    </button>
  );
}

export default RoundButton;
