import Image from "next/image";
import Button from "./Button";

function Navbar() {
  return (
    <div className="flex w-full px-10 items-center justify-between text-2xl font-extrabold">
      <Image
        src="/logo.png"
        width="110"
        height="100"
        alt="De Nieuwe Mensa Logo"
      />
      <div className="flex gap-5 items-center">
        <span>About</span>
        <span>Transparency</span>
        <span>Catering</span>
        <span>Blog</span>
        <Button>SUPPORT US</Button>
      </div>
    </div>
  );
}

export default Navbar;
