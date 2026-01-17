import ProgressionChart from "@/components/Transparency/ProgressionChart";
import ComparisonChart from "@/components/Transparency/ComparisonChart";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

function TransparencyPage() {
  return (
    <div className="flex w-full max-w-460 flex-col">
      {/* Hero Section */}
      <div className="mt-12 flex w-full flex-col">
        <h1 className="md:text-test-step-7 mb-4 text-4xl leading-[92%] font-extrabold tracking-tight max-[400px]:text-3xl lg:mb-12">
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

      <div className="flex w-full max-w-460 flex-col items-center lg:flex-row lg:gap-12">
        <div className="flex flex-col items-center justify-center">
          <h2 className="text-test-step-5 text-center leading-[92%] font-extrabold tracking-tight max-lg:mt-24">
            STUDENT FEEDBACK
          </h2>
          <p className="text-test-step--1 mt-2 max-w-[50ch] text-center font-medium">
            Here, you can find how satisfied students with our different meals,
            as well as our service in general. Keep in mind that we only started
            tracking these metrics with the launch of this site in the February
            of 2026.
          </p>
        </div>
        <div className="mt-12 flex gap-12 max-xl:flex-col">
          <Tabs defaultValue="progression">
            <TabsList>
              <TabsTrigger value="progression">Ratings Over Time</TabsTrigger>
              <TabsTrigger value="comparison">Compare Dishes</TabsTrigger>
            </TabsList>
            <TabsContent value="progression">
              <ProgressionChart />
            </TabsContent>
            <TabsContent value="comparison">
              <ComparisonChart />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

export default TransparencyPage;
