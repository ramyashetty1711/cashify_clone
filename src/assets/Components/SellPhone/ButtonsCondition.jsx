import React from "react";
import ButtonsImg from "../../PhoneImages/buttons.png";

const ButtonsCondition = ({ setCondition, onNext }) => {
  const handleAnswer = (answer) => {
    let result;
    if (answer === "yes") result = { value: "Excellent", discount: 0 };
    if (answer === "maybe") result = { value: "Loose", discount: -200 };
    if (answer === "no") result = { value: "Not Working", discount: -500 };

    setCondition((prev) => ({ ...prev, buttons: result }));
    onNext();
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <img src={ButtonsImg} alt="Buttons" className="w-20 h-20" />
      <p className="text-gray-700 font-medium text-center">
        Press power and volume buttons. Are they working properly?
      </p>
      <div className="flex gap-3">
        <button
          onClick={() => handleAnswer("yes")}
          className="px-4 py-2 bg-green-500 text-white rounded-md"
        >
          Yes
        </button>
        <button
          onClick={() => handleAnswer("maybe")}
          className="px-4 py-2 bg-yellow-400 text-white rounded-md"
        >
          Maybe
        </button>
        <button
          onClick={() => handleAnswer("no")}
          className="px-4 py-2 bg-red-500 text-white rounded-md"
        >
          No
        </button>
      </div>
    </div>
  );
};

export default ButtonsCondition;
