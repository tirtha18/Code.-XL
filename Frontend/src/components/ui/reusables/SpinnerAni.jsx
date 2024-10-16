import { useSpring, animated } from "@react-spring/web";

export default function Spinner() {
  const spinnerAnimation = useSpring({
    from: { transform: "rotate(0deg)" },
    to: { transform: "rotate(360deg)" },
    loop: true,
    config: { duration: 1000 },
  });

  return (
    <div className="flex items-center justify-center fixed inset-0 bg-opacity-50 bg-gray-700 z-50">
      <animated.div
        style={spinnerAnimation}
        className="w-16 h-16 border-4 border-white border-t-transparent border-solid rounded-full"
      ></animated.div>
    </div>
  );
}