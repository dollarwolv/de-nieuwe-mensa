function CircleScrollText() {
  const text =
    "[40000+] Students served | [200.000+] Total Euros saved | [50%+] Meal Costs reduced | [2000+] Appie runs spared | ";

  return (
    <div className="block w-full md:hidden">
      <svg
        viewBox="0 0 300 300"
        className="my-12 animate-[spin_20s_linear_infinite] overflow-visible"
        fill="none"
      >
        <path
          id="circleCurve"
          d="M 150, 150 m -150, 0 a 150,150 0 1,1 300,0 a 150,150 0 1,1 -300,0"
        />
        <text className="fill-black text-black">
          <textPath href="#circleCurve">{text}</textPath>
        </text>
      </svg>
    </div>
  );
}

export default CircleScrollText;
