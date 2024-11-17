import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { Link } from 'react-router-dom';

const JobList = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  const route = () => {
    navigate('/userdetails'); // Navigate to the /userdetails route
  };

  const routetopostjob = () => {
    navigate('/post-job');
  };

  // Sample data for jobs
  const jobs = [
    { role: 'FullStack Developer', date: '2024-07-18', seats: 5, location: 'Bangalore' },
    { role: 'Backend Developer', date: '2024-07-18', seats: 3, location: 'Chennai' },
    { role: 'Data Science', date: '2024-07-18', seats: 7, location: 'Hyderabad' },
  ];

  return (
    <>
      <Navbar></Navbar>
      {/* Hero Section */}
      <div className="bg-white py-12 text-center">
        <div className="container mx-auto">
          <div className="flex justify-center items-center mb-4">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg"
              alt="Google Logo"
              className=" object-fill w-16 h-16 mr-3"
            />
            <p className="text-2xl font-semibold text-gray-800">Google Careers</p>
          </div>
          <h1 className="text-4xl font-bold">
            Search, Apply & Get Your <span className="text-blue-600">Dream Job at Google</span>
          </h1>
          <p className="text-lg mt-4 text-gray-600">
            Join one of the world's leading companies and start your journey to a successful career.
          </p>
        </div>
      </div>

      {/* Post Job Button */}
      <div className="flex justify-center my-8">
        <Link to="/post-job">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full shadow-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-400 focus:ring-opacity-50">
            Post Job
          </button>
        </Link>
      </div>

      {/* Job List Section */}
      <div className="flex flex-col items-center justify-center container mx-auto p-6 bg-white rounded-lg">
        <table className="min-w-lg divide-y divide-gray-200 bg-white">
          <thead className="bg-white">
            <tr>
              <th scope="col" className="px-20 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Role
              </th>
              <th scope="col" className="px-20 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Vacancies
              </th>
              <th scope="col" className="px-20 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Location
              </th>
              <th scope="col" className="px-20 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th scope="col" className="px-20 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {jobs.map((job, index) => (
              <tr
                onClick={route} // Call route function when the row is clicked
                key={index}
                className="hover:bg-gray-50 cursor-pointer" // Add cursor-pointer for better UX
              >
                <td className="px-20 py-4 whitespace-nowrap text-sm text-gray-900">{job.role}</td>
                <td className="px-20 py-4 whitespace-nowrap text-sm text-gray-900">{job.seats}</td>
                <td className="px-20 py-4 whitespace-nowrap text-sm text-gray-900">{job.location}</td>
                <td className="px-20 py-4 whitespace-nowrap text-sm text-gray-900">{job.date}</td>
                <td className="px-20 py-4 whitespace-nowrap text-sm flex space-x-3">
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent parent click event
                      routetopostjob(); // Navigate to post-job
                    }}
                    className="text-blue-600 hover:text-blue-800 px-6 py-4"
                  >
                    Edit
                  </button>
                  <button className="text-red-600 hover:text-red-800 px-6 py-4">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="mt-4 text-center text-sm text-gray-500">A list of your recent posted jobs</p>
      </div>
      <Footer></Footer>
    </>
  );
};

export default JobList;
