import React, { useState } from "react";
import Slider from "react-slick";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

// Sample store data
const storeData = [
  { name: "Switch Kart - MG Road", address: "123 MG Road, Bengaluru", phone: "080-12345678", pincode: "560001" },
  { name: "Tech Hub - Koramangala", address: "45 Koramangala, Bengaluru", phone: "080-87654321", pincode: "560034" },
  { name: "Mobile World - Andheri", address: "78 Andheri West, Mumbai", phone: "022-12345678", pincode: "400053" },
  { name: "Gadget Point - Bandra", address: "12 Bandra West, Mumbai", phone: "022-87654321", pincode: "400050" },
  { name: "SmartBuy - Connaught Place", address: "5 CP, Delhi", phone: "011-12345678", pincode: "110001" },
];

// Custom Arrow Components
const NextArrow = ({ onClick }) => (
  <div
    onClick={onClick}
    className="absolute top-1/2 -right-5 transform -translate-y-1/2 z-10 bg-[var(--primary)] text-white w-10 h-10 flex items-center justify-center rounded-full cursor-pointer shadow-lg hover:bg-[var(--third)] transition"
  >
    <FaArrowRight />
  </div>
);

const PrevArrow = ({ onClick }) => (
  <div
    onClick={onClick}
    className="absolute top-1/2 -left-5 transform -translate-y-1/2 z-10 bg-[var(--primary)] text-white w-10 h-10 flex items-center justify-center rounded-full cursor-pointer shadow-lg hover:bg-[var(--third)] transition"
  >
    <FaArrowLeft />
  </div>
);

const CityStores = () => {
  const [pincode, setPincode] = useState("");

  const filteredStores = storeData.filter((store) =>
    pincode ? store.pincode.includes(pincode) : true
  );

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 relative">
      <h2 className="text-2xl lg:text-4xl text-center font-extrabold text-[var(--primary)] mb-4 tracking-tight">
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
        <p className="text-center text-gray-400">No stores found for the entered pincode.</p>
      )}

      {filteredStores.length > 0 && (
        <Slider {...settings}>
          {filteredStores.map((store, idx) => (
            <div key={idx} className="px-2">
              <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition transform  border border-gray-200 flex flex-col gap-3">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-lg font-semibold text-[var(--primary)]">{store.name}</h3>
                  <span className="bg-[var(--primary)] text-white px-3 py-1 rounded-full text-xs font-medium">
                    Store
                  </span>
                </div>
                <p className="text-gray-700">{store.address}</p>
                <p className="text-gray-700">📞 {store.phone}</p>
                <p className="text-gray-700">📍 Pincode: {store.pincode}</p>
              </div>
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
};

export default CityStores;
