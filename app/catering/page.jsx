import FloatingImageGallery from "@/components/FloatingImageGallery";
import CateringQuoteForm from "@/components/Catering/CateringQuoteForm";
import CateringStickyCards from "@/components/Catering/CateringStickyCards";
import BentoGrid from "@/components/BentoGrid";

function Catering() {
  return (
    <div className="relative flex flex-col items-center">
      <FloatingImageGallery
        headingText={"CATERING"}
        subHeadingText={"ft. De Nieuwe Mensa"}
        bgColor={"dnm-white"}
        showTop={false}
      />
      <div className="mt-12 flex w-full justify-end">
        <span className="text-test-step-0 max-w-[44ch] leading-[92%] font-medium">
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Planning
          an event shouldn't be a headache. Whether it’s a small workshop or a
          large faculty symposium, we provide hearty, planet-friendly meals that
          satisfy everyone. By choosing De Nieuwe Mensa, you’re supporting a
          student movement dedicated to fair food prices.
        </span>
      </div>
      <BentoGrid
        heading="WHY CHOOSE US?"
        subheading="Fresh, feel-good food for meetings, workshops, and campus moments. We make the planning easy so you can focus on the gathering."
        boxes={[
          {
            title: "100% Plant-based",
            text: "No need to worry about dietary restrictions; our menu is inclusive by default.",
          },
          {
            title: "Affordable",
            text: "Out of all of the catering options out there, we are by far the cheapest.",
          },
          {
            title: "Student-powered",
            text: "Every euro goes back into keeping campus food affordable.",
          },
          {
            title: "Hyper-local",
            text: "Based on Roeterseiland, meaning we’re never late and our “food miles” are practically zero.",
          },
        ]}
        image={{
          src: "https://picsum.photos/id/1062/1200/900",
          alt: "Windmill and field landscape",
        }}
      />
      <CateringStickyCards />
      <CateringQuoteForm />
    </div>
  );
}

export default Catering;
