import React from "react";
import {
  FaShieldAlt,
  FaDollarSign,
  FaRecycle,
  FaHeadset,
} from "react-icons/fa";

const features = [
  {
    icon: <FaShieldAlt size={28} />,
    title: "Fast & Secure",
    description: "Quick cash in 24 hours with secure transactions.",
  },
  {
    icon: <FaDollarSign size={28} />,
    title: "Best Price Guarantee",
    description: "We offer the most competitive prices for your devices.",
  },
  {
    icon: <FaRecycle size={28} />,
    title: "Eco-Friendly",
    description: "Recycle your old devices responsibly and safely.",
  },
  {
    icon: <FaHeadset size={28} />,
    title: "24/7 Support",
    description: "Our team is always ready to assist you anytime.",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="relative py-24 bg-gradient-to-b from-[var(--third)]/10 via-white to-[var(--third)]/5">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        {/* Heading */}
        <h2 className="text-3xl lg:text-4xl font-extrabold text-center text-[var(--primary)] mb-6">
          Why Choose Us
        </h2>
        <p className="text-lg text-center text-[var(--secondary)]/90 mb-16 max-w-2xl mx-auto">
          We make selling your old devices simple, safe, and rewarding.
        </p>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-1/2 top-0 h-full w-1 bg-gradient-to-b from-[var(--primary)] to-[var(--third)] transform -translate-x-1/2"></div>

          <div className="space-y-16">
            {features.map((feature, idx) => {
              const isLeft = idx % 2 === 0;
              return (
                <div
                  key={idx}
                  className={`relative flex items-center ${
                    isLeft ? "justify-start" : "justify-end"
                  } w-full`}
                >
                  {/* Content Box */}
                  <div
                    className={`w-full sm:w-5/12 bg-white rounded-2xl shadow-md border-l-4 border-[var(--primary)] p-6 hover:shadow-xl transition-all duration-300 ${
                      isLeft ? "text-right" : "text-left"
                    }`}
                  >
                    <div
                      className={`flex items-center gap-3 mb-3 ${
                        isLeft ? "justify-end sm:justify-end" : "justify-start"
                      }`}
                    >
                      <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--third)] text-white shadow-md">
                        {feature.icon}
                      </div>
                      <h3 className="text-lg font-bold text-[var(--primary)]">
                        {feature.title}
                      </h3>
                    </div>
                    <p className="text-[var(--secondary)]/80 text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>

                  {/* Dot on the timeline */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--third)] border-4 border-white shadow-md"></div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
