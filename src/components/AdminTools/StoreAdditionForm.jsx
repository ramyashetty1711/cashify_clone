import React, { useState } from "react";

function StoreAdditionForm() {
  const [stores, setStores] = useState([]);
  const [newStore, setNewStore] = useState({
    name: "",
    street: "",
    city: "",
    state: "",
    zip: "",
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const { name, street, city, state } = newStore;
    const newErrors = {};

    if (!name.trim()) newErrors.name = "Store name is required.";
    if (!street.trim()) newErrors.street = "Street is required.";
    if (!city.trim()) newErrors.city = "City is required.";
    if (!state.trim()) newErrors.state = "State is required.";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleStoreCreate = () => {
    if (!validateForm()) return;

    const store = {
      id: Date.now().toString(),
      name: newStore.name,
      address: {
        street: newStore.street,
        city: newStore.city,
        state: newStore.state,
        zip: newStore.zip,
      },
    };

    setStores([...stores, store]);
    setNewStore({ name: "", street: "", city: "", state: "", zip: "" });
    setErrors({});
    alert("Store Created!");
  };

  return (
    <div className="w-full max-w-3xl max-h-[70vh] overflow-y-auto mx-auto p-6 bg-white dark:bg-gray-900  rounded-lg">
      <h3 className="text-2xl font-bold text-purple-700 mb-6">Create New Store</h3>
      <div className="space-y-6">
        {/* Store Name */}
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
            Store Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="Enter store name"
            value={newStore.name}
            onChange={(e) => setNewStore({ ...newStore, name: e.target.value })}
            className={`w-full px-4 py-2 text-sm rounded-md border ${
              errors.name ? "border-red-500" : "border-gray-300"
            } dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500`}
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>

        {/* Address Fields */}
        <div>
          <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">Store Address</h4>
          <div className="space-y-4">
            {/* Street */}
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                Street <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Street address"
                value={newStore.street}
                onChange={(e) => setNewStore({ ...newStore, street: e.target.value })}
                className={`w-full px-4 py-2 text-sm rounded-md border ${
                  errors.street ? "border-red-500" : "border-gray-300"
                } dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500`}
              />
              {errors.street && <p className="text-red-500 text-sm mt-1">{errors.street}</p>}
            </div>

            {/* City & State */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="w-full">
                <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                  City <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="City"
                  value={newStore.city}
                  onChange={(e) => setNewStore({ ...newStore, city: e.target.value })}
                  className={`w-full px-4 py-2 text-sm rounded-md border ${
                    errors.city ? "border-red-500" : "border-gray-300"
                  } dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500`}
                />
                {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
              </div>
              <div className="w-full">
                <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                  State <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="State"
                  value={newStore.state}
                  onChange={(e) => setNewStore({ ...newStore, state: e.target.value })}
                  className={`w-full px-4 py-2 text-sm rounded-md border ${
                    errors.state ? "border-red-500" : "border-gray-300"
                  } dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500`}
                />
                {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state}</p>}
              </div>
            </div>

            {/* ZIP */}
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                ZIP Code (optional)
              </label>
              <input
                type="text"
                placeholder="ZIP Code"
                value={newStore.zip}
                onChange={(e) => setNewStore({ ...newStore, zip: e.target.value })}
                className="w-full px-4 py-2 text-sm rounded-md border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            onClick={handleStoreCreate}
            className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-2 rounded-md transition-all duration-200"
          >
            Add Store
          </button>
        </div>
      </div>
    </div>
  );
}

export default StoreAdditionForm;
