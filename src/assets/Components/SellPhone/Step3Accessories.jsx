import React from "react";

const Step3Accessories = ({ accessories, setAccessories, nextStep, prevStep }) => {
  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-xl font-semibold">3. Accessories & Questions</h2>

      {/* Accessories checkboxes */}
      <div className="flex flex-col gap-4">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={accessories.box}
            onChange={() =>
              setAccessories({ ...accessories, box: !accessories.box })
            }
          />
          Includes Box (+₹50)
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={accessories.charger}
            onChange={() =>
              setAccessories({ ...accessories, charger: !accessories.charger })
            }
          />
          Includes Charger (+₹50)
        </label>
      </div>

      {/* Navigation buttons */}
      <div className="flex justify-between mt-4">
        <button
          className="px-6 py-3 rounded-xl border border-[var(--third)] hover:bg-[var(--third)]/20 transition"
          onClick={prevStep}
        >
          Back
        </button>
        <button
          className="bg-[var(--primary)] text-white px-6 py-3 rounded-xl hover:scale-105 transition transform"
          onClick={nextStep}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Step3Accessories;
