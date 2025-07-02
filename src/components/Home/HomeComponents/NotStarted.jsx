import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MdContentCopy } from 'react-icons/md';

function NotStarted() {
  const [copiedId, setCopiedId] = useState(null);

  const todoList = [
    { id: 1, jobSheet: 'JS1001', applicant: 'Arjun Mehta' },
    { id: 2, jobSheet: 'JS1002', applicant: 'Sneha Reddy' },
    { id: 3, jobSheet: 'JS1003', applicant: 'Rahul Das' },
    { id: 4, jobSheet: 'JS1004', applicant: 'Meera Nair' },
    { id: 5, jobSheet: 'JS1005', applicant: 'Meera' },
  ];

  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500); // reset after 1.5s
  };

  return (
    <div className="p-2 space-y-3 max-h-[60vh] overflow-y-auto">
      {todoList.map((item) => (
        <div
          key={item.id}
          className="border border-gray-200 dark:bg-gray-800 hover:shadow-lg rounded-lg p-3 shadow-sm bg-white"
        >
          <div className="flex justify-between items-center text-sm font-semibold text-gray-800">
            <span className='dark:text-white'>ID: {item.id}</span>
            <div className="flex items-center gap-2">
              <Link
                to={`/jobsheet/${item.jobSheet}`}
                className="hover:text-black hover:underline"
              >
                {item.jobSheet}
              </Link>
              <button
                onClick={() => handleCopy(item.jobSheet, item.id)}
                className="text-gray-500 bg-white dark:text-white dark:bg-white  hover:text-purple-600"
              >
                <MdContentCopy className=' ' size={16} />
              </button>
              {copiedId === item.id && (
                <span className="text-green-500 text-xs">Copied!</span>
              )}
            </div>
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Applicant: {item.applicant}
          </div>
        </div>
      ))}
    </div>
  );
}

export default NotStarted;
