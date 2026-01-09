function Button({ children, className = "text-2xl" }) {
  return (
    <button
      className={`bg-dnm-light-green rounded-full border border-black px-5 py-2 text-white shadow-[4px_4px_0px_0px_rgb(35,35,35)] ${className} hover:bg-dnm-black cursor-pointer transition-colors`}
    >
      {children}
    </button>
  );
}

export default Button;
