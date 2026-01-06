import { motion, useSpring } from "framer-motion";

function FloatingImageGallery() {
  const x1 = useSpring(0, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const y1 = useSpring(0, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const x2 = useSpring(0, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const y2 = useSpring(0, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const x3 = useSpring(0, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const y3 = useSpring(0, { stiffness: 100, damping: 30, restDelta: 0.001 });

  const manageMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;

    // Calculate distance from center (ranges from negative to positive)
    const offsetX = clientX - innerWidth / 2;
    const offsetY = clientY - innerHeight / 2;

    x1.set(offsetX * 0.1);
    y1.set(offsetY * 0.1);
    x2.set(offsetX * 0.05);
    y2.set(offsetY * 0.05);
    x3.set(offsetX * 0.15);
    y3.set(offsetY * 0.15);
  };

  return (
    <div className="relative h-[200vh] w-screen">
      <div
        className="sticky top-0 flex h-screen w-screen items-center justify-center leading-[92%] font-extrabold tracking-tight"
        onMouseMove={(e) => manageMouseMove(e)}
      >
        <h1 className="text-step-8 absolute z-20">ABOUT DNM</h1>

        {/* Plane 1 */}
        <motion.div
          className="absolute h-screen w-screen opacity-30 brightness-70"
          //   ref={plane1}
          style={{ x: x1, y: y1 }}
        >
          <img
            src="https://picsum.photos/id/1015/800/500"
            alt=""
            className="absolute top-[12%] left-[10%] h-44"
          />
          <img
            src="https://picsum.photos/id/1027/400/700"
            alt=""
            className="absolute top-[15%] left-[85%] h-56"
          />
          <img
            src="https://picsum.photos/id/1035/600/600"
            alt=""
            className="absolute top-[60%] left-[58%] h-40"
          />
        </motion.div>

        {/* Plane 2 */}
        <motion.div
          className="absolute h-screen w-screen opacity-80 brightness-90"
          style={{ x: x2, y: y2 }}
        >
          <img
            src="https://picsum.photos/id/1043/500/800"
            alt=""
            className="absolute top-[8%] left-[55%] h-52"
          />
          <img
            src="https://picsum.photos/id/1052/900/500"
            alt=""
            className="absolute top-[60%] left-[8%] h-44"
          />
          <img
            src="https://picsum.photos/id/1069/600/600"
            alt=""
            className="absolute top-[72%] left-[70%] h-36"
          />
        </motion.div>

        {/* Plane 3 */}
        <motion.div
          className="absolute h-screen w-screen"
          style={{ x: x3, y: y3 }}
        >
          <img
            src="https://picsum.photos/id/1074/700/450"
            alt=""
            className="absolute top-[18%] left-[20%] h-40"
          />
          <img
            src="https://picsum.photos/id/1084/450/750"
            alt=""
            className="absolute top-[55%] left-[80%] h-56"
          />
          <img
            src="https://picsum.photos/id/109/550/550"
            alt=""
            className="absolute top-[75%] left-[30%] h-38"
          />
        </motion.div>
      </div>
    </div>
  );
}

export default FloatingImageGallery;
