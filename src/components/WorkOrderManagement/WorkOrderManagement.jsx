import React, { useState } from "react";
import WOData from "./WorkOrderData.json";
import { IoIosCloseCircle, IoMdAddCircle } from "react-icons/io";
import { FaEye, FaEdit } from "react-icons/fa";
import DynamicDeviceForm from "./WorksheetForm";
import WorkOrderRepairProcess from "./WorkOrderRepairProcess";
import RepairedForm from "./RepairedForm";
import Modal from "../Common/Modal"; // Modal component

export default function WorkOrderManagement() {
  const [storeData, setStoreData] = useState(WOData);
  const [ShowAdd, setShowAdd] = useState(false);
  const [ShowRepair, setShowRepair] = useState(false);
  const [ShowRepaired, setShowRepaired] = useState(false);
  const [formData, setFormData] = useState({});
  const [selectedWorkOrder, setSelectedWorkOrder] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted form data:", formData);
    setFormData({});
  };

  const handleEdit = (order) => {
    setSelectedWorkOrder({ ...order });
    setIsEditModalOpen(true);
  };

  const handleEditSave = () => {
    if (!selectedWorkOrder.job_sheet_no || !selectedWorkOrder.imei) {
      alert("Please fill in all required fields.");
      return;
    }

    setStoreData((prev) =>
      prev.map((order) =>
        order.id === selectedWorkOrder.id ? selectedWorkOrder : order
      )
    );
    setIsEditModalOpen(false);
  };

  return (
    <div className="flex flex-col w-full h-full p-4 bg-white dark:bg-black rounded-lg">
      <div className="w-full flex flex-row items-center mb-4">
        {(ShowAdd || ShowRepair || ShowRepaired) && (
          <div className="text-2xl font-semibold text-gray-600 dark:text-white">
            {ShowAdd
              ? "Add Worksheet"
              : ShowRepair
              ? "Repair Process"
              : "Repaired Form"}
          </div>
        )}
        <div className="flex gap-2 ml-auto">
          <ButtonToggle
            label="Repair Process"
            isActive={ShowRepair}
            onClick={() => {
              setShowRepair((prev) => !prev);
              setShowAdd(false);
              setShowRepaired(false);
            }}
          />
          <ButtonToggle
            label="Add"
            icon={<IoMdAddCircle size={20} />}
            isActive={ShowAdd}
            onClick={() => {
              setShowAdd((prev) => !prev);
              setShowRepair(false);
              setShowRepaired(false);
            }}
          />
          <ButtonToggle
            label="Repaired"
            isActive={ShowRepaired}
            onClick={() => {
              setShowRepaired((prev) => !prev);
              setShowAdd(false);
              setShowRepair(false);
            }}
          />
        </div>
      </div>

      {ShowAdd ? (
        <DynamicDeviceForm
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
      ) : ShowRepair ? (
        <WorkOrderRepairProcess />
      ) : ShowRepaired ? (
        <RepairedForm />
      ) : (
        <div className="overflow-x-auto max-h-[72vh] custom-scrollbar">
          <table className="min-w-full table-auto border-collapse border border-gray-200 shadow-md rounded-lg overflow-hidden">
            <thead className="bg-purple-100 dark:bg-purple-800 text-purple-600 dark:text-gray-200 sticky top-0 z-10">
              <tr>
                <th className="px-4 py-2 text-left font-medium">S.No</th>
                <th className="px-4 py-2 text-left font-medium">Job Sheet No</th>
                <th className="px-4 py-2 text-left font-medium">IMEI</th>
                <th className="px-4 py-2 text-left font-medium">Invoice No</th>
                <th className="px-4 py-2 text-left font-medium">Customer Name</th>
                <th className="px-4 py-2 text-left font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white dark:bg-gray-900 dark:text-gray-300 text-gray-700">
              {storeData.map((val, index) => (
                <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">{val.job_sheet_no || "N/A"}</td>
                  <td className="px-4 py-2">{val.imei || "N/A"}</td>
                  <td className="px-4 py-2">{val.invoice_no || "N/A"}</td>
                  <td className="px-4 py-2">{val.customer_name || "N/A"}</td>
                  <td className="px-4 py-2 flex gap-2">
                    <button
                      className="p-2 rounded-full bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-white border border-purple-400 hover:bg-purple-600 hover:text-white transition-all"
                      onClick={() => {
                        setSelectedWorkOrder(val);
                        setIsViewModalOpen(true);
                      }}
                    >
                      <FaEye />
                    </button>
                    <button
                      className="p-2 rounded-full bg-yellow-100 text-yellow-700 dark:bg-yellow-950 dark:text-white border border-yellow-400 hover:bg-yellow-600 hover:text-white transition-all"
                      onClick={() => handleEdit(val)}
                    >
                      <FaEdit />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* View Modal */}
      <Modal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        title={<h2 className="text-lg font-semibold text-purple-700">Work Order Details</h2>}
        size="md"
      >
        {selectedWorkOrder ? (
          <div className="text-gray-700 dark:text-gray-200 space-y-2">
            <DetailRow label="Job Sheet No" value={selectedWorkOrder.job_sheet_no} />
            <DetailRow label="IMEI" value={selectedWorkOrder.imei} />
            <DetailRow label="Invoice No" value={selectedWorkOrder.invoice_no} />
            <DetailRow label="Customer Name" value={selectedWorkOrder.customer_name} />
          </div>
        ) : (
          <p>No details available.</p>
        )}
      </Modal>

      {/* Edit Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title={<h2 className="text-lg font-semibold text-yellow-700">Edit Work Order</h2>}
        size="md"
      >
        {selectedWorkOrder && (
          <div className="flex flex-col gap-4 dark:bg-black">
            <InputField
              label="Job Sheet No"
              value={selectedWorkOrder.job_sheet_no}
              onChange={(e) =>
                setSelectedWorkOrder({ ...selectedWorkOrder, job_sheet_no: e.target.value })
              }
            />
            <InputField
              label="IMEI"
              value={selectedWorkOrder.imei}
              onChange={(e) =>
                setSelectedWorkOrder({ ...selectedWorkOrder, imei: e.target.value })
              }
            />
            <InputField
              label="Invoice No"
              value={selectedWorkOrder.invoice_no}
              onChange={(e) =>
                setSelectedWorkOrder({ ...selectedWorkOrder, invoice_no: e.target.value })
              }
            />
            <InputField
              label="Customer Name"
              value={selectedWorkOrder.customer_name}
              onChange={(e) =>
                setSelectedWorkOrder({ ...selectedWorkOrder, customer_name: e.target.value })
              }
            />

            <div className="flex justify-end">
              <button
                onClick={handleEditSave}
                className="px-4 py-2 rounded text-white bg-yellow-600 hover:bg-yellow-700"
              >
                Save Changes
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

// Reusable Toggle Button
function ButtonToggle({ label, icon, isActive, onClick }) {
  return (
    <div
      className={`flex items-center gap-1 px-4 py-2 rounded-xl text-white cursor-pointer transition-all duration-300 ${
        isActive ? "bg-red-500 hover:bg-red-800" : "bg-purple-600 hover:bg-purple-800"
      }`}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
    >
      {isActive ? (
        <>
          <IoIosCloseCircle size={20} />
          Close
        </>
      ) : (
        <>
          {icon}
          {label}
        </>
      )}
    </div>
  );
}

// Row Component for Modal View
function DetailRow({ label, value }) {
  return (
    <div>
      <p className="text-sm font-medium">{label}</p>
      <p className="text-base">{value || "N/A"}</p>
    </div>
  );
}

// Reusable input field for edit form
function InputField({ label, value, onChange }) {
  return (
    <div>
      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>
      <input
        type="text"
        value={value}
        onChange={onChange}
        className="w-full mt-1 px-3 py-2 text-black rounded border border-gray-300 dark:bg-gray-800 dark:text-white"
      />
    </div>
  );
}
