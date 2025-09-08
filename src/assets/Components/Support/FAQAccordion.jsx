import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqData = [
  {
    question: "How do I reset my password?",
    answer:
      "Go to the login page, click on 'Forgot Password', and follow the instructions to reset your password.",
  },
  {
    question: "How can I contact support?",
    answer:
      "You can contact us via the support form below or email us directly at support@example.com.",
  },
  {
    question: "Where can I find the user manual?",
    answer:
      "The user manual is available in the 'Resources' section of your account dashboard.",
  },
];

const FAQAccordion = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleIndex = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="max-w-3xl mx-auto mt-16 px-4">
      <h2 className="text-4xl font-extrabold text-center mb-12 text-gray-900">
        Frequently Asked Questions
      </h2>

      <div className="space-y-4">
        {faqData.map((item, index) => (
          <motion.div
            key={index}
            layout
            className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
            whileHover={{ y: -2, boxShadow: "0px 10px 25px rgba(0,0,0,0.08)" }}
            transition={{ duration: 0.3 }}
          >
            {/* Question */}
            <button
              onClick={() => toggleIndex(index)}
              className="w-full flex justify-between items-center px-6 py-5 text-left text-lg font-semibold text-gray-800 hover:bg-gray-50 transition-colors duration-300"
            >
              <span>{item.question}</span>

              {/* Plus/Minus Toggle */}
              <motion.div className="relative w-6 h-6 flex items-center justify-center">
                {/* Horizontal bar (always visible) */}
                <motion.span
                  className="absolute w-6 h-0.5 bg-blue-500 rounded-full"
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                ></motion.span>

                {/* Vertical bar (disappears on open) */}
                <motion.span
                  className="absolute w-0.5 h-6 bg-blue-500 rounded-full origin-center"
                  animate={{ scaleY: activeIndex === index ? 0 : 1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                ></motion.span>
              </motion.div>
            </button>

            {/* Answer */}
            <AnimatePresence>
              {activeIndex === index && (
                <motion.div
                  key="content"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  className="px-6 py-4 text-gray-700 text-base bg-gray-50 border-t border-gray-100"
                >
                  {item.answer}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default FAQAccordion;
