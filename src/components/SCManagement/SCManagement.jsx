import React, { useState } from 'react';
import { FaStar, FaSearch, FaDownload } from 'react-icons/fa';
import Select from 'react-select';
import * as XLSX from 'xlsx';

const serviceCenter = {
  name: "QuickFix Mobile Service Center",
  overallRating: 4.6,
};

const applicants = [
  {
    name: "Anjali Rao",
    ratings: [
      {
        service: "Screen Repair",
        rating: 4.5,
        jobId: "JOB123",
        review: "Quick and clean fix!",
      },
      {
        service: "Battery Replacement",
        rating: 4.7,
        jobId: "JOB124",
        review: "Battery life improved significantly.",
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
      },
      {
        service: "Software Update",
        rating: 4.3,
        jobId: "JOB126",
        review: "Update solved lag issues.",
      },
    ],
  },
  {
    name: "Sneha Mehta",
    ratings: [
      {
        service: "Speaker Repair",
        rating: 4.2,
        jobId: "JOB127",
        review: "Good volume restoration.",
      },
      {
        service: "Charging Port",
        rating: 4.8,
        jobId: "JOB128",
        review: "Charges super fast now!",
      },
    ],
  },
];

const ratingOptions = [
  { value: '', label: 'All Ratings' },
  { value: '4.0', label: '4.0+' },
  { value: '4.5', label: '4.5+' },
  { value: '4.7', label: '4.7+' },
];

function SCManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [minRating, setMinRating] = useState('');

  const filteredApplicants = applicants
    .filter((applicant) =>
      applicant.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .map((applicant) => ({
      ...applicant,
      ratings: applicant.ratings.filter((r) =>
        minRating ? r.rating >= parseFloat(minRating) : true
      ),
    }))
    .filter((applicant) => applicant.ratings.length > 0);

  const handleExport = () => {
    const exportData = [];
    filteredApplicants.forEach((applicant) => {
      applicant.ratings.forEach((rating) => {
        exportData.push({
          Name: applicant.name,
          Service: rating.service,
          JobID: rating.jobId,
          Rating: rating.rating,
          Review: rating.review,
        });
      });
    });

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Ratings");
    XLSX.writeFile(workbook, "ServiceRatings.xlsx");
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen bg-white rounded-lg ml-2">
      {/* Service Center Rating */}
      <div className="bg-purple-100 border-l-8 border-purple-600 rounded-lg p-4 mb-6 shadow-md">
        <h2 className="text-xl font-bold text-purple-800">{serviceCenter.name}</h2>
        <div className="flex items-center text-yellow-500 text-lg mt-2">
          <FaStar className="mr-2" />
          <span className="text-gray-800 font-semibold">
            Overall Rating: {Math.round(serviceCenter.overallRating)}
          </span>
        </div>
      </div>

      {/* Search & Filter Section */}
      <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 shadow-sm mb-6">
        <h3 className="text-lg font-semibold text-purple-700 mb-4">Filter Applicants</h3>
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          {/* Left: Search */}
          <div className="relative w-full sm:w-1/2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Search by Name</label>
            <div className="relative">
              <FaSearch className="absolute top-3 left-3 text-gray-400" />
              <input
                type="text"
                placeholder="Enter applicant name"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full focus:ring-2 focus:ring-purple-500 focus:outline-none text-black"
              />
            </div>
          </div>

          {/* Right: Filter and Export */}
          <div className="flex flex-col sm:flex-row gap-4 sm:w-1/2 justify-end">
            {/* Rating Filter */}
            <div className="w-full sm:w-2/3">
              <label className="block text-sm font-medium text-gray-700 mb-1">Minimum Rating</label>
              <Select
                options={ratingOptions}
                defaultValue={ratingOptions[0]}
                onChange={(selected) => setMinRating(selected.value)}
                isSearchable={false}
                styles={{
                  control: (base) => ({
                    ...base,
                    padding: '2px',
                    borderColor: '#D1D5DB',
                    boxShadow: 'none',
                    borderRadius: '6px',
                    backgroundColor: 'white',
                    color: 'black',
                  }),
                  menu: (base) => ({ ...base, zIndex: 999 }),
                  option: (base, state) => ({
                    ...base,
                    color: 'black',
                    backgroundColor: state.isFocused ? '#EDE9FE' : 'white',
                  }),
                  singleValue: (base) => ({ ...base, color: 'black' }),
                }}
              />
            </div>

            {/* Export Button */}
            <div className="sm:w-auto">
              <label className="block text-sm font-medium text-transparent mb-1">Export</label>
              <button
                onClick={handleExport}
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md shadow w-full"
              >
                <FaDownload className="inline mr-2" /> Download
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Applicant Ratings */}
      <h2 className="text-xl text-purple-600 font-bold text-center mb-6">Service Ratings by Applicants</h2>

      {filteredApplicants.length === 0 ? (
        <p className="text-center text-gray-600">No matching applicants found.</p>
      ) : (
        filteredApplicants.map((applicant, index) => (
          <div key={index} className="bg-white rounded-lg border border-purple-600 p-4 mb-6">
            <h2 className="text-lg font-semibold mb-3 text-gray-500">
              Name: <span className="text-purple-600">{applicant.name}</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {applicant.ratings.map((item, idx) => (
                <div key={idx} className="border rounded-lg p-3 bg-gray-50 shadow-sm">
                  <p className="text-sm font-medium text-gray-700">Service: {item.service}</p>
                  <p className="text-sm text-gray-600">
                    Job ID: <span className="font-semibold">{item.jobId}</span>
                  </p>

                  <div className="grid grid-cols-12 gap-2 mt-2">
                    <div className="flex items-center text-yellow-500 text-sm col-span-12 md:col-span-2">
                      <FaStar className="mr-1" />
                      <span className="text-gray-800 font-semibold">
                        {Math.round(item.rating)}
                      </span>
                    </div>
                    <div className="col-span-12 md:col-span-10">
                      <p className="text-sm italic text-gray-700 border-l-4 border-purple-400 pl-3">
                        “{item.review}”
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default SCManagement;
