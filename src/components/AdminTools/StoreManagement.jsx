import React, { useState } from "react";
import StoreDataJSON from "./StoreData.json";
import { FaEye, FaEdit, FaTrash, FaPlus, FaTimes } from "react-icons/fa";
import Modal from "../Common/Modal";
import StoreFormTabs from "./StoreFormTabs";
import { IoAdd } from "react-icons/io5";
import StoreAdditionForm from "./StoreAdditionForm";
import Select from 'react-select';


export default function StoreManagement() {
  const [storeData, setStoreData] = useState(StoreDataJSON);
  const [selectedStore, setSelectedStore] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isCredentialsModalOpen, setIsCredentialsModalOpen] = useState(false);
const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingField, setEditingField] = useState(null);
  const [editValue, setEditValue] = useState("");

  const handleView = (store) => {
    setSelectedStore(store);
    setIsViewModalOpen(true);
  };

  const handleEdit = (store) => {
    setSelectedStore({ ...store });
    setIsEditModalOpen(true);
  };

  const handleDelete = (store) => {
    setSelectedStore(store);
    setIsDeleteModalOpen(true);
  };

  const handleOpenCredentialsModal = (store) => {
  setSelectedStore(store);
  setCredentials({
    username: store.username || "",
    password: store.password || "",
  });
  setIsCredentialsModalOpen(true);
};


  const handleEditSave = () => {
    if (!selectedStore.name.trim() || !selectedStore.address.trim()) {
      alert("Please fill in all fields.");
      return;
    }
    setStoreData((prevData) =>
      prevData.map((store) => (store.id === selectedStore.id ? selectedStore : store))
    );
    setIsEditModalOpen(false);
  };

  const handleConfirmDelete = () => {
    setStoreData((prevData) => prevData.filter((store) => store.id !== selectedStore.id));
    setIsDeleteModalOpen(false);
  };

  const handleAddStore = (newStore) => {
    const newId = Math.max(...storeData.map((s) => s.id)) + 1;
    const newEntry = { id: newId, ...newStore };
    setStoreData((prev) => [...prev, newEntry]);
    setShowAddForm(false);
  };

  return (
    <div className="">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Store Management</h2>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
            showAddForm
              ? "bg-red-600 text-white hover:bg-red-700"
              : "bg-purple-600 text-white hover:bg-purple-700"
          }`}
        >
          {showAddForm ? <><FaTimes /> Close</> : <><FaPlus /> Add Store</>}
        </button>
      </div>

      {showAddForm && <div className="mb-6"><StoreAdditionForm/> </div>}

      {!showAddForm && (
        <div className="overflow-x-auto max-h-[65vh] custom-scrollbar mt-2">
          <table className="min-w-full table-auto border-collapse border border-gray-200 shadow-md rounded-lg overflow-hidden">
            <thead className="bg-purple-100 dark:bg-purple-800 text-purple-700 dark:text-gray-100 sticky top-0 z-10">
              <tr>
                <th className="px-4 py-2 text-left font-medium">S.No</th>
                <th className="px-4 py-2 text-left font-medium">Store Name</th>
                <th className="px-4 py-2 text-left font-medium">Address</th>
                <th className="px-4 py-2 text-left font-medium">Status</th>
                <th className="px-4 py-2 text-left font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200">
              {storeData.map((store, index) => (
                <tr key={store.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">{store.name}</td>
                  <td className="px-4 py-2">{store.address}</td>
                  <td className="px-4 py-2">
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                      store.isActive
                        ? "bg-green-100 text-green-700 dark:bg-green-700 dark:text-white"
                        : "bg-red-100 text-red-700 dark:bg-red-700 dark:text-white"
                    }`}>
                      {store.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-4 py-2 flex gap-2">
                    <button title="View" className="p-2 rounded-full bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-white border border-purple-400 hover:bg-purple-600 hover:text-white transition-all" onClick={() => handleView(store)}><FaEye size={16} /></button>
                    <button
  title="Add Credentials"
  className="p-2 rounded-full bg-yellow-100 text-yellow-700 dark:bg-yellow-950 dark:text-white border border-yellow-400 hover:bg-yellow-600 hover:text-white transition-all"
  onClick={() => handleOpenCredentialsModal(store)}
>
  <IoAdd size={16} />
</button>

                    <button title="Delete" className="p-2 rounded-full bg-red-100 text-red-700 dark:bg-red-950 dark:text-white border border-red-400 hover:bg-red-600 hover:text-white transition-all" onClick={() => handleDelete(store)}><FaTrash size={16} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* View Modal */}
      <Modal isOpen={isViewModalOpen} onClose={() => { setIsViewModalOpen(false); setEditingField(null); }} title={<h2 className="text-lg font-semibold text-purple-700">Store Details</h2>} size="xl">
        {selectedStore && (
          <div className="space-y-6 max-h-[70vh] overflow-y-auto px-1">
            {[{
              title: "Basic Info",
              rows: [
                ["Store Name", selectedStore.name, "name"],
                ["Address", selectedStore.address, "address"],
                ["Status", selectedStore.isActive ? "Active" : "Inactive", "isActive"],
                ["Store Type", selectedStore.storeType || "Not Available", "storeType"],
                ["Established", selectedStore.establishedDate || "Not Available", "establishedDate"]
              ]
            }, {
              title: "Contact Info",
              rows: [
                ["Phone", selectedStore.phone || "Not Available", "phone"],
                ["Email", selectedStore.email || "Not Available", "email"],
                ["Manager", selectedStore.manager || "Not Available", "manager"]
              ]
            }, {
              title: "Operational Info",
              rows: [
                ["Staff Count", selectedStore.staffCount || "Not Available", "staffCount"],
                ["Customers Served", selectedStore.customersServed || "Not Available", "customersServed"],
                ["Service Time", selectedStore.timing || "Not Available", "timing"],
                ["Rating", selectedStore.rating ? `${selectedStore.rating} / 5` : "Not Rated", "rating"]
              ]
            }, {
              title: "Additional Info",
              rows: [
                ["GST Number", selectedStore.gstNumber || "Not Available", "gstNumber"],
                ["Services", selectedStore.services || "Not Available", "services"],
                ["Google Maps", selectedStore.mapLink ? <a href={selectedStore.mapLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">View on Map</a> : "Not Available", "mapLink"]
              ]
            }].map((section, idx) => (
              <div key={idx} className="bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg shadow-md">
                <div className="bg-purple-100 dark:bg-purple-800 px-4 py-2 rounded-t-lg flex justify-between items-center">
                  <h3 className="text-md font-semibold text-purple-700 dark:text-white">{section.title}</h3>
                </div>
                <table className="w-full text-sm">
                  <tbody>
                    {section.rows.map(([label, value, field], i) => (
                      <tr key={i} className={i % 2 === 0 ? "bg-gray-50 dark:bg-gray-800" : "bg-white dark:bg-gray-900"}>
                        <td className="py-2 px-4 font-medium text-gray-600 dark:text-gray-300 border-t border-gray-200 dark:border-gray-700 w-1/3">{label}</td>
                        <td className="py-2 px-4 text-gray-800 dark:text-gray-100 border-t border-gray-200 dark:border-gray-700">
                          {editingField === field ? (
                            <input
                              type="text"
                              value={editValue}
                              onChange={(e) => setEditValue(e.target.value)}
                              className="w-full px-2 py-1 border border-gray-300 rounded"
                            />
                          ) : (
                            value
                          )}
                        </td>
                        <td className="py-2 px-4 text-right border-t border-gray-200 dark:border-gray-700 w-10">
                          {editingField === field ? (
                            <button
                              onClick={() => {
                                const updatedStore = { ...selectedStore, [field]: editValue };
                                setSelectedStore(updatedStore);
                                setEditingField(null);
                              }}
                              className="text-green-600 hover:text-green-800 font-semibold text-sm"
                            >
                              Save
                            </button>
                          ) : (
                            <button
                              title={`Edit ${label}`}
                              onClick={() => {
                                setEditingField(field);
                                setEditValue(typeof value === "string" ? value : "");
                              }}
                              className="text-yellow-600 hover:text-yellow-800"
                            >
                              <FaEdit size={14} />
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
          </div>
        )}
      </Modal>

      {/* Delete Confirmation Modal */}
<Modal
  isOpen={isDeleteModalOpen}
  onClose={() => setIsDeleteModalOpen(false)}
  title={<h2 className="text-lg font-semibold text-red-600">Confirm Deletion</h2>}
>
  <div className="text-gray-800 dark:text-gray-100 p-4">
    <p>Are you sure you want to delete <strong>{selectedStore?.name}</strong>?</p>
    <div className="mt-6 flex justify-end gap-4">
      <button
        onClick={() => setIsDeleteModalOpen(false)}
        className="px-4 py-2 bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-white rounded hover:bg-gray-400 dark:hover:bg-gray-600"
      >
        Cancel
      </button>
      <button
        onClick={handleConfirmDelete}
        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
      >
        Confirm Delete
      </button>
    </div>
  </div>
</Modal>

{/* Credentials Modal */}
<Modal
  isOpen={isCredentialsModalOpen}
  onClose={() => setIsCredentialsModalOpen(false)}
  title={
    <div className="flex items-center gap-2 text-blue-700 dark:text-blue-300">
      <FaEdit className="text-blue-600 dark:text-blue-400" />
      <h2 className="text-lg font-semibold">Add Store Credentials</h2>
    </div>
  }
>
  <div className="text-gray-800 dark:text-gray-100 px-6 py-6 space-y-5">
    {/* Username */}
    <div className="space-y-1.5">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        Username
      </label>
      <input
        type="text"
        value={credentials.username}
        onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
        placeholder="Enter store username"
        className="w-full px-4 py-2 border rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    {/* Password */}
    <div className="space-y-1.5">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        Password
      </label>
      <input
        type="password"
        value={credentials.password}
        onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
        placeholder="Enter store password"
        className="w-full px-4 py-2 border rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    {/* Role Select */}
    <div className="space-y-1.5">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        Role / Store Type
      </label>
      <Select
        options={[
          { value: 'Front Desk Executive', label: 'Front Desk Executive' },
          { value: 'Engineer', label: 'Engineer' },
          { value: 'Support Staff', label: 'Support Staff' },
        ]}
        value={
          credentials.storeType
            ? {
                value: credentials.storeType,
                label:
                  credentials.storeType.charAt(0).toUpperCase() +
                  credentials.storeType.slice(1),
              }
            : null
        }
        onChange={(selected) =>
          setCredentials({ ...credentials, storeType: selected.value })
        }
        placeholder="Select role"
        className="react-select-container text-sm"
        classNamePrefix="react-select"
        styles={{
          control: (base, state) => ({
            ...base,
            backgroundColor: 'white',
            borderColor: state.isFocused ? '#3b82f6' : '#d1d5db',
            boxShadow: state.isFocused ? '0 0 0 1px #3b82f6' : 'none',
            '&:hover': { borderColor: '#3b82f6' },
            borderRadius: '0.375rem',
            padding: '1px',
          }),
          menu: (base) => ({
            ...base,
            backgroundColor: 'white',
            borderRadius: '0.375rem',
            zIndex: 50,
          }),
        }}
      />
    </div>

    {/* Buttons */}
    <div className="flex justify-end gap-4 pt-6">
      <button
        onClick={() => setIsCredentialsModalOpen(false)}
        className="px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-shadow"
      >
        Cancel
      </button>
      <button
        onClick={() => {
          const updated = storeData.map((store) =>
            store.id === selectedStore.id
              ? { ...store, ...credentials }
              : store
          );
          setStoreData(updated);
          setIsCredentialsModalOpen(false);
        }}
        className="px-5 py-2 rounded-md bg-gradient-to-r from-blue-600 to-blue-500 text-white hover:from-blue-700 hover:to-blue-600 transition shadow-md hover:shadow-lg"
      >
        Save Credentials
      </button>
    </div>
  </div>
</Modal>




    </div>
  );
}
