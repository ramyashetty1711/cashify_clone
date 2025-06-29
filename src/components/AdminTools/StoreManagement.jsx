import React, { useState } from "react";
import StoreDataJSON from "./StoreData.json";
import { FaEye, FaEdit, FaTrash, FaPlus, FaTimes } from "react-icons/fa";
import Modal from "../Common/Modal";
import StoreFormTabs from "./StoreFormTabs";

export default function StoreManagement() {
  const [storeData, setStoreData] = useState(StoreDataJSON);
  const [selectedStore, setSelectedStore] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);

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

  const handleEditSave = () => {
    if (!selectedStore.name.trim() || !selectedStore.address.trim()) {
      alert("Please fill in all fields.");
      return;
    }

    setStoreData((prevData) =>
      prevData.map((store) =>
        store.id === selectedStore.id ? selectedStore : store
      )
    );
    setIsEditModalOpen(false);
  };

  const handleConfirmDelete = () => {
    setStoreData((prevData) =>
      prevData.filter((store) => store.id !== selectedStore.id)
    );
    setIsDeleteModalOpen(false);
  };

  const handleAddStore = (newStore) => {
    const newId = Math.max(...storeData.map((s) => s.id)) + 1;
    const newEntry = { id: newId, ...newStore };
    setStoreData((prev) => [...prev, newEntry]);
    setShowAddForm(false);
  };

  return (
    <div className="p-4 min-h-[100vh] rounded-lg bg-white dark:bg-black">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
          Store Management
        </h2>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
            showAddForm
              ? "bg-red-600 text-white hover:bg-red-700"
              : "bg-purple-600 text-white hover:bg-purple-700"
          }`}
        >
          {showAddForm ? (
            <>
              <FaTimes className="text-white" />
              Close 
            </>
          ) : (
            <>
              <FaPlus className="text-white" />
              Add Store
            </>
          )}
        </button>
      </div>

      {showAddForm && (
        <div className="mb-6">
          <StoreFormTabs onAddStore={handleAddStore} />
        </div>
      )}

      {!showAddForm && (
        <div className="overflow-x-auto max-h-[80vh] custom-scrollbar mt-2">
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
                <tr
                  key={store.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">{store.name}</td>
                  <td className="px-4 py-2">{store.address}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                        store.isActive
                          ? "bg-green-100 text-green-700 dark:bg-green-700 dark:text-white"
                          : "bg-red-100 text-red-700 dark:bg-red-700 dark:text-white"
                      }`}
                    >
                      {store.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-4 py-2 flex gap-2">
                    <button
                      title="View"
                      className="p-2 rounded-full bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-white border border-purple-400 hover:bg-purple-600 hover:text-white transition-all"
                      onClick={() => handleView(store)}
                    >
                      <FaEye size={16} />
                    </button>
                    <button
                      title="Edit"
                      className="p-2 rounded-full bg-yellow-100 text-yellow-700 dark:bg-yellow-950 dark:text-white border border-yellow-400 hover:bg-yellow-600 hover:text-white transition-all"
                      onClick={() => handleEdit(store)}
                    >
                      <FaEdit size={16} />
                    </button>
                    <button
                      title="Delete"
                      className="p-2 rounded-full bg-red-100 text-red-700 dark:bg-red-950 dark:text-white border border-red-400 hover:bg-red-600 hover:text-white transition-all"
                      onClick={() => handleDelete(store)}
                    >
                      <FaTrash size={16} />
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
        title={<h2 className="text-lg font-semibold text-purple-700">Store Details</h2>}
        size="md"
      >
        {selectedStore && (
          <div className="text-gray-700 dark:text-gray-200 space-y-3">
            <p>
              <strong>Store Name:</strong> {selectedStore.name}
            </p>
            <p>
              <strong>Address:</strong> {selectedStore.address}
            </p>
            <p>
              <strong>Status:</strong>{" "}
              <span
                className={`ml-2 px-2 py-1 rounded text-sm ${
                  selectedStore.isActive
                    ? "bg-green-200 text-green-800"
                    : "bg-red-200 text-red-800"
                }`}
              >
                {selectedStore.isActive ? "Active" : "Inactive"}
              </span>
            </p>
          </div>
        )}
      </Modal>

      {/* Edit Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title={<h2 className="text-lg font-semibold text-yellow-700">Edit Store</h2>}
        size="md"
      >
        {selectedStore && (
          <div className="flex flex-col gap-4 dark:bg-black">
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Store Name
              </label>
              <input
                type="text"
                value={selectedStore.name}
                onChange={(e) =>
                  setSelectedStore({ ...selectedStore, name: e.target.value })
                }
                placeholder="Store Name"
                className="w-full mt-1 px-3 py-2 text-black rounded border border-gray-300 dark:bg-gray-800 dark:text-white"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Address
              </label>
              <textarea
                value={selectedStore.address}
                onChange={(e) =>
                  setSelectedStore({ ...selectedStore, address: e.target.value })
                }
                placeholder="Address"
                rows={3}
                className="w-full mt-1 px-3 py-2 text-black rounded border border-gray-300 dark:bg-gray-800 dark:text-white focus:outline-none focus:border-purple-600 resize-none"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Status
              </label>
              <select
                value={selectedStore.isActive ? "active" : "inactive"}
                onChange={(e) =>
                  setSelectedStore({
                    ...selectedStore,
                    isActive: e.target.value === "active",
                  })
                }
                className="w-full mt-1 text-black px-3 py-2 rounded border border-gray-300 dark:bg-gray-800 dark:text-white"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>

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

      {/* Delete Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title={<h2 className="text-lg font-semibold text-red-700">Confirm Delete</h2>}
        size="sm"
      >
        <p className="text-gray-700 dark:text-gray-200 mb-4">
          Are you sure you want to delete{" "}
          <strong>{selectedStore?.name}</strong>?
        </p>
        <div className="flex justify-end gap-3">
          <button
            onClick={() => setIsDeleteModalOpen(false)}
            className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-sm"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirmDelete}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
          >
            Delete
          </button>
        </div>
      </Modal>
    </div>
  );
}
