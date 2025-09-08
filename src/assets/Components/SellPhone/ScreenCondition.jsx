import React, { useState } from "react";
import ScreenImg from "../../PhoneImages/screen.png";

const screenDamageLevels = [
  { key: "minor", label: "Minor Scratch", img: "/images/screen-minor.png", discount: -100 },
  { key: "smallCrack", label: "Small Crack", img: "/images/screen-small.png", discount: -500 },
  { key: "multiple", label: "Multiple Cracks", img: "/images/screen-multiple.png", discount: -1000 },
  { key: "broken", label: "Broken Screen", img: "/images/screen-broken.png", discount: -2000 },
];

const ScreenCondition = ({ setCondition, onNext }) => {
  const [step, setStep] = useState("initial");

  const handleAnswer = (answer) => {
    if (answer === "yes") {
      setCondition((prev) => ({ ...prev, screen: { value: "Excellent", discount: 0 } }));
      onNext();
    } else {
      setStep("detail");
    }
  };

  const handleDetail = (damage) => {
    setCondition((prev) => ({
      ...prev,
      screen: { value: damage.label, discount: damage.discount },
    }));
    setStep("initial");
    onNext();
  };

  return (
    <div className="flex flex-col items-center gap-4">
      {step === "initial" ? (
        <>
          <img src={ScreenImg} alt="Screen" className="w-20 h-20" />
          <p className="text-gray-700 font-medium text-center">
            Look for cracks, scratches, or dead pixels. Is everything fine?
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => handleAnswer("yes")}
              className="px-4 py-2 bg-green-500 text-white rounded-md"
            >
              Yes
            </button>
            <button
              onClick={() => handleAnswer("no")}
              className="px-4 py-2 bg-red-500 text-white rounded-md"
            >
              No / Maybe
            </button>
          </div>
        </>
      ) : (
        <>
          <p className="font-medium text-gray-700">Select screen damage level:</p>
          <div className="grid grid-cols-4 gap-19">
            {screenDamageLevels.map((damage) => (
              <button
                key={damage.key}
                onClick={() => handleDetail(damage)}
                className="flex flex-col items-center p-3 rounded-lg border hover:shadow-md transition"
              >
                <img src={damage.img} alt={damage.label} className="w-30 h-30 mb-2" />
                <span className="text-sm">{damage.label}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ScreenCondition;
