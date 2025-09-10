import React, { useState } from "react";
import ScreenCondition from "./ScreenCondition";
import BatteryCondition from "./BatteryCondition";
import ButtonsCondition from "./ButtonsCondition";

const deviceParts = [
  { key: "screen", name: "Screen" },
  { key: "battery", name: "Battery" },
  { key: "buttons", name: "Buttons" },
];

const Step2Condition = ({ condition, setCondition, nextStep, prevStep }) => {
  const [activePart, setActivePart] = useState(deviceParts[0].key);

  // Check only the parts we are testing
  const detailsDone = deviceParts.every((part) => condition[part.key] !== null);

  // Handles moving to next part or next step
  const handleNextPart = () => {
    const currentIndex = deviceParts.findIndex((part) => part.key === activePart);
    if (currentIndex < deviceParts.length - 1) {
      setActivePart(deviceParts[currentIndex + 1].key);
    } else {
      // All parts completed, go to next step
      nextStep();
    }
  };

  const renderPart = () => {
    switch (activePart) {
      case "screen":
        return <ScreenCondition setCondition={setCondition} onNext={handleNextPart} />;
      case "battery":
        return <BatteryCondition setCondition={setCondition} onNext={handleNextPart} />;
      case "buttons":
        return <ButtonsCondition setCondition={setCondition} onNext={handleNextPart} />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-center text-[var(--primary)]">
        2. Device Condition - Guided Test
      </h2>

      {/* Tabs */}
      <div className="flex justify-center gap-4 mb-4">
        {deviceParts.map((part) => (
          <button
            key={part.key}
            onClick={() => setActivePart(part.key)}
            className={`px-4 py-2 rounded-t-xl font-medium border-b-2 ${
              activePart === part.key
                ? "border-[var(--primary)] text-[var(--primary)]"
                : "border-transparent text-gray-500 hover:text-[var(--primary)]"
            } transition`}
          >
            {part.name}
          </button>
        ))}
      </div>

      {/* Dynamic Content */}
      <div className="p-6 border rounded-b-xl bg-white shadow-sm">{renderPart()}</div>

      {/* Navigation */}
      <div className="flex justify-between mt-4">
        <button
          type="button"
          onClick={prevStep}
          className="px-6 py-2 rounded-xl border border-[var(--third)] hover:bg-[var(--third)]/20 transition text-sm"
        >
          Back
        </button>

        <button
          type="button"
          onClick={handleNextPart}
          disabled={!detailsDone}
          className="bg-[var(--primary)] text-white px-6 py-2 rounded-xl hover:scale-105 transition transform disabled:opacity-50 text-sm"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Step2Condition;
