import React, { useState } from "react";

export default function StoreFullDetailForm({ onAddStore }) {
  const [form, setForm] = useState({
    name: "",
    address: "",
    isActive: true,
    phone: "",
    email: "",
    manager: "",
    established: "",
    gstNumber: "",
    storeType: "",
    staffCount: "",
    services: "",
    customersServed: "",
    avgServiceTime: "",
    rating: "",
    timing: "",
    mapLink: "",
  });

  const [errors, setErrors] = useState({});
  const [openSection, setOpenSection] = useState("");

  // Mapping of fields to their respective sections
  const fieldSectionMap = {
    name: "basic",
    storeType: "basic",
    gstNumber: "basic",
    established: "basic",
    phone: "contact",
    email: "contact",
    manager: "contact",
    address: "contact",
    staffCount: "operation",
    customersServed: "operation",
    avgServiceTime: "operation",
    rating: "operation",
    timing: "operation",
    mapLink: "operation",
    services: "services",
  };

  const toggleSection = (section) => {
    setOpenSection((prev) => (prev === section ? "" : section));
  };

  const validate = () => {
    const err = {};

    if (!form.name.trim()) err.name = "Store name is required";
    if (!form.address.trim()) err.address = "Address is required";
    if (!form.phone.trim()) err.phone = "Phone number is required";
    if (!form.email.trim()) err.email = "Email is required";
    if (!form.manager.trim()) err.manager = "Manager name is required";
    if (!form.established.trim()) err.established = "Established date is required";
    if (!form.rating || isNaN(form.rating)) err.rating = "Rating must be a number";
    if (!form.staffCount || isNaN(form.staffCount)) err.staffCount = "Staff count must be a number";

    setErrors(err);

    const firstErrorField = Object.keys(err)[0];
    return { isValid: Object.keys(err).length === 0, firstErrorField };
  };

  const handleSubmit = () => {
    const { isValid, firstErrorField } = validate();

    if (!isValid) {
      if (firstErrorField) {
        setOpenSection(fieldSectionMap[firstErrorField]);
      }
      return;
    }

    const payload = {
      ...form,
      services: form.services.split(",").map((s) => s.trim()),
      id: Date.now(),
    };

    onAddStore(payload);
    setForm({
      name: "",
      address: "",
      isActive: true,
      phone: "",
      email: "",
      manager: "",
      established: "",
      gstNumber: "",
      storeType: "",
      staffCount: "",
      services: "",
      customersServed: "",
      avgServiceTime: "",
      rating: "",
      timing: "",
      mapLink: "",
    });
    setErrors({});
    alert("Store added successfully!");
  };

  const renderInput = (label, key, type = "text") => (
    <div>
      <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>
      <input
        type={type}
        value={form[key]}
        onChange={(e) => setForm({ ...form, [key]: e.target.value })}
        className={`w-full px-4 py-2 text-sm rounded-md border ${
          errors[key] ? "border-red-500" : "border-gray-300"
        } dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500`}
      />
      {errors[key] && <p className="text-red-500 text-sm">{errors[key]}</p>}
    </div>
  );

  return (
    <div className="mx-auto bg-white dark:bg-gray-900 p-2 rounded-lg  text-black">
      <h2 className="text-2xl font-semibold text-purple-700 mb-6">Add Store Details</h2>

      {/* Sections */}
      <div className="space-y-4">

        {/* Section 1: Basic Info */}
        <button
          onClick={() => toggleSection("basic")}
          className="w-full text-left bg-purple-100 hover:bg-purple-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-purple-800 dark:text-white font-semibold px-4 py-2 rounded-md"
        >
          {openSection === "basic" ? "▼" : "▶"} Basic Information
        </button>
        {openSection === "basic" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-2">
            {renderInput("Store Name", "name")}
            {renderInput("Store Type", "storeType")}
            {renderInput("GST Number", "gstNumber")}
            {renderInput("Established Date", "established", "date")}
          </div>
        )}

        {/* Section 2: Contact Info */}
        <button
          onClick={() => toggleSection("contact")}
          className="w-full text-left bg-purple-100 hover:bg-purple-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-purple-800 dark:text-white font-semibold px-4 py-2 rounded-md"
        >
          {openSection === "contact" ? "▼" : "▶"} Contact Details
        </button>
        {openSection === "contact" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-2">
            {renderInput("Phone", "phone")}
            {renderInput("Email", "email")}
            {renderInput("Manager Name", "manager")}
            {renderInput("Address", "address")}
          </div>
        )}

        {/* Section 3: Operational Info */}
        <button
          onClick={() => toggleSection("operation")}
          className="w-full text-left bg-purple-100 hover:bg-purple-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-purple-800 dark:text-white font-semibold px-4 py-2 rounded-md"
        >
          {openSection === "operation" ? "▼" : "▶"} Operational Details
        </button>
        {openSection === "operation" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-2">
            {renderInput("Staff Count", "staffCount")}
            {renderInput("Customers Served", "customersServed")}
            {renderInput("Average Service Time", "avgServiceTime")}
            {renderInput("Rating (0-5)", "rating")}
            {renderInput("Timing", "timing")}
            {renderInput("Google Maps Link", "mapLink")}
          </div>
        )}

        {/* Section 4: Services & Status */}
        <button
          onClick={() => toggleSection("services")}
          className="w-full text-left bg-purple-100 hover:bg-purple-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-purple-800 dark:text-white font-semibold px-4 py-2 rounded-md"
        >
          {openSection === "services" ? "▼" : "▶"} Services & Status
        </button>
        {openSection === "services" && (
          <div className="space-y-4 px-2">
            {renderInput("Services Offered (comma separated)", "services")}
            <div className="flex items-center gap-3 mt-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Active Status</label>
              <input
                type="checkbox"
                checked={form.isActive}
                onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
                className="h-5 w-5 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
              />
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {form.isActive ? "Active" : "Inactive"}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Submit */}
      <div className="flex justify-end mt-8">
        <button
          onClick={handleSubmit}
          className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-2 rounded-md transition-all duration-200"
        >
          Add Store
        </button>
      </div>
    </div>
  );
}
