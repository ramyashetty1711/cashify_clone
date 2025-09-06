import React, { useEffect, useState } from "react";
import {
  FaMobileAlt,
  FaTabletAlt,
  FaLaptop,
  FaHeadphones,
  FaCamera,
  FaGamepad,
} from "react-icons/fa";

const services = [
  { icon: <FaMobileAlt size={28} />, title: "Smartphones" },
  { icon: <FaTabletAlt size={28} />, title: "Tablets" },
  { icon: <FaLaptop size={28} />, title: "Laptops" },
  { icon: <FaHeadphones size={28} />, title: "Accessories" },
  { icon: <FaCamera size={28} />, title: "Cameras" },
  { icon: <FaGamepad size={28} />, title: "Gaming Devices" },
];

const FeaturedServices = () => {
  const [radius, setRadius] = useState(180);

  // Adjust radius based on screen width (responsive)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setRadius(120); // Mobile
      } else if (window.innerWidth < 1024) {
        setRadius(180); // Tablet
      } else {
        setRadius(260); // Desktop
      }
    };

    handleResize(); // run on mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section className="relative py-24 bg-gradient-to-br from-[var(--third)]/20 via-white to-[var(--third)]/10 ">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
        {/* Heading */}
        <h2 className="text-4xl lg:text-5xl font-extrabold text-[var(--primary)] mb-6">
          Our Services
        </h2>
        <p className="text-lg text-[var(--secondary)] max-w-2xl mx-auto mb-16">
          We cover a wide range of gadgets. Here’s what you can sell with us:
        </p>

        {/* Circular Layout */}
        <div className="relative w-[320px] h-[320px] sm:w-[450px] sm:h-[450px] lg:w-[650px] lg:h-[650px] mx-auto">
          {/* Center Hub */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-36 h-36 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--third)] flex items-center justify-center shadow-xl text-white font-bold text-lg">
              Sell Devices
            </div>
          </div>

          {/* Services Positioned Around Circle */}
          {services.map((service, idx) => {
            const angle = (idx / services.length) * (2 * Math.PI); // radians
            const x = radius * Math.cos(angle);
            const y = radius * Math.sin(angle);

            return (
              <div
                key={idx}
                className="absolute flex flex-col items-center text-center transition-transform hover:scale-110"
                style={{
                  left: `calc(50% + ${x}px)`,
                  top: `calc(50% + ${y}px)`,
                  transform: "translate(-50%, -50%)",
                }}
              >
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--third)] shadow-lg text-white mb-2">
                  {service.icon}
                </div>
                <p className="text-sm font-medium text-[var(--secondary)]">
                  {service.title}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Decorative Glows */}
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-[var(--primary)]/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-[var(--third)]/20 rounded-full blur-3xl"></div>
    </section>
  );
};

export default FeaturedServices;
