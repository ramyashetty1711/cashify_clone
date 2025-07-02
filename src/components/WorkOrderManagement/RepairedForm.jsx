import React, { useState } from "react";

export default function RepairedForm() {
  const [formData, setFormData] = useState({
    jobSheetNo: "",
    submissionCategory: "",
    remarks: "",
    customerPhone: "",
    handoverTo: "",
    receivingDate: "",
    handoverPhone: "",
    paymentMethod: "",
    otp: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Handover Form Submitted:", formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 p-6 bg-white dark:bg-gray-900 rounded  max-h-[47vh] overflow-y-auto custom-scrollbar"
    >
      <h2 className="text-2xl font-semibold text-[var(--primary)] dark:text-[var(--primary)] mb-4">
        Repaired Handover Form
      </h2>

      {/* Grid for inputs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <InputField
          label="Job Sheet Number"
          name="jobSheetNo"
          value={formData.jobSheetNo}
          onChange={handleChange}
          placeholder="Enter Job Sheet Number"
        />

        <SelectField
          label="Submission Category"
          name="submissionCategory"
          value={formData.submissionCategory}
          onChange={handleChange}
          options={["Walk-in", "Pick-up", "Courier"]}
        />

        <InputField
          label="Customer Phone No"
          name="customerPhone"
          value={formData.customerPhone}
          onChange={handleChange}
          placeholder="Enter Customer Phone No"
        />

        <InputField
          label="Handover To (Name)"
          name="handoverTo"
          value={formData.handoverTo}
          onChange={handleChange}
          placeholder="Person receiving the device"
        />

        <InputField
          label="Receiving Date"
          name="receivingDate"
          value={formData.receivingDate}
          onChange={handleChange}
          type="date"
        />

        <InputField
          label="Handover Phone No"
          name="handoverPhone"
          value={formData.handoverPhone}
          onChange={handleChange}
          placeholder="Phone number of person receiving"
        />

        <SelectField
          label="Payment Method"
          name="paymentMethod"
          value={formData.paymentMethod}
          onChange={handleChange}
          options={["Cash", "UPI", "Card", "Not Applicable"]}
        />

        <InputField
          label="OTP Verification"
          name="otp"
          value={formData.otp}
          onChange={handleChange}
          placeholder="Enter OTP"
        />
      </div>

      {/* Remarks outside the grid */}
      <div className="mt-4">
        <TextAreaField
          label="Remarks"
          name="remarks"
          value={formData.remarks}
          onChange={handleChange}
          placeholder="Additional notes or signature"
        />
      </div>

      {/* Submit Button */}
      <div className="text-right mt-4">
        <button
          type="submit"
          className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded transition"
        >
          Handover
        </button>
      </div>
    </form>
  );
}

// Reusable Input Field
function InputField({ label, name, value, onChange, placeholder, type = "text" }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full border border-gray-300 rounded px-3 py-2 text-black dark:text-black"
      />
    </div>
  );
}

// Reusable TextArea Field
function TextAreaField({ label, name, value, onChange, placeholder }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
        {label}
      </label>
      <textarea
        name={name}
        rows="3"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full border border-gray-300 rounded px-3 py-2 text-black dark:text-black"
      />
    </div>
  );
}

// Reusable Select Field
function SelectField({ label, name, value, onChange, options }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
        {label}
      </label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="w-full border border-gray-300 rounded px-3 py-2 text-black dark:text-black"
      >
        <option value="" disabled>
          Select {label}
        </option>
        {options.map((opt, idx) => (
          <option key={idx} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}
