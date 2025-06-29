import React from "react";

export default function WorkOrderRepairProcess() {
  return (
    <div className="max-h-[72vh] overflow-y-auto custom-scrollbar px-6 py-4 bg-white dark:bg-black rounded space-y-6">
      {/* Section 1: Customer Information */}
      <div>
        <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
          Customer Information
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
        <h2 className="text-xl font-semibold text-gray-700 dark:text-blue-300 mb-2">
          Engineer Diagnose Info
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <SelectField
            label="Resolution Method"
            options={["Hardware", "Software"]}
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
          />
        </div>
      </div>

      {/* Section 3: Parts Replacement Info as Enhanced Table */}
      <div>
        <h2 className="text-xl font-semibold text-gray-700 dark:text-green-300 mb-2">
          Parts Replacement Info
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse border border-gray-300 dark:border-gray-600">
            <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200">
              <tr>
                <th className="px-4 py-2 border">S.No</th>
                <th className="px-4 py-2 border">Part Name</th>
                <th className="px-4 py-2 border">Description</th>
                <th className="px-4 py-2 border">Replaced By</th>
                <th className="px-4 py-2 border">Replacement Date</th>
                <th className="px-4 py-2 border">Quality</th>
                <th className="px-4 py-2 border">Cost</th>
              </tr>
            </thead>
            <tbody>
              <tr className="text-gray-700 dark:text-gray-200">
                <td className="px-4 py-2 border">1</td>
                <td className="px-4 py-2 border">Charging Port</td>
                <td className="px-4 py-2 border">Original charging port replacement</td>
                <td className="px-4 py-2 border">Engineer A</td>
                <td className="px-4 py-2 border">2025-06-28</td>
                <td className="px-4 py-2 border">High</td>
                <td className="px-4 py-2 border">₹450</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Section 4: Final Remarks */}
      <div>
        <h2 className="text-xl font-semibold text-gray-700 dark:text-purple-300 mb-2">
          Final Remarks
        </h2>
        <textarea
          placeholder="Enter any final remarks"
          rows="4"
          className="w-full border border-gray-300 rounded px-3 py-2 text-gray-700 dark:text-gray-300"
        ></textarea>
      </div>

      {/* Submit Button */}
      <div className="text-right">
        <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition">
          Submit
        </button>
      </div>
    </div>
  );
}

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

function SelectField({ label, options }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
        {label}
      </label>
      <select
        className="w-full border border-gray-300 rounded px-3 py-2 text-gray-700 dark:text-gray-300"
        defaultValue=""
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
