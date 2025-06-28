// StoreCredentialForm.js
import React, { useState } from "react";
import StoreDataJSON from "./StoreData.json"; // ✅ directly imported here

function StoreCredentialForm() {
  const [selectedStoreId, setSelectedStoreId] = useState("");
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState({});

  const handleSubmit = () => {
    const newErrors = {};
    if (!selectedStoreId) newErrors.store = "Please select a store.";
    if (!credentials.username.trim()) newErrors.username = "Username is required.";
    if (!credentials.password.trim()) newErrors.password = "Password is required.";

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    const selectedStore = StoreDataJSON.find((s) => s.id === selectedStoreId);

    console.log("Credentials created for:", selectedStore, credentials);
    alert(`Credentials for ${selectedStore.name} created!`);

    setSelectedStoreId("");
    setCredentials({ username: "", password: "" });
    setErrors({});
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-6 bg-white dark:bg-gray-900  rounded-lg">
      <h3 className="text-xl font-bold text-purple-600 mb-6">Create Store Credentials</h3>
      <div className="space-y-5">
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
            Select Store <span className="text-red-500">*</span>
          </label>
          <select
            value={selectedStoreId}
            onChange={(e) => setSelectedStoreId(e.target.value)}
            className={`w-full px-4 py-2 rounded-md border text-black ${
              errors.store ? "border-red-500" : "border-gray-300"
            } dark:bg-gray-800 dark:text-white`}
          >
            <option value="">-- Select Store --</option>
            {StoreDataJSON.map((store) => (
              <option key={store.id} value={store.id}>
                {store.name}
              </option>
            ))}
          </select>
          {errors.store && <p className="text-red-500 text-sm mt-1">{errors.store}</p>}
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
            Username <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={credentials.username}
            onChange={(e) =>
              setCredentials({ ...credentials, username: e.target.value })
            }
            placeholder="Enter username"
            className={`w-full px-4 py-2 rounded-md border text-black ${
              errors.username ? "border-red-500" : "border-gray-300"
            } dark:bg-gray-800 dark:text-white`}
          />
          {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
            Password <span className="text-red-500">*</span>
          </label>
          <input
            type="password"
            value={credentials.password}
            onChange={(e) =>
              setCredentials({ ...credentials, password: e.target.value })
            }
            placeholder="Enter password"
            className={`w-full px-4 py-2 rounded-md border text-black ${
              errors.password ? "border-red-500" : "border-gray-300"
            } dark:bg-gray-800 dark:text-white`}
          />
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleSubmit}
            className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-2 rounded-md"
          >
            Create Credentials
          </button>
        </div>
      </div>
    </div>
  );
}

export default StoreCredentialForm;
