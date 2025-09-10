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
    <div className="max-w-4xl mx-auto my-16 px-4">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
        Frequently Asked Questions
      </h2>

      <div className="space-y-4 "   >
        {faqData.map((item, index) => (
          <div
            key={index}
            className="bg-white p-2 rounded-lg shadow border border-gray-200 overflow-hidden"
          >
            {/* Question */}
            <button
              onClick={() => toggleIndex(index)}
              className="w-full flex justify-between items-center px-6 py-4 text-left text-lg font-medium text-gray-800 hover:bg-gray-50 transition-colors"
            >
              <span>{item.question}</span>

              {/* Plus/Minus */}
              <span className={`transition-transform  duration-300 ${activeIndex === index ? "rotate-45" : "-rotate-135"} inline-block w-3 h-3 border-b-2 border-r-2 border-blue-600`} />
            </button>

            {/* Answer */}
            <AnimatePresence initial={false}>
              {activeIndex === index && (
                <motion.div
                  key="content"
                  initial={{ opacity: 0, scaleY: 0 }}
                  animate={{ opacity: 1, scaleY: 1 }}
                  exit={{ opacity: 0, scaleY: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="px-6 py-4 text-gray-700 text-base bg-gray-50 origin-top"
                  style={{ transformOrigin: "top" }}
                >
                  {item.answer}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQAccordion;
