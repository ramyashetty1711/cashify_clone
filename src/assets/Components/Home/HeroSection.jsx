import React from "react";
import HeroImage from "../../../assets/image.png";
import { FaShieldAlt, FaDollarSign, FaRecycle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const features = [
  {
    icon: <FaShieldAlt size={24} />,
    title: "Fast & Secure",
    text: "Quick cash in 24 hours with secure transactions.",
  },
  {
    icon: <FaDollarSign size={24} />,
    title: "Best Prices",
    text: "Get competitive prices for all your devices.",
  },
  {
    icon: <FaRecycle size={24} />,
    title: "Eco-Friendly",
    text: "Recycle your old devices responsibly and safely.",
  },
];

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-[var(--primary)]/60 via-[var(--third)]/40 to-[var(--primary)]/60"></div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 flex flex-col-reverse lg:flex-row items-center gap-12 py-16 lg:py-20">
        {/* Left Content */}
        <div className="flex-1 flex flex-col gap-6 text-white z-10">
          <h1 className="text-4xl lg:text-5xl font-extrabold leading-tight">
            Turn Your Old Devices Into Instant Cash
          </h1>
          <p className="text-lg text-white/90">
            Sell your smartphone, tablet, or laptop quickly and securely. Get instant quotes and cash in just 24 hours.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <button
              onClick={() => navigate("/sell-phone")}
              className="bg-[var(--primary)] text-white font-semibold px-6 py-3 rounded-xl shadow-xl hover:shadow-2xl transition transform hover:scale-105"
            >
              Sell Now
            </button>
            <button className="border-2 border-white text-white font-semibold px-6 py-3 rounded-xl hover:bg-white hover:text-[var(--primary)] transition transform hover:scale-105">
              Learn More
            </button>
          </div>

          {/* Feature Cards */}
          <div className="mt-10 flex flex-col sm:flex-row gap-6">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="flex-1 flex flex-col items-start gap-3 p-6 rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 shadow-lg hover:shadow-2xl transition transform hover:scale-101 cursor-pointer"
              >
                <div className="p-4 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--third)] text-white shadow-md flex items-center justify-center">
                  {feature.icon}
                </div>
                <h3 className="text-white font-bold text-lg">{feature.title}</h3>
                <p className="text-white/80 text-sm">{feature.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Hero Image */}
        <div className="flex-1 flex justify-center lg:justify-end z-10 animate-float">
          <img
            src={HeroImage}
            alt="Hero Devices"
            className="w-full max-w-md lg:max-w-lg object-contain drop-shadow-2xl"
          />
        </div>
      </div>

      {/* Tailwind Custom Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
        .animate-float { animation: float 3s ease-in-out infinite; }
      `}</style>
    </section>
  );
};

export default HeroSection;
