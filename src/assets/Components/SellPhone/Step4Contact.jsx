import React, { useState } from "react";

const Step4Contact = ({ prevStep, phone, condition, accessories }) => {
  const [contact, setContact] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    console.log("Form submitted:", { phone, condition, accessories, contact });
  };

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-xl font-semibold">4. Contact Details & Confirm</h2>

      {!submitted ? (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={contact.name}
            onChange={handleChange}
            required
            className="border px-4 py-2 rounded-xl"
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={contact.email}
            onChange={handleChange}
            required
            className="border px-4 py-2 rounded-xl"
          />
          <input
            type="tel"
            name="phone"
            placeholder="Your Phone"
            value={contact.phone}
            onChange={handleChange}
            required
            className="border px-4 py-2 rounded-xl"
          />

          {/* Navigation buttons */}
          <div className="flex justify-between mt-4">
            <button
              type="button"
              onClick={prevStep}
              className="px-6 py-3 rounded-xl border border-[var(--third)] hover:bg-[var(--third)]/20 transition"
            >
              Back
            </button>
            <button
              type="submit"
              className="bg-[var(--primary)] text-white px-6 py-3 rounded-xl hover:scale-105 transition transform"
            >
              Submit
            </button>
          </div>
        </form>
      ) : (
        <div className="text-center space-y-4">
          <h3 className="text-lg font-semibold text-green-600">✅ Success!</h3>
          <p>
            Thank you, <span className="font-medium">{contact.name}</span>.
            We’ll contact you soon regarding your{" "}
            <span className="font-medium">{phone}</span>.
          </p>
          <p className="text-gray-600">
            Condition: <strong>{condition}</strong> <br />
            Accessories:{" "}
            <strong>
              {accessories.box ? "Box " : ""}
              {accessories.charger ? "Charger" : ""}
              {!accessories.box && !accessories.charger && "None"}
            </strong>
          </p>
        </div>
      )}
    </div>
  );
};

export default Step4Contact;
