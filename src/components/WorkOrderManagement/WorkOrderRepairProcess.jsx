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
  const [parts, setParts] = useState([{ partId: "", data: {} }]);
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
    updated[index].data = part || {};
    setParts(updated);
  };

  const addPartField = () => {
    setParts([...parts, { partId: "", data: {} }]);
  };

  const removePartField = (index) => {
    setParts(parts.filter((_, i) => i !== index));
  };

  return (
    <div className="max-h-[45vh] overflow-y-auto custom-scrollbar px-6 py-4 bg-white dark:bg-gray-900 rounded space-y-6">
      {/* Job Sheet Info */}
      <section>
        <h2 className="text-xl font-semibold text-purple-700 dark:text-purple-300 mb-2">
          Job Sheet Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField label="Job Sheet Number" />
          <DisplayField label="Problem Title" value="Battery not charging" />
          <DisplayField
            label="Remarks"
            multiline
            value="Customer reported intermittent charging issue. Initial inspection shows corrosion on port."
          />
        </div>
      </section>

      {/* Diagnose Info */}
      <section>
        <h2 className="text-xl font-semibold text-purple-700 dark:text-purple-300 mb-2">
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
      </section>

      {/* Parts Replacement */}
      <section>
        <h2 className="text-xl font-semibold text-purple-700 dark:text-purple-300 mb-2">
          Parts Replacement Info
        </h2>
        {parts.map((partEntry, index) => (
          <div
            key={index}
            className="p-4 mb-6 bg-gray-50 dark:bg-gray-800 rounded-lg border shadow-sm"
          >
            <div className="flex items-end gap-3 mb-4">
              <div className="flex-grow">
                <label className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  Part ID
                </label>
                <div className="relative flex">
                  <input
                    type="text"
                    placeholder="e.g. P001"
                    className="w-full px-3 py-2 border rounded-l text-sm text-gray-800 dark:text-white dark:bg-gray-700"
                    value={partEntry.partId}
                    onChange={(e) =>
                      handlePartIdChange(index, e.target.value)
                    }
                  />
                  <button
                    type="button"
                    onClick={() => fetchPartDetails(index)}
                    className="bg-blue-600 ml-2 hover:bg-blue-700 text-white px-3 rounded-r"
                    title="Fetch Part Details"
                  >
                    <FaSearch />
                  </button>
                </div>
              </div>
              {parts.length > 1 && (
                <button
                  onClick={() => removePartField(index)}
                  className="bg-red-500 hover:bg-red-600 text-white p-2 rounded"
                >
                  <FaMinus />
                </button>
              )}
              {index === parts.length - 1 && (
                <button
                  onClick={addPartField}
                  className="bg-green-500 hover:bg-green-600 text-white p-2 rounded"
                >
                  <FaPlus />
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                "name",
                "description",
                "replacedBy",
                "replacementDate",
                "quality",
                "cost",
              ].map((field) => (
                <div key={field}>
                  <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1 capitalize">
                    {field.replace(/([A-Z])/g, " $1")}
                  </label>
                  <input
                    type={field === "replacementDate" ? "date" : "text"}
                    value={partEntry.data?.[field] || ""}
                    onChange={(e) => {
                      const updated = [...parts];
                      updated[index].data = {
                        ...updated[index].data,
                        [field]: e.target.value,
                      };
                      setParts(updated);
                    }}
                    placeholder={`Enter ${field}`}
                    className="w-full px-3 py-2 border rounded text-sm text-gray-800 dark:text-white dark:bg-gray-700"
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* Final Remarks */}
      <section>
        <h2 className="text-xl font-semibold text-purple-700 dark:text-purple-300 mb-2">
          Final Remarks
        </h2>
        <textarea
          rows="4"
          placeholder="Enter any final remarks"
          className="w-full border border-gray-300 rounded px-3 py-2 text-gray-700 dark:text-gray-200 focus:outline-none"
        />
      </section>

      <div className="flex justify-end gap-4">
        <button
          type="button"
          className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded"
          onClick={() => alert("Saved successfully!")}
        >
          Save
        </button>
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
        >
          Submit
        </button>
      </div>
    </div>
  );
}

// — Reusable Components —
function InputField({ label, type = "text" }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
        {label}
      </label>
      <input
        type={type}
        placeholder={label}
        className="w-full border border-gray-300 rounded px-3 py-2 text-gray-700 dark:text-gray-200"
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
        className={`w-full border border-gray-300 rounded px-3 py-2 text-gray-700 dark:text-gray-200 ${
          multiline ? "min-h-[6rem]" : ""
        }`}
      >
        {value}
      </div>
    </div>
  );
}

function SelectField({ label, options, selected, setSelected }) {
  const formattedOptions = options.map((opt) =>
    typeof opt === "string" ? { value: opt, label: opt } : opt
  );

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
