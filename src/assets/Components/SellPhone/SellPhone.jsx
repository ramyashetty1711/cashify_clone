import React, { useState, useEffect } from "react";
import Step1DeviceDetails from "./Step1DeviceDetails";
import Step3Condition from "./Step2Condition";
import Step4Accessories from "./Step3Accessories";
import Step5Contact from "./Step4Contact";
import Step2LoginPrice from "./Step2LoginPrice";
import DeviceConditionForm from "./DeviceConditionForm";

// Storage options
const storageOptions = [
  { value: "64GB", label: "64GB", price: 1000 },
  { value: "128GB", label: "128GB", price: 1500 },
  { value: "256GB", label: "256GB", price: 2000 },
];

const SellPhone = () => {
  const [step, setStep] = useState(1);
  const [brand, setBrand] = useState(null);
  const [selectedModel, setSelectedModel] = useState(null);
  const [storage, setStorage] = useState(null);

  const [condition, setCondition] = useState({
    screen: null,
    battery: null,
    water: null,
    buttons: null,
  });

  const [accessories, setAccessories] = useState({ box: false, charger: false });
  const [contact, setContact] = useState({ name: "", phone: "", email: "" });
  const [estimatedPrice, setEstimatedPrice] = useState(0);

  // Scroll to top whenever step changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [step]);

  // Price calculation
  useEffect(() => {
    if (step >= 3 && storage) {
      const yesCount = Object.values(condition).filter((c) => c === "yes").length;

      let discount = 0;
      if (yesCount === 4) discount = 0;
      else if (yesCount >= 3) discount = -100;
      else if (yesCount >= 2) discount = -300;
      else discount = -500;

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

      {/* Step Components */}
      {step === 1 && (
        <Step1DeviceDetails
          brand={brand}
          setBrand={setBrand}
          selectedModel={selectedModel}
          setSelectedModel={setSelectedModel}
          storage={storage}
          setStorage={setStorage}
          storageOptions={storageOptions}
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
  <DeviceConditionForm
    onNext={(answers) => {
      // optionally save answers to condition or state here
      setCondition((prev) => ({ ...prev, ...answers }));
      nextStep(); // move to next step
    }}
    onBack={prevStep}
  />
)}


      {step === 4 && (
        <Step3Condition
          condition={condition}
          setCondition={setCondition}
          nextStep={nextStep}
          prevStep={prevStep}
          estimatedPrice={estimatedPrice}
        />
      )}

      {step === 5 && (
        <Step4Accessories
          accessories={accessories}
          setAccessories={setAccessories}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      )}

      
    </div>
  );
};

export default SellPhone;
