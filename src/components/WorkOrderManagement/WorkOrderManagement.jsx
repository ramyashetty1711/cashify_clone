import React, { useState } from "react";
import WOData from "./WorkOrderData.json";
import Modal from "../Common/Modal";
import { IoIosCloseCircle, IoMdAddCircle } from "react-icons/io";
import DynamicDeviceForm from "./WorksheetForm";

export default function WorkOrderManagement() {
  const [IsOpen, setIsOpen] = useState(false);
  const [ShowAdd, setShowAdd] = useState(false);
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted form data:", formData);
  };

  const FormField = [
    { key: "customer_name", display: "Customer Name", required: true },
    { key: "contact_no", display: "Contact No", required: true },
    { key: "alternate_no", display: "Alternate No", required: false },
    { key: "address", display: "Alternate No", required: true },
    { key: "mail_id", display: "Mail ID", required: true },
    { key: "comm_channel", display: "Comm Channel", required: false },
    { key: "imei", display: "IMEI", required: true },
  ];
  return (
    <>
      <div className="flex flex-col w-full h-full p-4">
        <div
          className={`w-full content-end flex flex-row text-end  mb-2 ${
            ShowAdd ? "justify-between" : "justify-end"
          }`}
        >
          <div className={`${ShowAdd ? "block text-gray-600 font-semibold self-center text-2xl " : "hidden"}`}>Add Worksheet</div>
          <div
            className={`w-fit flex flex-row justify-center items-center min-w-[5em] text-center  p-2 rounded-xl text-white cursor-pointer  duration-300 transition-all ${
              ShowAdd
                ? "bg-red-500 hover:bg-red-800"
                : "bg-purple-600 hover:bg-purple-800"
            }`}
            onClick={(e) => {
              e.stopPropagation();
              setShowAdd((prev) => !prev);
            }}
          >
            {ShowAdd ? (
              <>
                <IoIosCloseCircle size={20} className="me-1" />
                Close
              </>
            ) : (
              <>
                <IoMdAddCircle size={20} /> Add
              </>
            )}
          </div>
        </div>
        {ShowAdd ? (
          <DynamicDeviceForm
            formData={formData}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
          />
        ) : (
          <div className="overflow-x-auto  max-h-[75vh] custom-scrollbar">
            <table className="min-w-full table-auto border-collapse border border-gray-200 shadow-md rounded-lg overflow-hidden">
              <thead className="bg-purple-100 dark:bg-purple-800 text-purple-600 dark:text-gray-200 sticky top-0 z-10">
                <tr>
                  <th className="px-4 py-2 text-left font-medium">S.No</th>
                  <th className="px-4 py-2 text-left font-medium">
                    Job Sheet No
                  </th>
                  <th className="px-4 py-2 text-left font-medium">IMEI</th>
                  <th className="px-4 py-2 text-left font-medium">
                    Invoice No
                  </th>
                  <th className="px-4 py-2 text-left font-medium">
                    Customer Name
                  </th>
                  <th className="px-4 py-2 text-left font-medium">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200 bg-white dark:bg-gray-900 dark:text-gray-300 text-gray-700">
                {[...WOData, ...WOData].map((val, index) => (
                  <tr
                    key={index}
                    className="hover:bg-gray-50 dark:hover:bg-gray-800"
                  >
                    <td className="px-4 py-2">{index + 1}</td>
                    <td className="px-4 py-2">{val.job_sheet_no || "N/A"}</td>
                    <td className="px-4 py-2">{val.imei || "N/A"}</td>
                    <td className="px-4 py-2">{val.invoice_no || "N/A"}</td>
                    <td className="px-4 py-2">{val.customer_name || "N/A"}</td>
                    <td className="px-4 py-2">
                      <button
                        className="!bg-white hover:!bg-purple-500 dark:!bg-purple-950 dark:!text-gray-300 hover:!text-white text-purple-500 !border-2 !border-gray-400 px-3 py-1 rounded text-sm duration-300 transition-all"
                        onClick={(e) => {
                          setIsOpen((prev) => !prev);
                        }}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}
