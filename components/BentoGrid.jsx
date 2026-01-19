function BentoGrid({ heading, subheading, boxes = [], image, className = "" }) {
  const [box1, box2, box3, box4] = boxes;

  const resolvedImage = image ?? {
    src: "https://picsum.photos/id/1011/1200/900",
    alt: "Catering preview",
  };

  return (
    <section className={`w-full ${className}`}>
      <div className="mx-auto flex w-full max-w-460 flex-col gap-10 py-16 lg:grid lg:grid-cols-[55%_45%] lg:gap-16">
        <div className="flex w-full flex-col gap-8">
          <div className="flex flex-col gap-2 md:gap-4">
            {heading && (
              <h2 className="lg:text-test-step-3 text-4xl leading-[92%] font-bold tracking-tight md:text-5xl">
                {heading}
              </h2>
            )}
            {subheading && (
              <p className="lg:text-test-step--2 max-w-[60ch] leading-[140%] md:text-lg">
                {subheading}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {box1 && (
              <div className="flex flex-col gap-3">
                <h3 className="text-test-step--1 leading-[100%] font-bold tracking-tight">
                  {box1.title}
                </h3>
                <p className="text-base leading-[140%]">{box1.text}</p>
              </div>
            )}
            {box2 && (
              <div className="flex flex-col gap-3">
                <h3 className="text-test-step--1 leading-[100%] font-bold tracking-tight">
                  {box2.title}
                </h3>
                <p className="text-base leading-[140%]">{box2.text}</p>
              </div>
            )}
            {box3 && (
              <div className="flex flex-col gap-3">
                <h3 className="text-test-step--1 leading-[100%] font-bold tracking-tight">
                  {box3.title}
                </h3>
                <p className="text-base leading-[140%]">{box3.text}</p>
              </div>
            )}
            {box4 && (
              <div className="flex flex-col gap-3">
                <h3 className="text-test-step--1 leading-[100%] font-bold tracking-tight">
                  {box4.title}
                </h3>
                <p className="text-base leading-[140%]">{box4.text}</p>
              </div>
            )}
          </div>
        </div>

        <div className="w-full">
          <div className="relative h-full overflow-hidden rounded-[48px]">
            <img
              src={resolvedImage.src}
              alt={resolvedImage.alt}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default BentoGrid;
