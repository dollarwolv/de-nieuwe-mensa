import Image from "next/image";
import Button from "./Button";

function Navbar() {
  return (
    <div className="flex w-full items-center justify-between px-5 text-2xl font-extrabold">
      <Image
        src="/logo.png"
        width="110"
        height="100"
        alt="De Nieuwe Mensa Logo"
      />
      <div className="flex items-center gap-5">
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
