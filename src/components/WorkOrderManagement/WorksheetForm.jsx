import React, { useState } from "react";

// Mock device data based on IMEI
const mockDeviceLookup = (imei) => {
  const data = {
    "123456789012345": {
      ram: "6 GB",
      invoice_no: "INV-2023-456",
      model: "Galaxy M13",
      color: "Blue",
      activation_date: "2023-06-15",
      dop: "2023-06-01",
      warranty_status: "In Warranty",
      remarks: "No issues reported",
    },
  };
  return data[imei] || null;
};

const FormField = [
  { key: "customer_name", display: "Customer Name", required: true },
  { key: "contact_no", display: "Contact No", required: true },
  { key: "alternate_no", display: "Alternate No", required: false },
  { key: "address", display: "Address", required: true },
  { key: "mail_id", display: "Mail ID", required: true },
  { key: "comm_channel", display: "Comm Channel", required: false },
];

const DeviceFields = [
  { key: "ram", display: "RAM", required: false },
  { key: "invoice_no", display: "Invoice No", required: true },
  { key: "model", display: "Model", required: true },
  { key: "color", display: "Color", required: false },
  { key: "activation_date", display: "Activation Date", type: "date", required: false },
  { key: "dop", display: "Date of Purchase", type: "date", required: false },
  { key: "warranty_status", display: "Warranty Status", required: false },
  { key: "remarks", display: "Remarks", type: "textarea", required: false },
];

export default function DynamicDeviceForm() {
  const [formData, setFormData] = useState({});
  const [notFound, setNotFound] = useState(false);
  const [deviceFetched, setDeviceFetched] = useState(false);
  const [imeiEmpty, setImeiEmpty] = useState(false);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const fetchDeviceInfo = () => {
  if (!formData.imei || formData.imei.trim() === "") {
    setImeiEmpty(true);
    setNotFound(false);
    setDeviceFetched(false);
    return;
  }

  setImeiEmpty(false); // Clear previous warning

  const deviceDetails = mockDeviceLookup(formData.imei);
  if (deviceDetails) {
    setFormData((prev) => ({
      ...prev,
      ...deviceDetails,
    }));
    setDeviceFetched(true);
    setNotFound(false);
  } else {
    setNotFound(true);
    setDeviceFetched(false);
  }
};


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    alert("Form Submitted! Check the console.");
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-10 max-h-[46vh] overflow-y-auto custom-scrollbar">

        {/* Customer Info */}
        <section className="p-6 border rounded-xl  bg-white dark:bg-gray-900">
          <h3 className="text-xl font-bold text-[var(--primary)] mb-6 border-b pb-2">
            Customer Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {FormField.map((field) => (
              <div key={field.key}>
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                  {field.display}
                  {field.required && <span className="text-red-500 ml-1">*</span>}
                </label>
                <input
                  type="text"
                  name={field.key}
                  required={field.required}
                  value={formData[field.key] || ""}
                  onChange={handleChange}
                  placeholder={field.display}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-[var(--secondary)]"
                />
              </div>
            ))}
          </div>
        </section>

        {/* IMEI Section */}
        <section className="p-6 border rounded-xl  bg-white dark:bg-gray-900">
          <h3 className="text-xl font-bold text-[var(--primary)] mb-6 border-b pb-2">
            Enter IMEI to Fetch Device Info
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                IMEI <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="imei"
                value={formData.imei || ""}
                onChange={handleChange}
                placeholder="IMEI"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white dark:border-gray-700 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <button
                type="button"
                onClick={fetchDeviceInfo}
                className="mt-1 bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-800"
              >
                Fetch
              </button>
            </div>
          </div>

          {/* Error shown below without affecting layout */}
          {imeiEmpty && (
  <div className="mt-4 text-red-500 text-sm">
    Please enter an IMEI number before fetching.
  </div>
)}

{notFound && (
  <div className="mt-2 text-red-500 text-sm">
    No device found for this IMEI.
  </div>
)}

        </section>

        {/* Device Info */}
        {deviceFetched && (
          <section className="p-6 border rounded-xl  bg-white dark:bg-gray-900">
            <h3 className="text-xl font-bold text-[var(--primary)] mb-6 border-b pb-2">
              Device Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {DeviceFields.map((field) => {
                const commonProps = {
                  name: field.key,
                  value: formData[field.key] || "",
                  placeholder: field.display,
                  readOnly: true,
                  className:
                    "w-full border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 bg-gray-100 cursor-not-allowed dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none",
                };

                return field.type === "textarea" ? (
                  <div key={field.key} className="md:col-span-3">
                    <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                      {field.display}
                      {field.required && <span className="text-red-500 ml-1">*</span>}
                    </label>
                    <textarea rows="3" {...commonProps} />
                  </div>
                ) : (
                  <div key={field.key}>
                    <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                      {field.display}
                      {field.required && <span className="text-red-500 ml-1">*</span>}
                    </label>
                    <input type={field.type || "text"} {...commonProps} />
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Final Submit */}
        <div className="text-right">
          <button
            type="submit"
            className="inline-block bg-gradient-to-r from-[var(--secondary)] to-[var(--primary)] hover:from-purple-600 hover:to-purple-800 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition duration-300"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
