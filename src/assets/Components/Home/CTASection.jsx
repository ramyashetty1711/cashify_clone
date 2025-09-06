import React from "react";
import { useNavigate } from "react-router-dom";

const CTASection = () => {
  const navigate = useNavigate();

  const handleSellNow = () => {
    navigate("/sell-phone"); // navigate to your selling page
  };

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-[var(--third)] via-[var(--secondary)] to-[var(--third)] opacity-90"></div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 text-center flex flex-col items-center gap-6">
        {/* Headline */}
        <h2 className="text-4xl lg:text-5xl font-extrabold text-white animate-fade-up">
          Ready to Sell Your Device?
        </h2>
        <p className="text-lg text-white/90 animate-fade-up delay-100 max-w-2xl">
          Get instant cash for your old smartphones, tablets, and laptops. Fast, safe, and reliable.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 mt-8 animate-fade-up delay-200">
          <button
            onClick={handleSellNow}
            className="bg-[var(--primary)] hover:bg-opacity-90 text-white font-semibold px-8 py-4 rounded-xl shadow-xl transition transform hover:scale-105"
          >
            Sell Now
          </button>
        </div>

        {/* Optional Decorative Icons */}
        <div className="absolute -top-10 -left-10 w-32 h-32 bg-[var(--primary)] rounded-full opacity-20 animate-float-slow"></div>
        <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-[var(--secondary)] rounded-full opacity-20 animate-float-slow delay-200"></div>
      </div>

      {/* Tailwind Custom Animations */}
      <style jsx>{`
        @keyframes fadeUp {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes floatSlow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
        .animate-fade-up { animation: fadeUp 0.8s ease forwards; }
        .animate-float-slow { animation: floatSlow 6s ease-in-out infinite; }
        .delay-100 { animation-delay: 100ms; }
        .delay-200 { animation-delay: 200ms; }
      `}</style>
    </section>
  );
};

export default CTASection;
