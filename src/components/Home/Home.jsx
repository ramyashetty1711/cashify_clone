import React, { useState } from "react";
import { MdContentCopy, MdHourglassEmpty, MdBuild, MdCheckCircle, MdLocalShipping, MdListAlt } from "react-icons/md";

export default function Home() {
 const workOrders = [
  { id: 1, jobSheet: "JS1001", applicant: "Arjun Mehta", status: "not_started" },
  { id: 2, jobSheet: "JS1002", applicant: "Sneha Reddy", status: "not_started" },
  { id: 3, jobSheet: "JS1003", applicant: "Rahul Das", status: "in_repair" },
  { id: 4, jobSheet: "JS1004", applicant: "Meera Nair", status: "repaired" },
  { id: 5, jobSheet: "JS1005", applicant: "Meera", status: "handover" },
  { id: 6, jobSheet: "JS1006", applicant: "Ravi", status: "repaired" },
  { id: 7, jobSheet: "JS1007", applicant: "Vikram", status: "not_started" },
  { id: 8, jobSheet: "JS1008", applicant: "Pooja", status: "in_repair" },
  { id: 9, jobSheet: "JS1009", applicant: "Divya", status: "handover" },
  { id: 10, jobSheet: "JS1010", applicant: "Anil", status: "repaired" },
];


  const statusConfig = [
    { key: "all", label: "All", icon: <MdListAlt />, color: "gray" },
    { key: "not_started", label: "Not Started", icon: <MdHourglassEmpty />, color: "red" },
    { key: "in_repair", label: "In Repair", icon: <MdBuild />, color: "yellow" },
    { key: "repaired", label: "Repaired", icon: <MdCheckCircle />, color: "green" },
    { key: "handover", label: "Handover", icon: <MdLocalShipping />, color: "blue" },
  ];

  const [activeStatus, setActiveStatus] = useState("all");
  const [copiedId, setCopiedId] = useState(null);

  const getCount = (status) =>
    status === "all"
      ? workOrders.length
      : workOrders.filter((w) => w.status === status).length;

  const filteredOrders =
    activeStatus === "all"
      ? workOrders
      : workOrders.filter((item) => item.status === activeStatus);

  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  return (
    <div className="w-full h-full p-4 bg-white dark:bg-black rounded-lg">

      {/* Segmented Control */}
      <div className="flex flex-wrap gap-2 justify-start md:justify-center mb-6">
        {statusConfig.map(({ key, label, icon, color }) => (
          <button
            key={key}
            onClick={() => setActiveStatus(key)}
            className={`flex items-center gap-6 px-4 py-2 rounded-full font-medium border-2 text-sm shadow-sm transition-all duration-200
              ${
                activeStatus === key
                  ? `bg-${color}-100 text-${color}-900 border-${color}-600 dark:bg-${color}-900 text-purple-500 dark:text-white`
                  : `bg-white text-gray-700 border-gray-300 hover:bg-${color}-50 hover:border-${color}-500 dark:bg-gray-800 dark:text-gray-300`
              }`}
          >
            {icon}
            <span>{label}</span>
            <span
              className={`text-xs font-bold px-2 py-0.5 rounded-full bg-${color}-200 text-${color}-800 dark:bg-${color}-800 dark:text-white`}
            >
              {getCount(key)}
            </span>
          </button>
        ))}
      </div>

      {/* Filtered Cards */}
      <div className="space-y-3 overflow-x-auto max-h-[62vh] custom-scrollbar  pr-2">
        {filteredOrders.length === 0 ? (
          <p className="text-purple-700 font-medium">No work orders found.</p>
        ) : (
          filteredOrders.map((item) => (
            <div
              key={item.id}
              className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 hover:shadow-lg rounded-lg p-3 shadow-sm text-gray-800 dark:text-gray-200"
            >
              <div className="flex justify-between items-center text-sm font-semibold">
                <span>ID: {item.id}</span>
                <div className="flex items-center gap-2">
                  <span className="text-purple-800 dark:text-blue-300 font-bold">{item.jobSheet}</span>
                  <button
                    onClick={() => handleCopy(item.jobSheet, item.id)}
                    className="text-purple-600 hover:text-blue-700 dark:text-blue-400"
                  >
                    <MdContentCopy size={16} />
                  </button>
                  {copiedId === item.id && (
                    <span className="text-blue-500 text-xs">Copied!</span>
                  )}
                </div>
              </div>
              <div className="text-sm mt-1 text-gray-600 dark:text-gray-400">
                Applicant: {item.applicant}
              </div>
              <div className="text-xs mt-1 italic text-gray-500 dark:text-gray-400">
                Status: {item.status.replaceAll("_", " ")}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
