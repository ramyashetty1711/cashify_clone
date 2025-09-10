import React from "react";
import { FaMobileAlt, FaMoneyBillWave, FaTruck, FaCheckCircle } from "react-icons/fa";

const steps = [
  {
    icon: <FaMobileAlt size={40} />,
    title: "Select Your Device",
    description: "Choose your smartphone, tablet, or laptop to sell quickly."
  },
  {
    icon: <FaMoneyBillWave size={40} />,
    title: "Get Instant Quote",
    description: "Receive a fair and transparent price instantly for your device."
  },
  {
    icon: <FaTruck size={40} />,
    title: "Schedule Pickup",
    description: "We pick up your device at your convenience, hassle-free."
  },
  {
    icon: <FaCheckCircle size={40} />,
    title: "Get Paid Instantly",
    description: "Get your payment securely and quickly, on the spot."
  }
];

const HowItWorks = () => {
  return (
    <section className="relative py-24 bg-gradient-to-br from-[var(--third)]/20 via-white to-[var(--secondary)]/10 overflow-hidden ">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center relative z-10">
        {/* Heading */}
        <h2 className="text-2xl lg:text-4xl font-extrabold text-[var(--primary)] mb-4 tracking-tight">
          How It Works
        </h2>
        <p className="text-lg text-[var(--secondary)] max-w-2xl mx-auto mb-16">
          Selling your old devices is now faster, safer, and smarter. Just follow these simple steps.
        </p>

        {/* Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl p-8 flex flex-col items-center text-center transition-transform transform hover:-translate-y-2 hover:bg-gradient-to-br hover:from-[var(--primary)]/10 hover:to-[var(--third)]/10"
            >
              <div className="flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--third)] text-white mb-6 shadow-md group-hover:scale-110 transition-transform">
                {step.icon}
              </div>
              <h3 className="font-semibold text-xl text-[var(--primary)] mb-3">{step.title}</h3>
              <p className="text-[var(--secondary)] text-sm">{step.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Decorative Gradient Background Glow */}
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-[var(--primary)]/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-[var(--third)]/20 rounded-full blur-3xl"></div>
    </section>
  );
};

export default HowItWorks;
