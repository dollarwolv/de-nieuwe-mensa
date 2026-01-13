import StickyCard from "../StickyCard";

function CateringStickyCards() {
  const stickyCardsData = [
    {
      index: "01",
      title: "REQUEST",
      image: "/sticky-cards/card-1.jpg",
      description:
        "Quickly fill out the form below with your event details so we can tailor our offering to you.",
      bgColor: "bg-dnm-white",
    },
    {
      index: "02",
      title: "QUOTE",
      image: "/sticky-cards/card-2.jpg",
      description:
        "We’ll send you a customized offer and price quote within 3 business days.",
      bgColor: "bg-dnm-white",
    },
    {
      index: "03",
      title: "DELIVERY",
      image: "/sticky-cards/card-3.jpg",
      description:
        "We cook and deliver directly to your location on Roeterseiland.",
      bgColor: "bg-dnm-white",
    },
  ];

  return (
    <div className="relative">
      {stickyCardsData.map((data, i) => {
        return (
          <StickyCard key={i} data={data} rounded={false} cardHeight={75} />
        );
      })}
    </div>
  );
}

export default CateringStickyCards;
