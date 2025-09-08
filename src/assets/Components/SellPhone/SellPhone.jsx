import React, { useState, useEffect } from "react";
import Step1DeviceDetails from "./Step1DeviceDetails";
import Step3Condition from "./Step2Condition";
import Step4Accessories from "./Step3Accessories";
import Step5Contact from "./Step4Contact";
import Step2LoginPrice from "./Step2LoginPrice";

// Storage, color, and condition data
const storageOptions = [
  { value: "64GB", label: "64GB", price: 1000 },
  { value: "128GB", label: "128GB", price: 1500 },
  { value: "256GB", label: "256GB", price: 2000 },
];

const colors = [
  { value: "Black", label: "Black" },
  { value: "White", label: "White" },
  { value: "Blue", label: "Blue" },
];

const SellPhone = () => {
  const [step, setStep] = useState(1);
  const [brand, setBrand] = useState(null);
  const [selectedModel, setSelectedModel] = useState(null);
  const [storage, setStorage] = useState(null);
  const [color, setColor] = useState(null);

  // ✅ Initialize condition as an object
  const [condition, setCondition] = useState({
    screen: null,
    battery: null,
    water: null,
    buttons: null,
  });

  const [accessories, setAccessories] = useState({ box: false, charger: false });
  const [contact, setContact] = useState({ name: "", phone: "", email: "" });
  const [estimatedPrice, setEstimatedPrice] = useState(0);

  // ✅ Price calculation logic
  useEffect(() => {
    if (step >= 3 && storage) { // condition starts from step 3 now
      const yesCount = Object.values(condition).filter((c) => c === "yes").length;

      let discount = 0;
      if (yesCount === 4) discount = 0; // Excellent
      else if (yesCount >= 3) discount = -100; // Good
      else if (yesCount >= 2) discount = -300; // Average
      else discount = -500; // Poor

      let price = storage.price + discount;

      if (accessories.box) price += 50;
      if (accessories.charger) price += 50;

      setEstimatedPrice(price);
    }
  }, [storage, condition, accessories, step]);

  const nextStep = () => setStep((s) => s + 1);
  const prevStep = () => setStep((s) => s - 1);

  return (
    <div className="max-w-5xl mx-auto px-6 py-12 text-[var(--secondary)]">
      <h1 className="text-3xl lg:text-4xl font-extrabold text-center mb-8 text-[var(--primary)]">
        Sell Your Phone in 5 Easy Steps
      </h1>

      {/* Step Indicators */}
      <div className="flex justify-center gap-4 mb-12">
        {[1, 2, 3, 4, 5].map((s) => (
          <div
            key={s}
            className={`w-10 h-10 flex items-center justify-center rounded-full font-bold text-white transition-all
              ${step === s ? "bg-[var(--primary)] scale-110" : "bg-[var(--third)]/60"}`}
          >
            {s}
          </div>
        ))}
      </div>

      {/* Step Components */}
      {step === 1 && (
        <Step1DeviceDetails
          brand={brand}
          setBrand={setBrand}
          selectedModel={selectedModel}
          setSelectedModel={setSelectedModel}
          storage={storage}
          setStorage={setStorage}
          color={color}
          setColor={setColor}
          storageOptions={storageOptions}
          colors={colors}
          nextStep={nextStep}
        />
      )}

      {step === 2 && (
        <Step2LoginPrice
          nextStep={nextStep}
          prevStep={prevStep}
        />
      )}

      {step === 3 && (
        <Step3Condition
          condition={condition}
          setCondition={setCondition}
          nextStep={nextStep}
          prevStep={prevStep}
          estimatedPrice={estimatedPrice}
        />
      )}

      {step === 4 && (
        <Step4Accessories
          accessories={accessories}
          setAccessories={setAccessories}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      )}

      {step === 5 && (
        <Step5Contact
          contact={contact}
          setContact={setContact}
          estimatedPrice={estimatedPrice}
          prevStep={prevStep}
        />
      )}
    </div>
  );
};

export default SellPhone;
