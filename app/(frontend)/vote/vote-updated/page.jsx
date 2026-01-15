import Button from "@/components/General/Button";
import Link from "next/link";

function VoteUpdated() {
  return (
    <div className="flex h-[80vh] w-full flex-col items-center justify-center">
      <h1 className="mt-12 text-center text-6xl leading-[92%] font-extrabold tracking-tight">
        Rating updated!
      </h1>
      <p className="mt-4 max-w-[50ch] text-center text-lg font-medium">
        We noticed that you already submitted a rating today, so your original
        rating has been updated.
      </p>
      <p className="mt-4 max-w-[50ch] text-center text-lg font-medium">
        An average of all ratings can be found on the{" "}
        <Link href={"/transparency"} className="text-dnm-light-green font-bold">
          Transparency
        </Link>{" "}
        page. Please return tomorrow to submit a rating for tomorrow's dish!
      </p>

      <Button className="mt-4 text-lg font-extrabold uppercase">
        <Link href={"/"}>Back to the homepage</Link>
      </Button>
    </div>
  );
}

export default VoteUpdated;
