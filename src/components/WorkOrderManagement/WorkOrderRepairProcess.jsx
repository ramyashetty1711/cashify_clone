import React, { useState } from "react";
import Select from "react-select";
import { FaPlus, FaMinus, FaSearch } from "react-icons/fa";

// 🔧 Mock part lookup function
const mockPartLookup = (partId) => {
  const parts = {
    P001: {
      name: "Charging Port",
      description: "Original charging port",
      replacedBy: "Engineer A",
      replacementDate: "2025-06-28",
      quality: "High",
      cost: "₹450",
    },
    P002: {
      name: "Battery",
      description: "High capacity battery",
      replacedBy: "Engineer B",
      replacementDate: "2025-06-28",
      quality: "Medium",
      cost: "₹750",
    },
    P003: {
      name: "Display Screen",
      description: "AMOLED screen",
      replacedBy: "Engineer C",
      replacementDate: "2025-06-28",
      quality: "High",
      cost: "₹1,500",
    },
  };
  return parts[partId] || null;
};

export default function WorkOrderRepairProcess() {
  const [parts, setParts] = useState([{ partId: "", data: null }]);
  const [resolutionMethod, setResolutionMethod] = useState(null);
  const [malfunctionCategory, setMalfunctionCategory] = useState(null);

  const handlePartIdChange = (index, value) => {
    const updated = [...parts];
    updated[index].partId = value;
    setParts(updated);
  };

  const fetchPartDetails = (index) => {
    const part = mockPartLookup(parts[index].partId);
    const updated = [...parts];
    updated[index].data = part;
    setParts(updated);
  };

  const addPartField = () => {
    setParts([...parts, { partId: "", data: null }]);
  };

  const removePartField = (index) => {
    const updated = parts.filter((_, i) => i !== index);
    setParts(updated);
  };

  return (
    <div className="max-h-[46vh] overflow-y-auto custom-scrollbar px-6 py-4 bg-white dark:bg-black rounded space-y-6">
      {/* Section 1: Customer Information */}
      <div>
        <h2 className="text-xl font-semibold text-[var(--primary)] dark:text-[var(--primary)] mb-2">
          Job Sheet Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField label="Job Sheet Number" />
          <DisplayField label="Problem Title" value="Battery not charging" />
          <DisplayField
            label="Remarks"
            value="Customer reported intermittent charging issue. Initial inspection shows corrosion on port."
            multiline
          />
        </div>
      </div>

      {/* Section 2: Engineer Diagnose Info */}
      <div>
        <h2 className="text-xl font-semibold text-[var(--primary)] mb-2">
          Engineer Diagnose Info
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <SelectField
            label="Resolution Method"
            options={["Hardware", "Software"]}
            selected={resolutionMethod}
            setSelected={setResolutionMethod}
          />
          <SelectField
            label="Malfunction Category"
            options={[
              "Replaced Part",
              "Re-fix",
              "Dust clean",
              "Battery Activation",
              "Software update",
            ]}
            selected={malfunctionCategory}
            setSelected={setMalfunctionCategory}
          />
        </div>
      </div>

      {/* Section 3: Dynamic Parts Replacement */}
      <div>
        <h2 className="text-xl font-semibold text-[var(--primary)] dark:text-[var(--primary)] mb-2">
          Parts Replacement Info
        </h2>

        {parts.map((partEntry, index) => (
          <div
            key={index}
            className="mb-4 border p-4 rounded bg-gray-50 dark:bg-gray-800"
          >
            <div className="flex flex-wrap gap-2 md:gap-4 items-end">
              <div className="w-[300px]">
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                  Part ID
                </label>
                <input
                  type="text"
                  value={partEntry.partId}
                  onChange={(e) => handlePartIdChange(index, e.target.value)}
                  placeholder="Enter Part ID"
                  className="w-full border border-gray-300 rounded px-3 py-2 text-gray-700 dark:text-gray-300"
                />
              </div>

              <button
                type="button"
                onClick={() => fetchPartDetails(index)}
                className="bg-[var(--secondary)] hover:bg-[var(--primary)] text-white p-2 rounded-full transition"
                title="Fetch Part Details"
              >
                <FaSearch />
              </button>

              {parts.length > 1 && (
                <button
                  type="button"
                  onClick={() => removePartField(index)}
                  className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-full transition"
                  title="Remove Part"
                >
                  <FaMinus />
                </button>
              )}

              {index === parts.length - 1 && (
                <button
                  type="button"
                  onClick={addPartField}
                  className="bg-green-600 hover:bg-green-700 text-white p-2 rounded-full transition"
                  title="Add Part"
                >
                  <FaPlus />
                </button>
              )}
            </div>

            {partEntry.data && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 text-gray-700 dark:text-gray-200">
                <p>
                  <strong>Part Name:</strong> {partEntry.data.name}
                </p>
                <p>
                  <strong>Description:</strong> {partEntry.data.description}
                </p>
                <p>
                  <strong>Replaced By:</strong> {partEntry.data.replacedBy}
                </p>
                <p>
                  <strong>Date:</strong> {partEntry.data.replacementDate}
                </p>
                <p>
                  <strong>Quality:</strong> {partEntry.data.quality}
                </p>
                <p>
                  <strong>Cost:</strong> {partEntry.data.cost}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Section 4: Final Remarks */}
      <div>
        <h2 className="text-xl font-semibold dark:text-purple-300 mb-2">
          Final Remarks
        </h2>
        <textarea
          placeholder="Enter any final remarks"
          rows="4"
          className="w-full border border-gray-300 rounded px-3 py-2 text-gray-700 dark:text-gray-300"
        ></textarea>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end gap-4">
  <button
    type="button"
    className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded transition"
    onClick={() => alert("Saved successfully!")} // Replace with real save logic
  >
    Save
  </button>

  <button
    type="submit"
    className="bg-[var(--secondary)] dark:bg-[var(--primary)] text-white px-6 py-2 rounded hover:bg-[var(--primary)] transition"
  >
    Submit
  </button>
</div>

    </div>
  );
}

// Reusable Components
function InputField({ label, type = "text" }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
        {label}
      </label>
      <input
        type={type}
        placeholder={label}
        className="w-full border border-gray-300 rounded px-3 py-2 text-gray-700 dark:text-gray-300"
      />
    </div>
  );
}

function DisplayField({ label, value, multiline = false }) {
  return (
    <div className={multiline ? "md:col-span-2" : ""}>
      <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
        {label}
      </label>
      <div
        className={`w-full border border-gray-300 rounded px-3 py-2 text-gray-700 dark:text-gray-300 ${
          multiline ? "min-h-[6rem]" : ""
        }`}
      >
        {value}
      </div>
    </div>
  );
}

function SelectField({ label, options, selected, setSelected }) {
  const formattedOptions = options.map((opt) => ({
    value: opt,
    label: opt,
  }));

  return (
    <div>
      <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
        {label}
      </label>
      <Select
        options={formattedOptions}
        value={selected}
        onChange={setSelected}
        placeholder={`Select ${label}`}
        className="text-black dark:text-white"
        classNamePrefix="react-select"
        styles={{
          control: (base) => ({
            ...base,
            backgroundColor: "white",
            borderColor: "#ccc",
            padding: "2px",
          }),
          menu: (base) => ({
            ...base,
            zIndex: 9999,
          }),
        }}
      />
    </div>
  );
}
