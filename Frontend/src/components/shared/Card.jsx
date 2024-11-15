// Card.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Card = (jobs) => {
  return (
    <div className="bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 text-white shadow-lg rounded-lg p-6 text-center transform transition duration-300 hover:scale-105 hover:shadow-xl">
    <Link to='/forget'>
      <h2 className="text-xl font-semibold text-black">{jobs.title}</h2>
      <p className="text-gray-800 mt-2">{jobs.description}</p>
      </Link>
    </div>
  );
};

export default Card;