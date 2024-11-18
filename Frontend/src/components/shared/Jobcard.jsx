import React from 'react';

const Jobcard = (props) => {
  return (
    <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200 hover:bg-blue-300">
      <div className="flex items-center mb-4">
        <img src="https://via.placeholder.com/50" alt={`${props.company} logo`} className="w-10 h-10 rounded-full mr-3" />
        <div>
          <h3 className="font-semibold text-lg">{props.company}</h3>
          <p className="text-sm text-gray-500">{props.location}</p>
        </div>
      </div>
      <h2 className="text-xl font-bold text-gray-800 mb-2">{props.title}</h2>
      <p className="text-sm text-gray-600 mb-4">{props.description}</p>
      <div className="flex items-center space-x-3 mb-4 text-sm">
        <span className="bg-blue-100 text-blue-700 py-1 px-3 rounded-full">{props.positions} positions</span>
        <span className="bg-purple-100 text-purple-700 py-1 px-3 rounded-full">{props.role}</span>
        <span className="bg-green-100 text-green-700 py-1 px-3 rounded-full">{props.salaryRange}</span>
      </div>
      <div className="flex justify-between items-center">
        <button className="text-blue-600 hover:underline font-medium">Details</button>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition-colors">
          Save For Later
        </button>
      </div>
    </div>
  );
};

export default Jobcard;