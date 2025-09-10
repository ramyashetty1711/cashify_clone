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
  storageOptions,
  nextStep,
}) => {
  return (
    <div className="flex flex-col gap-8">
      <h2 className="text-3xl font-extrabold text-center text-[var(--primary)]">
        Step 1: Device Details
      </h2>

      {/* Brand Selection with Logo */}
      <div>
        <h3 className="text-lg font-semibold mb-4 text-[var(--secondary)]">
          Choose a Brand
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
          {brands.map((b) => (
            <div
              key={b.value}
              className={`p-6 rounded-2xl cursor-pointer transition-all duration-300 shadow-sm border 
                ${
                  brand?.value === b.value
                    ? "border-[var(--primary)] bg-[var(--primary)]/10 shadow-lg scale-105"
                    : "border-gray-300 hover:border-[var(--primary)] hover:shadow-md"
                }`}
              onClick={() => {
                setBrand(b);
                setSelectedModel(null);
                setStorage(null);
              }}
            >
              <img
                src={b.logo}
                alt={b.label}
                className="w-16 h-16 object-contain mx-auto"
              />
              <p
                className={`text-center mt-3 font-medium ${
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

      {/* Model Selection */}
      {brand && (
        <div>
          <h3 className="text-lg font-semibold mb-4 text-[var(--secondary)]">
            Choose your {brand.label} Model
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
            {modelsByBrand[brand.value].map((m) => (
              <div
                key={m.value}
                className={`p-4 rounded-2xl cursor-pointer transition-all duration-300 shadow-sm border text-center
                  ${
                    selectedModel?.value === m.value
                      ? "border-[var(--primary)] bg-[var(--primary)]/10 shadow-lg scale-105"
                      : "border-gray-300 hover:border-[var(--primary)] hover:shadow-md"
                  }`}
                onClick={() => setSelectedModel(m)}
              >
                <img
                  src={modelImages[m.value] }
                  alt={m.label}
                  className="w-28 h-28 object-contain mx-auto"
                />
                <p
                  className={`mt-3 font-medium ${
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
        <div>
          <h3 className="text-lg font-semibold mb-4 text-[var(--secondary)]">
            Select Storage
          </h3>
          <div className="flex gap-4 flex-wrap">
            {storageOptions.map((s) => (
              <button
                key={s.value}
                className={`px-5 py-2 rounded-full border transition-all duration-300 
                  ${
                    storage?.value === s.value
                      ? "bg-[var(--primary)] text-white border-[var(--primary)]"
                      : "border-gray-400 text-[var(--secondary)] hover:border-[var(--primary)]"
                  }`}
                onClick={() => setStorage(s)}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Next Button */}
      <div className="flex justify-end sticky bottom-4">
        <button
          className="bg-[var(--primary)] text-white px-8 py-3 rounded-xl shadow-md hover:scale-105 transition transform disabled:opacity-50"
          onClick={nextStep}
          disabled={!brand || !selectedModel || !storage}
        >
          Next →
        </button>
      </div>
    </div>
  );
};

export default Step1DeviceDetails;
