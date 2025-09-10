import React, { useEffect, useRef, useState } from "react";
import { FaDollarSign, FaCheckCircle, FaRecycle, FaMobileAlt } from "react-icons/fa";

const features = [
  { icon: <FaDollarSign size={28} />, title: "Affordable Price", description: "Enjoy the best features without the premium price tag." },
  { icon: <FaCheckCircle size={28} />, title: "Trusted Quality", description: "Each device is tested and certified to work like new." },
  { icon: <FaRecycle size={28} />, title: "Eco Friendly", description: "Choosing refurbished means reducing E-waste and helping the planet." },
  { icon: <FaMobileAlt size={28} />, title: "Endless Options", description: "Find your favorite brands and models that fit your budget and style." },
];

const WhyChooseUs = () => {
  const itemRefs = useRef([]);
  const [visibleItems, setVisibleItems] = useState({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleItems((prev) => ({ ...prev, [entry.target.dataset.index]: true }));
          }
        });
      },
      { threshold: 0.3 }
    );

    itemRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      itemRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  return (
    <section className="relative py-24 bg-gradient-to-b from-[var(--third)]/10 via-white to-[var(--third)]/5 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <h2 className="text-2xl lg:text-4xl text-center font-extrabold text-[var(--primary)] mb-4 tracking-tight">
          Why Certified AS IS Mobile Phones Are a Smart Choice?
        </h2>
        <p className="text-lg text-center text-[var(--secondary)]/90 mb-16 max-w-3xl mx-auto">
          Certified AS IS Mobile Phones offer affordable smartphone features without compromising on quality. They provide numerous benefits beyond cost savings. 🌟
        </p>

        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-1/2 top-0 h-full w-1 bg-gradient-to-b from-[var(--primary)] to-[var(--third)] transform -translate-x-1/2"></div>

          <div className="space-y-16">
            {features.map((feature, idx) => {
              const isLeft = idx % 2 === 0;
              return (
                <div
                  key={idx}
                  ref={(el) => (itemRefs.current[idx] = el)}
                  data-index={idx}
                  className={`relative flex items-center w-full timeline-item ${isLeft ? "justify-start" : "justify-end"}`}
                >
                  <div
                    className={`w-full sm:w-5/12 bg-white rounded-2xl shadow-md border-l-4 border-[var(--primary)] p-6 transition-all duration-700 ${
                      isLeft ? "slide-left" : "slide-right"
                    } ${visibleItems[idx] ? "opacity-100 translate-x-0" : "opacity-0"}`}
                  >
                    <div className={`flex items-center gap-3 mb-3 ${isLeft ? "justify-start sm:justify-start" : "justify-start"}`}>
                      <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--third)] text-white shadow-md">
                        {feature.icon}
                      </div>
                      <h3 className="text-lg font-bold text-[var(--primary)]">{feature.title}</h3>
                    </div>
                    <p className="text-[var(--secondary)]/80 text-sm leading-relaxed">{feature.description}</p>
                  </div>

                  <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--third)] border-4 border-white shadow-md"></div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <style jsx>{`
        .slide-left { transform: translateX(-50px); }
        .slide-right { transform: translateX(50px); }
        .timeline-item .opacity-0 { opacity: 0; }
        .timeline-item .opacity-100 { opacity: 1; transform: translateX(0); }
      `}</style>
    </section>
  );
};

export default WhyChooseUs;