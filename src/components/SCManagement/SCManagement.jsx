import React, { useState } from "react";
import { FaStar, FaSearch, FaDownload } from "react-icons/fa";
import Modal from "../Common/Modal";
import Select from "react-select";
import * as XLSX from "xlsx";

const serviceCenter = {
  name: "QuickFix Mobile Service Center",
  overallRating: 4.6,
};

const applicants = [
  {
    name: "Ravi Kumar",
    ratings: [
      {
        service: "Camera Repair",
        rating: 2.0,
        jobId: "JOB125",
        review: "Crystal clear camera now!",
        explanationRating: "Good",
        helpfulnessRating: "Excellent",
        overallServiceRating: 4,
        overallSatisfaction: "Good",
        wouldRecommend: "Yes",
        improvementSuggestion: "Better instructions",
      },
    ],
  },
  {
    name: "Anjali Rao",
    ratings: [
      {
        service: "Screen Repair",
        rating: 4.5,
        jobId: "JOB123",
        review: "Quick and clean fix!",
        explanationRating: "Excellent",
        helpfulnessRating: "Good",
        overallServiceRating: 5,
        overallSatisfaction: "Excellent",
        wouldRecommend: "Yes",
        improvementSuggestion: "Faster response time",
      },
    ],
  },
  {
    name: "Ravi Kumar",
    ratings: [
      {
        service: "Camera Repair",
        rating: 4.6,
        jobId: "JOB125",
        review: "Crystal clear camera now!",
        explanationRating: "Good",
        helpfulnessRating: "Excellent",
        overallServiceRating: 4,
        overallSatisfaction: "Good",
        wouldRecommend: "Yes",
        improvementSuggestion: "Better instructions",
      },
    ],
  },
];

const ratingOptions = [
  { value: "", label: "All Ratings" },
  { value: "4.0", label: "4.0 & above" },
  { value: "3.0", label: "3.0 & above" },
  { value: "2.0", label: "2.0 & above" },
];

export default function SCManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [minRating, setMinRating] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedReviewData, setSelectedReviewData] = useState(null);

  const filteredApplicants = applicants
    .filter((a) => a.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .map((a) => ({
      ...a,
      ratings: a.ratings.filter((r) =>
        minRating ? r.rating >= parseFloat(minRating) : true
      ),
    }))
    .filter((a) => a.ratings.length > 0);

  const handleExport = () => {
    const exportData = [];
    filteredApplicants.forEach((a) => {
      a.ratings.forEach((r) => {
        exportData.push({
          Name: a.name,
          Service: r.service,
          JobID: r.jobId,
          Rating: r.rating,
          Review: r.review,
        });
      });
    });
    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Ratings");
    XLSX.writeFile(wb, "ServiceRatings.xlsx");
  };

  return (
    <div className="w-full h-full p-4 bg-white dark:bg-gray-900 rounded-lg">
      {/* Header */}
      <div className="flex items-center justify-between border-b pb-2 mb-4">
        <div>
          <h2 className="text-lg font-semibold text-purple-700">
            {serviceCenter.name}
          </h2>
          <div className="flex items-center text-yellow-500 text-sm">
            <FaStar className="mr-1" />
            <span className="text-gray-700 dark:text-white font-medium">
              Overall Rating: {serviceCenter.overallRating}
            </span>
          </div>
        </div>
        <button
          onClick={handleExport}
          className="flex items-center gap-2 px-3 py-1 text-sm rounded bg-purple-600 hover:bg-purple-700 text-white shadow-sm"
        >
          <FaDownload /> Export
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-3 mb-5">
        <div className="relative w-full md:w-1/2">
          <FaSearch className="absolute top-2.5 left-3 text-gray-400 text-sm" />
          <input
            type="text"
            placeholder="Search by name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-3 py-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-purple-500 focus:outline-none text-black"
          />
        </div>
        <Select
          options={ratingOptions}
          value={ratingOptions.find((opt) => opt.value === minRating)}
          onChange={(s) => setMinRating(s.value)}
          isSearchable={false}
          className="w-full md:w-1/2 text-sm text-black"
          styles={{
            control: (base) => ({
              ...base,
              minHeight: "36px",
              borderColor: "#d1d5db",
              fontSize: "0.875rem",
            }),
          }}
        />
      </div>

      {/* Ratings */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[56vh] overflow-y-auto pr-1">
        {filteredApplicants.map((a, idx) =>
          a.ratings.map((r, i) => (
            <div
              key={`${idx}-${i}`}
              className="p-3 border border-gray-200 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-800 hover:shadow-md transition cursor-pointer"
              onClick={() => {
                setSelectedReviewData({ ...r, name: a.name });
                setIsModalOpen(true);
              }}
            >
              <h4 className="text-sm font-semibold text-purple-600 mb-1">
                {a.name}
              </h4>
              <p className="text-xs text-gray-600">Service: {r.service}</p>
              <p className="text-xs text-gray-500">Job ID: {r.jobId}</p>
              <div className="flex items-center mt-1 text-yellow-500 text-sm">
                <FaStar className="mr-1" />
                <span className="text-gray-800 dark:text-white font-semibold">
                  {r.rating}
                </span>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal */}
      <Modal
        size="xl"
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={
          <h2 className="text-lg text-purple-600 font-bold">Review Details</h2>
        }
      >
        {selectedReviewData && (
          <div className="space-y-3 max-h-[70vh] border p-5 rounded-lg overflow-y-auto text-gray-700 text-sm custom-scrollbar">
            <p>
              <strong>Service:</strong> {selectedReviewData.service}
            </p>
            <p>
              <strong>Job ID:</strong> {selectedReviewData.jobId}
            </p>
            <p>
              <strong>Review:</strong>{" "}
              <em>{selectedReviewData.review}</em>
            </p>
            <hr className="my-2" />
            <p className="p-2 border border-gray-200 rounded-lg">
              <strong>Did the engineer clearly explain the solution?</strong>
              <br />
              <span className="text-purple-700">
                {selectedReviewData.explanationRating}
              </span>
            </p>
            <p className="p-2 border border-gray-200 rounded-lg">
              <strong>Helpfulness of the engineer?</strong>
              <br />
              <span className="text-purple-700">
                {selectedReviewData.helpfulnessRating}
              </span>
            </p>
            <p className="p-2 border border-gray-200 rounded-lg">
              <strong>Overall Service Rating (1–5)?</strong>
              <br />
              <span className="text-purple-700">
                {selectedReviewData.overallServiceRating}
              </span>
            </p>
            <p className="p-2 border border-gray-200 rounded-lg">
              <strong>Overall Satisfaction?</strong>
              <br />
              <span className="text-purple-700">
                {selectedReviewData.overallSatisfaction}
              </span>
            </p>
            <p className="p-2 border border-gray-200 rounded-lg">
              <strong>Would Recommend?</strong>
              <br />
              <span className="text-purple-700">
                {selectedReviewData.wouldRecommend}
              </span>
            </p>
            <p className="p-2 border border-gray-200 rounded-lg">
              <strong>Improvement Suggestion:</strong>
              <br />
              <span className="text-purple-700 italic">
                {selectedReviewData.improvementSuggestion}
              </span>
            </p>
          </div>
        )}
      </Modal>
    </div>
  );
}
