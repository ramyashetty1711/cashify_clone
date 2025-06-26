import React from "react";
import { FaUser, FaUserCircle } from "react-icons/fa";

export default function SideBarProfile() {
  return (
    <div className="flex flex-col justify-start min-h-[100%] bg-white rounded-lg pt-4 px-2">
      <div className="flex flex-col justify-center items-center content-center h-full text-gray-600">
        <div className="font-semibold text-xl mb-4">Current Logged In User:</div>
        <div className="text-left flex flex-col items-start w-full">
          <span className="text-lg font-semibold">Notice :</span>
        </div>
      </div>
    </div>
  );
}
