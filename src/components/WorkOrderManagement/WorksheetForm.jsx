import React from "react";

const FormField = [
  { key: "customer_name", display: "Customer Name", required: true },
  { key: "contact_no", display: "Contact No", required: true },
  { key: "alternate_no", display: "Alternate No", required: false },
  { key: "address", display: "Address", required: true },
  { key: "mail_id", display: "Mail ID", required: true },
  { key: "comm_channel", display: "Comm Channel", required: false },
];

const DeviceFields = [
  { key: "imei", display: "IMEI", required: true },
  { key: "ram", display: "RAM", required: false },
  { key: "invoice_no", display: "Invoice No", required: true },
  { key: "model", display: "Model", required: true },
  { key: "color", display: "Color", required: false },
  {
    key: "activation_date",
    display: "Activation Date",
    type: "date",
    required: false,
  },
  { key: "dop", display: "Date of Purchase", type: "date", required: false },
  { key: "warranty_status", display: "Warranty Status", required: false },
  { key: "remarks", display: "Remarks", type: "textarea", required: false },
];

export default function DynamicDeviceForm({
  formData,
  handleChange,
  handleSubmit,
}) {
  return (
    <>
      <div className="max-h-[75vh] overflow-x-auto custom-scrollbar">
        <form
          onSubmit={handleSubmit}
          className="w-full  px-6 py-2 bg-white  dark:bg-black rounded space-y-6"
        >
          {/* Customer Info */}
          <div>
            <h2 className="text-xl font-semibold text-gray-600 dark:text-gray-300 mb-2">
              Customer Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
              {FormField.map((field) => (
                <div key={field.key}>
                  <label className="block text-sm  font-medium mb-1 text-gray-600 dark:text-gray-500">
                    {field.display}{" "}
                    <span className="text-red-500 text-[1.3em]">
                      {field.required && "*"}
                    </span>
                  </label>
                  <input
                    type="text"
                    placeholder={field.display}
                    name={field.key}
                    required={field.required}
                    value={formData[field.key] || ""}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-700 dark:text-gray-500"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Device Info */}
          <div>
            <h2 className="text-xl font-semibold text-gray-600 dark:text-gray-300 mb-2">
              Device Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
              {DeviceFields.map((field) => (
                <div
                  key={field.key}
                  className={field.key === "remarks" ? "md:col-span-3" : ""}
                >
                  <label className="block text-sm font-medium mb-1 text-gray-800 dark:text-gray-500">
                    {field.display}{" "}
                    <span className="text-red-500 text-[1.2em]">
                      {field.required && "*"}
                    </span>
                  </label>
                  {field.type === "textarea" ? (
                    <textarea
                      name={field.key}
                      rows="3"
                      cols="3"
                      required={field.required}
                      value={formData[field.key] || ""}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded px-3 py-2 text-gray-700 dark:text-gray-500"
                    />
                  ) : (
                    <input
                      type={field.type || "text"}
                      name={field.key}
                      required={field.required}
                      value={formData[field.key] || ""}
                      placeholder={field.display}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded px-3 py-2 text-gray-700"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="text-right">
            <button
              type="submit"
              className="bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700 transition"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
