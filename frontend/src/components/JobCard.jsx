import React from 'react';

const JobCard = ({ job }) => {
  return (
    <div className="border border-gray-200 p-6 rounded-lg shadow-md bg-white transition transform hover:-translate-y-2 hover:shadow-lg max-w-sm mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-xl text-gray-800">{job.title}</h3>
        <span className={`inline-block px-3 py-1 text-sm rounded-full ${job.type === 'Full-time' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
          {job.type}
        </span>
      </div>
      <p className="text-gray-600 mb-2"><span className="font-medium">Company:</span> {job.company}</p>
      <p className="text-gray-500 mb-4"><span className="font-medium">Location:</span> {job.location}</p>
      <p className="text-gray-700 mb-2"><span className="font-medium">Experience Required:</span> {job.experience} years</p>
      <p className="text-gray-700 mb-2"><span className="font-medium">Salary:</span> ${job.salary}</p>
      <p className="text-gray-500 mb-4">{job.description.slice(0, 120)}...</p>
      <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition-colors duration-300 w-full">
        Apply Now
      </button>
    </div>
  );
};

export default JobCard;
