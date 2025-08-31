import React, { useState, useMemo } from "react";
import {
  MdContentCopy,
  MdHourglassEmpty,
  MdBuild,
  MdCheckCircle,
  MdLocalShipping,
  MdListAlt,
} from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  // --- Mock Data ---
  const initialOrders = [
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
    { key: "all", label: "Total", icon: <MdListAlt /> },
    { key: "not_started", label: "Not Started", icon: <MdHourglassEmpty /> },
    { key: "in_repair", label: "In Repair", icon: <MdBuild /> },
    { key: "repaired", label: "Repaired", icon: <MdCheckCircle /> },
    { key: "handover", label: "Handover", icon: <MdLocalShipping /> },
  ];

  // --- State ---
  const [orders] = useState(initialOrders);
  const [activeStatus, setActiveStatus] = useState("all");
  const [copiedId, setCopiedId] = useState(null);

  // --- Derived ---
  const getCount = (status) =>
    status === "all" ? orders.length : orders.filter((w) => w.status === status).length;

  const filteredOrders = useMemo(() => {
    if (activeStatus === "all") return orders;
    return orders.filter((o) => o.status === activeStatus);
  }, [orders, activeStatus]);

  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  // --- Color helpers ---
  const bgColor = {
    primary: "var(--primary)",
    secondary: "var(--secondary)",
  };

  const badgeColor = {
    not_started: bgColor.secondary,
    in_repair: bgColor.primary,
    repaired: bgColor.primary,
    handover: bgColor.secondary,
  };

  return (
    <div className="w-full h-full p-4 md:p-6 bg-white text-gray-900 rounded-lg">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1
            className="text-2xl md:text-3xl font-bold"
            style={{ color: bgColor.primary }}
          >
            Welcome back 👋
          </h1>
          <p className="text-sm" style={{ color: bgColor.secondary }}>
            Your device repair command center
          </p>
        </div>
      </div>

      {/* KPI Cards as Tabs */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4 mb-6">
        {statusConfig.map(({ key, label, icon }) => (
          <StatCard
            key={key}
            title={label}
            value={getCount(key)}
            icon={icon}
            accent={activeStatus === key ? bgColor.primary : bgColor.secondary}
            active={activeStatus === key}
            onClick={() => setActiveStatus(key)}
          />
        ))}
      </div>

      {/* Work Orders List */}
      <div className="space-y-3 overflow-x-auto h-[calc(100vh-350px)] pr-1">
        <AnimatePresence>
          {filteredOrders.length === 0 ? (
            <p style={{ color: bgColor.secondary }} className="font-medium">
              No work orders found.
            </p>
          ) : (
            filteredOrders.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="border border-gray-300 bg-white hover:shadow-md rounded-xl p-4 shadow-sm"
              >
                <div className="flex flex-wrap gap-3 items-center justify-between text-sm">
                  <div className="flex items-center gap-3">
                    <span
                      className="text-xs font-bold px-2 py-1 rounded border"
                      style={{ borderColor: bgColor.primary, color: bgColor.primary }}
                    >
                      ID: {item.id}
                    </span>
                    <div className="flex items-center gap-2">
                      <span style={{ color: bgColor.primary, fontWeight: "bold" }}>
                        {item.jobSheet}
                      </span>
                      <button
                        onClick={() => handleCopy(item.jobSheet, item.id)}
                        style={{ color: bgColor.secondary }}
                        title="Copy Job Sheet"
                      >
                        <MdContentCopy size={16} />
                      </button>
                      {copiedId === item.id && (
                        <span style={{ color: bgColor.primary }} className="text-xs">
                          Copied!
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span
                      className="text-xs px-2 py-1 rounded-full capitalize border"
                      style={{
                        borderColor: badgeColor[item.status],
                        color: badgeColor[item.status],
                      }}
                    >
                      {item.status.replaceAll("_", " ")}
                    </span>
                  </div>
                </div>

                <div className="mt-2 text-sm" style={{ color: bgColor.primary }}>
                  Applicant: <span className="font-medium">{item.applicant}</span>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon, accent, active, onClick }) {
  return (
    <motion.button
      onClick={onClick}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className={`rounded-xl border p-4 shadow-sm text-left transition-all ${
        active ? "bg-gray-50 shadow-md scale-[1.02]" : "hover:bg-gray-50"
      }`}
      style={{ borderColor: accent }}
    >
      <div className="flex items-center justify-between">
        <div>
          <p
            className="text-xs uppercase tracking-wide"
            style={{ color: "var(--secondary)" }}
          >
            {title}
          </p>
          <p className="text-2xl font-bold mt-1" style={{ color: accent }}>
            {value}
          </p>
        </div>
        <div className="p-2 rounded-xl border" style={{ borderColor: accent }}>
          <div className="text-2xl opacity-80" style={{ color: accent }}>
            {icon}
          </div>
        </div>
      </div>
    </motion.button>
  );
}
