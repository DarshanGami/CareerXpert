// ReviewSection.jsx
import React, { useState } from 'react';

const ReviewSection = () => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleStarClick = (index) => {
    setRating(index + 1); // Set rating based on the clicked star index (1-5)
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4">Reviews</h2>
      <div className="flex items-center mb-4">
        {[...Array(5)].map((_, index) => (
          <span
            key={index}
            onClick={() => handleStarClick(index)}
            className={`cursor-pointer text-2xl ${index < rating ? 'text-yellow-500' : 'text-gray-400'}`}
          >
            ★
          </span>
        ))}
      </div>
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Write your comment here..."
        className="w-full p-2 border border-gray-300 rounded-md"
        rows="4"
      />
      <button
        onClick={() => alert(`Rating: ${rating}\nComment: ${comment}`)}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        Submit Review
      </button>
    </div>
  );
};

export default ReviewSection;
