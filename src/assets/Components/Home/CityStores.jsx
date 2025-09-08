import React, { useState } from "react";

// Sample store data with pincodes
const storeData = [
  { name: "Switch Kart - MG Road", address: "123 MG Road, Bengaluru", phone: "080-12345678", pincode: "560001" },
  { name: "Tech Hub - Koramangala", address: "45 Koramangala, Bengaluru", phone: "080-87654321", pincode: "560034" },
  { name: "Mobile World - Andheri", address: "78 Andheri West, Mumbai", phone: "022-12345678", pincode: "400053" },
  { name: "Gadget Point - Bandra", address: "12 Bandra West, Mumbai", phone: "022-87654321", pincode: "400050" },
  { name: "SmartBuy - Connaught Place", address: "5 CP, Delhi", phone: "011-12345678", pincode: "110001" },
];

const CityStores = () => {
  const [pincode, setPincode] = useState("");

  // Filter stores by entered pincode
  const filteredStores = storeData.filter((store) =>
    pincode ? store.pincode.includes(pincode) : true
  );

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h2 className="text-3xl font-bold text-[var(--primary)] mb-6 text-center">
        Find Stores by Pincode
      </h2>

      {/* Pincode Input */}
      <div className="flex justify-center mb-10">
        <input
          type="text"
          placeholder="Enter Pincode"
          value={pincode}
          onChange={(e) => setPincode(e.target.value)}
          className="px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--primary)] w-64 text-gray-800"
        />
      </div>

      {/* Store List */}
      {filteredStores.length === 0 && (
        <p className="text-center text-gray-400">
          No stores found for the entered pincode.
        </p>
      )}

      {filteredStores.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredStores.map((store, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-gray-50 rounded-xl shadow-lg p-6 hover:shadow-2xl transition transform hover:scale-101 border border-gray-200"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-[var(--primary)]">{store.name}</h3>
                <span className="bg-[var(--primary)] text-white px-2 py-1 rounded-full text-sm font-medium">
                  Store
                </span>
              </div>
              <p className="text-gray-700 mb-1">{store.address}</p>
              <p className="text-gray-700 mb-1">📞 {store.phone}</p>
              <p className="text-gray-700">📍 Pincode: {store.pincode}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CityStores;
