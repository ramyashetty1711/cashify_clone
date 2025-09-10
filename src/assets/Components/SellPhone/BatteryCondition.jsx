import React, { useState } from "react";
import BatteryImg from "../../PhoneImages/battery.png";

const BatteryCondition = ({ setCondition, onNext }) => {
  const [selected, setSelected] = useState("");

  const handleAnswer = (answer) => {
    let result;
    if (answer === "yes") result = { value: "Excellent", discount: 0 };
    if (answer === "maybe") result = { value: "Weak", discount: -300 };
    if (answer === "no") result = { value: "Damaged", discount: -700 };

    setSelected(answer);
    setCondition((prev) => ({ ...prev, battery: result }));

    // Optional: proceed after a short delay to show highlight
    setTimeout(() => {
      onNext();
    }, 300);
  };

  const getButtonClass = (answer) =>
    `px-4 py-2 rounded-md text-white transition ${
      selected === answer
        ? "ring-2 ring-offset-2 ring-blue-500 scale-105"
        : answer === "yes"
        ? "bg-green-500 hover:bg-green-600"
        : answer === "maybe"
        ? "bg-yellow-400 hover:bg-yellow-500"
        : "bg-red-500 hover:bg-red-600"
    }`;

  return (
    <div className="flex flex-col items-center gap-4">
      <img src={BatteryImg} alt="Battery" className="w-20 h-20" />
      <p className="text-gray-700 font-medium text-center">
        Plug in your charger. Did charging start normally?
      </p>
      <div className="flex gap-3">
        <button onClick={() => handleAnswer("yes")} className={getButtonClass("yes")}>
          Yes
        </button>
        <button onClick={() => handleAnswer("maybe")} className={getButtonClass("maybe")}>
          Maybe
        </button>
        <button onClick={() => handleAnswer("no")} className={getButtonClass("no")}>
          No
        </button>
      </div>
    </div>
  );
};

export default BatteryCondition;
