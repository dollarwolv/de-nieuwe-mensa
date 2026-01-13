import FloatingImageGallery from "@/components/FloatingImageGallery";
import CateringQuoteForm from "@/components/Catering/CateringQuoteForm";
import CateringStickyCards from "@/components/Catering/CateringStickyCards";

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
      <CateringStickyCards />
      <CateringQuoteForm />
    </div>
  );
}

export default Catering;
