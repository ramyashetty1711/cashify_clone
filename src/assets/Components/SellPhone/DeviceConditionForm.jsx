import React, { useState } from "react";

const deviceQuestions = [
  {
    key: "calls",
    question: "Are you able to make and receive calls?",
    description: "Check your device for cellular network connectivity issues.",
  },
  {
    key: "touchScreen",
    question: "Is your device's touch screen working properly?",
    description: "Check the touch screen functionality of your phone.",
  },
  {
    key: "originalScreen",
    question: "Is your phone's screen original?",
    description:
      "Pick 'Yes' if screen was never changed or was changed by Authorized Service Center. Pick 'No' if screen was changed at local shop.",
  },
];

const DeviceConditionForm = ({ onNext, onBack }) => {
  const [answers, setAnswers] = useState({
    calls: null,
    touchScreen: null,
    originalScreen: null,
  });

  const handleAnswer = (key, value) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const unanswered = Object.entries(answers).filter(([_, val]) => val === null);
    if (unanswered.length > 0) {
      alert("Please answer all questions before proceeding.");
      return;
    }

    console.log("Device Condition Answers:", answers);
    if (onNext && typeof onNext === "function") onNext(answers);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-6 flex flex-col gap-6">
      <h2 className="text-2xl md:text-3xl font-bold text-center text-[var(--primary)]">
        Tell us more about your device
      </h2>
      <p className="text-center text-[var(--secondary)]">
        Please answer a few questions about your device.
      </p>

      <div className="flex flex-col gap-5">
        {deviceQuestions.map((q) => (
          <div
            key={q.key}
            className="p-5 bg-[var(--tertiary)] border border-[var(--secondary)] rounded-2xl shadow-md"
          >
            <p className="font-semibold text-[var(--primary)] mb-2">{q.question}</p>
            <p className="text-sm text-[var(--secondary)] mb-3">{q.description}</p>
            <div className="flex gap-4">
              <button
                type="button"
                className={`flex-1 py-3 rounded-lg font-medium transition-all ${
                  answers[q.key] === true
                    ? "bg-[var(--primary)] text-white shadow-lg"
                    : "bg-[var(--secondary)] text-white hover:bg-[var(--primary)]"
                }`}
                onClick={() => handleAnswer(q.key, true)}
              >
                Yes
              </button>
              <button
                type="button"
                className={`flex-1 py-3 rounded-lg font-medium transition-all ${
                  answers[q.key] === false
                    ? "bg-[var(--primary)] text-white shadow-lg"
                    : "bg-[var(--secondary)] text-white hover:bg-[var(--primary)]"
                }`}
                onClick={() => handleAnswer(q.key, false)}
              >
                No
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-6">
        <button
          type="button"
          onClick={onBack}
          className="px-6 py-3 rounded-xl font-semibold border border-[var(--secondary)] text-[var(--primary)] hover:bg-[var(--secondary)] hover:text-white transition-all"
        >
          Back
        </button>

        <button
          type="submit"
          className="px-6 py-3 rounded-xl font-semibold bg-[var(--primary)] text-white hover:bg-[var(--secondary)] transition-all"
        >
          Next
        </button>
      </div>
    </form>
  );
};

export default DeviceConditionForm;
