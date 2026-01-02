function Button({ children }) {
  return (
    <button className="bg-dnm-light-green text-white shadow-[4px_4px_0px_0px_rgb(35,35,35)] rounded-full py-2 px-5 border-black border text-2xl">
      {children}
    </button>
  );
}

export default Button;
