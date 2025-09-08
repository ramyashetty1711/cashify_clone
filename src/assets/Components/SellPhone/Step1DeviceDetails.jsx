import React from "react";
import iPhone13Img from "../../PhoneImages/iphone13.png";
import iPhone14Img from "../../PhoneImages/iphone14.png";
import AppleLogo from "../../PhoneImages/apple-logo.png";
import SamsungLogo from "../../PhoneImages/samsung-logo.png";
import OnePlusLogo from "../../PhoneImages/oneplus-logo.png";

// Brand options with logos
const brands = [
  { value: "Apple", label: "Apple", logo: AppleLogo },
  { value: "Samsung", label: "Samsung", logo: SamsungLogo },
  { value: "OnePlus", label: "OnePlus", logo: OnePlusLogo },
];

// Models by brand
const modelsByBrand = {
  Apple: [
    { value: "iPhone 13", label: "iPhone 13" },
    { value: "iPhone 14", label: "iPhone 14" },
  ],
  Samsung: [
    { value: "Galaxy S21", label: "Galaxy S21" },
    { value: "Galaxy S22", label: "Galaxy S22" },
  ],
  OnePlus: [
    { value: "OnePlus 10", label: "OnePlus 10" },
    { value: "OnePlus 11", label: "OnePlus 11" },
  ],
};

// Model images
const modelImages = {
  "iPhone 13": iPhone13Img,
  "iPhone 14": iPhone14Img,
};

const Step1DeviceDetails = ({
  brand,
  setBrand,
  selectedModel,
  setSelectedModel,
  storage,
  setStorage,
  color,
  setColor,
  storageOptions,
  colors,
  nextStep,
}) => {
  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-2xl font-bold text-[var(--primary)] text-center" >1. Device Details</h2>

      {/* Brand Selection with Logo */}
      <div>
        <h3 className="font-semibold mb-2">Choose a Brand</h3>
        <div className="flex gap-4 flex-wrap">
          {brands.map((b) => (
            <div
              key={b.value}
              className={`p-3 rounded-xl cursor-pointer transition-all duration-300 transform 
                ${brand?.value === b.value
                  ? "border-2 border-[var(--primary)] bg-[var(--primary)]/10 shadow-lg scale-105"
                  : "border border-[var(--third)] hover:border-[var(--primary)] hover:shadow-md"
                }`}
              onClick={() => {
                setBrand(b);
                setSelectedModel(null);
                setStorage(null);
                setColor(null);
              }}
            >
              <img
                src={b.logo}
                alt={b.label}
                className="w-20 h-20 object-contain mx-auto"
              />
              <p
                className={`text-center mt-2 font-medium ${
                  brand?.value === b.value
                    ? "text-[var(--primary)]"
                    : "text-[var(--secondary)]"
                }`}
              >
                {b.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Model Images */}
      {brand && (
        <div>
          <h3 className="font-semibold mb-2">Choose your {brand.label} Model</h3>
          <div className="flex gap-4 flex-wrap">
            {modelsByBrand[brand.value].map((m) => (
              <div
                key={m.value}
                className={`p-3 rounded-xl cursor-pointer transition-all duration-300 transform 
                  ${selectedModel?.value === m.value
                    ? "border-2 border-[var(--primary)] bg-[var(--primary)]/10 shadow-lg scale-105"
                    : "border border-[var(--third)] hover:border-[var(--primary)] hover:shadow-md"
                  }`}
                onClick={() => setSelectedModel(m)}
              >
                <img
                  src={modelImages[m.value]}
                  alt={m.label}
                  className="w-32 h-32 object-contain"
                />
                <p
                  className={`text-center mt-2 font-medium ${
                    selectedModel?.value === m.value
                      ? "text-[var(--primary)]"
                      : "text-[var(--secondary)]"
                  }`}
                >
                  {m.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Storage Options */}
      {selectedModel && (
        <div className="mt-4">
          <h3 className="font-semibold mb-2">Select Storage</h3>
          <div className="flex gap-4">
            {storageOptions.map((s) => (
              <label key={s.value} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="storage"
                  value={s.value}
                  checked={storage?.value === s.value}
                  onChange={() => setStorage(s)}
                />
                {s.label}
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Color Options */}
      {selectedModel && (
        <div className="mt-4">
          <h3 className="font-semibold mb-2">Select Color</h3>
          <div className="flex gap-4">
            {colors.map((c) => (
              <label key={c.value} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="color"
                  value={c.value}
                  checked={color?.value === c.value}
                  onChange={() => setColor(c)}
                />
                {c.label}
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Next Button */}
      <div className="flex justify-end mt-4">
        <button
          className="bg-[var(--primary)] text-white px-6 py-3 rounded-xl hover:scale-105 transition transform"
          onClick={nextStep}
          disabled={!brand || !selectedModel || !storage || !color}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Step1DeviceDetails;
