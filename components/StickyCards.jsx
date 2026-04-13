import StickyCard from "./StickyCard";

function StickyCards() {
  const stickyCardsData = [
    {
      index: "01",
      title: "PROTEST",
      image: "/img/landing/stickycards/newspaper.jpeg",
      description:
        "The canteen was too expensive. That's why we protested on campus by giving out free food.",
      bgColor: "bg-dnm-white",
    },
    {
      index: "02",
      title: "LAUNCH",
      image: "/img/landing/stickycards/stall.jpeg",
      description:
        "Next, we launched a food stall at the Roeterseilandcampus of the University of Amsterdam.",
      bgColor: "bg-dnm-white",
    },
    {
      index: "03",
      title: "NOW",
      image: "/img/landing/stickycards/serving.jpeg",
      description:
        "Now, we're serving around 2000 healthy, vegan, and affordable meals to hungry students & staff per week.",
      bgColor: "bg-dnm-white",
    },
  ];

  return (
    <div className="relative">
      {stickyCardsData.map((data, i) => {
        return (
          <StickyCard key={i} data={data} rounded={true} cardHeight={100} />
        );
      })}
    </div>
  );
}

export default StickyCards;
