import Button from "@/components/General/Button";
import Link from "next/link";

function RequestSuccess() {
  return (
    <div className="flex h-[80vh] w-full flex-col items-center justify-center">
      <h1 className="mt-12 text-center text-6xl leading-[92%] font-extrabold tracking-tight">
        Catering Request successful!
      </h1>
      <p className="mt-4 max-w-[50ch] text-center text-lg font-medium">
        Thanks for sending in a catering request! A member of our board will get
        back to you within 2-3 business days.
      </p>

      <Button className="mt-4 text-lg font-extrabold uppercase">
        <Link href={"/"}>Back to the homepage</Link>
      </Button>
    </div>
  );
}

export default RequestSuccess;
