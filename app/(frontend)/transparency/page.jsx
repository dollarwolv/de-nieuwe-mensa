import ProgressionChart from "@/components/Transparency/ProgressionChart";
import ComparisonChart from "@/components/Transparency/ComparisonChart";

function TransparencyPage() {
  return (
    <div className="flex w-full max-w-460 flex-col">
      {/* Hero Section */}
      <div className="mt-12 flex w-full flex-col">
        <h1 className="md:text-test-step-7 mb-4 text-5xl leading-[92%] font-extrabold tracking-tight lg:mb-12">
          TRANSPARENCY
        </h1>
        <div className="flex w-full flex-col justify-between gap-2 border-t border-black pt-4 md:flex-row lg:gap-6 lg:pt-12">
          <p className="text-test-step--2 flex-4 font-medium">
            Our goal is creating a canteen that students can understand,
            participate in, and change.
          </p>
          <p className="text-test-step--2 flex-5 font-medium">
            This page will outline the finances of our business, as well as how
            satisfied students are with DNM.
          </p>
        </div>
      </div>
      <div className="mt-4 aspect-16/7 w-full overflow-hidden rounded-2xl lg:mt-12">
        <img
          src="https://picsum.photos/1920/1080"
          className="h-full w-full object-cover"
          alt=""
        />
      </div>
      {/* Subheading */}
      <div className="mt-12 flex w-full justify-end">
        <span className="text-test-step-0 max-w-[44ch] leading-[92%] font-medium">
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; We want
          to be 100% transparent about how we run as a business. This page
          provides a detailed rundown of our finances - sales, pricing strategy,
          and everything in between.
        </span>
      </div>

      {/* Student ratings */}
      <div className="w-60">
        <ProgressionChart />
        <ComparisonChart />
      </div>
    </div>
  );
}

export default TransparencyPage;
