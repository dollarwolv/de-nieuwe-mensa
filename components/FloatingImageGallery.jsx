import { useSpring, motion } from "framer-motion";

const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };

function FloatingImageGallery() {
  const planesData = [
    {
      speed: 0.05,
      opacity: "opacity-30 brightness-70",
      x: useSpring(0, springConfig),
      y: useSpring(0, springConfig),
      images: [
        { src: "1015/800/500", pos: "top-[12%] left-[10%] h-44" },
        { src: "1027/400/700", pos: "top-[15%] left-[85%] h-56" },
        { src: "1035/600/600", pos: "top-[60%] left-[58%] h-40" },
      ],
    },
    {
      speed: 0.1,
      opacity: "opacity-80 brightness-90",
      x: useSpring(0, springConfig),
      y: useSpring(0, springConfig),
      images: [
        { src: "1043/500/800", pos: "top-[8%] left-[55%] h-52" },
        { src: "1052/900/500", pos: "top-[60%] left-[8%] h-44" },
        { src: "1069/600/600", pos: "top-[72%] left-[70%] h-36" },
      ],
    },
    {
      speed: 0.15,
      opacity: "opacity-100",
      x: useSpring(0, springConfig),
      y: useSpring(0, springConfig),
      images: [
        { src: "1074/700/450", pos: "top-[18%] left-[20%] h-40" },
        { src: "1084/450/750", pos: "top-[55%] left-[80%] h-56" },
        { src: "109/550/550", pos: "top-[75%] left-[30%] h-38" },
      ],
    },
  ];

  // 2. Logic: Loop through the array to update all springs
  const manageMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const offsetX = clientX - innerWidth / 2;
    const offsetY = clientY - innerHeight / 2;

    planesData.forEach((plane) => {
      plane.x.set(offsetX * plane.speed);
      plane.y.set(offsetY * plane.speed);
    });
  };

  return (
    <div className="relative h-[200vh] w-screen">
      <div
        className="sticky top-0 flex h-screen w-screen items-center justify-center overflow-hidden"
        onMouseMove={manageMouseMove}
      >
        <h1 className="absolute z-20 text-8xl font-black">ABOUT DNM</h1>

        {/* 3. Rendering: Double map for Planes and Images */}
        {planesData.map((plane, index) => (
          <motion.div
            key={index}
            style={{ x: plane.x, y: plane.y }}
            className={`absolute h-screen w-screen ${plane.opacity}`}
          >
            {plane.images.map((img, imgIndex) => (
              <img
                key={imgIndex}
                src={`https://picsum.photos/id/${img.src}`}
                className={`absolute ${img.pos}`}
                alt=""
              />
            ))}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default FloatingImageGallery;
