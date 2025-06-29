import React from "react";
import { useSelector } from "react-redux";
import { store } from "../../redux/store";
import { ActiveFilterUpdate } from "../../redux/DataSlice";

import NotStarted from "./HomeComponents/NotStarted";
import InRepair from "./HomeComponents/InRepair";
import Repaired from "./HomeComponents/Repaired";
import Handover from "./HomeComponents/Handover";
import RepairChangeApprovalProcess from "./HomeComponents/RepairChangeApprovalProcess";
import RepairChange from "./HomeComponents/RepairChange";

export default function Home() {
  const CurrentFilter = useSelector((state) => state.data.ActiveFilter);

  const StatusDisplay = [
    { display: "Not Started", key: "not_started", count: 5 },
    { display: "In Repair Process", key: "in_repair", count: 3 },
    { display: "Repaired", key: "repaired", count: 8 },
    { display: "Handover", key: "handover", count: 2 },
    { display: "Repair Change Approval Process", key: "repair_change_approval_process", count: 1 },
    { display: "Repair Change", key: "repair_change", count: 4 },
  ];

  const renderComponent = () => {
    switch (CurrentFilter) {
      case "not_started":
        return <NotStarted />;
      case "in_repair":
        return <InRepair />;
      case "repaired":
        return <Repaired />;
      case "handover":
        return <Handover />;
      case "repair_change_approval_process":
        return <RepairChangeApprovalProcess />;
      case "repair_change":
        return <RepairChange />;
      default:
        return <div className="mt-6 text-gray-500">Please select a tab to view content.</div>;
    }
  };

  return (
    <div className="flex flex-col justify-start min-h-full bg-white dark:bg-black rounded-lg pt-8 px-2">
      {/* Tab Buttons Section */}
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 sm:flex-wrap">
        {StatusDisplay.map((val) => {
          const isActive = CurrentFilter === val.key;

          return (
            <div
              key={val.key}
              role="button"
              tabIndex={0}
              className={`relative shrink-0 sm:shrink basis-[9rem] sm:basis-auto px-3 py-4 mt-1 text-center border-2 dark:bg-gray-900 rounded-lg font-semibold transition-all duration-200 select-none shadow-sm cursor-pointer whitespace-nowrap
                ${
                  isActive
                    ? "bg-purple-100 text-purple-800 border-purple-600 shadow-md"
                    : "bg-white text-gray-600 border-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:shadow"
                }`}
              onClick={() => store.dispatch(ActiveFilterUpdate(val.key))}
              onKeyDown={(e) => e.key === "Enter" && store.dispatch(ActiveFilterUpdate(val.key))}
            >
              {/* Count Badge */}
              <span className="absolute -top-2 -right-2 text-xs bg-red-600 text-white rounded-full px-2 py-0.5 font-bold shadow-md border-2 border-white">
                {val.count}
              </span>

              {val.display}
            </div>
          );
        })}
      </div>

      {/* Tab Content Section */}
      <div className="mt-4">{renderComponent()}</div>
    </div>
  );
}

