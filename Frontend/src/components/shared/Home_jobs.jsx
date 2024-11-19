import React, { useState } from 'react';
import Jobcard from './Jobcard';
import RadioDropdown from './RadioDropdown';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';

const Home_jobs = () => {
  const [filters, setFilters] = useState({
    location: '',
    role: '',
    salaryRange: '',
  });

  // Update filters based on user selection
  const handleFilterChange = (name, value) => {
    setFilters({ ...filters, [name]: value });
  };

  const jobs = [
    {
      company: 'Google',
      location: 'Bengaluru',
      title: 'FullStack Developer',
      description: 'We need a senior Fullstack developer, who can write efficient code and work with frontend and backend.',
      positions: '2',
      role: 'Fullstack',
      salaryRange: '1Lakh-5Lakh',
    },
    {
      company: 'Microsoft',
      location: 'Delhi',
      title: 'Frontend Developer',
      description: 'Looking for a frontend developer who can create professional UI web pages.',
      positions: '3',
      role: 'Frontend',
      salaryRange: '42K-1Lakh',
    },
    {
      company: 'Amazon',
      location: 'Mumbai',
      title: 'Backend Developer',
      description: 'Seeking a backend developer proficient in database management and server-side logic.',
      positions: '1',
      role: 'Backend',
      salaryRange: '0-40K',
    },
    {
      company: 'Apple',
      location: 'Pune',
      title: 'DevOps Engineer',
      description: 'Hiring a DevOps engineer with expertise in CI/CD and cloud infrastructure.',
      positions: '2',
      role: 'DevOps',
      salaryRange: '42K-1Lakh',
    },
    {
      company: 'Facebook',
      location: 'Chennai',
      title: 'Data Scientist',
      description: 'Looking for a data scientist with expertise in data analysis and machine learning.',
      positions: '4',
      role: 'Data-Science',
      salaryRange: '1Lakh-5Lakh',
    },
    {
      company: 'Netflix',
      location: 'Delhi',
      title: 'Frontend Developer',
      description: 'We need a frontend developer who can create visually appealing and user-friendly designs.',
      positions: '1',
      role: 'Frontend',
      salaryRange: '0-40K',
    },
  ];

  const filteredJobs = jobs.filter((job) => {
    return (
      (!filters.location || job.location === filters.location) &&
      (!filters.role || job.role === filters.role) &&
      (!filters.salaryRange || job.salaryRange === filters.salaryRange)
    );
  });

  return (
    <div>
      <Navbar />
      <div className="flex gap-10 min-h-screen">
        {/* Sidebar for filters */}
        <div className="flex flex-col bg-gray-100 p-4 space-y-4">
          <RadioDropdown
            title="Location"
            name="location"
            options={[
              { value: '', label: 'All' },
              { value: 'Delhi', label: 'Delhi' },
              { value: 'Bengaluru', label: 'Bengaluru' },
              { value: 'Pune', label: 'Pune' },
              { value: 'Mumbai', label: 'Mumbai' },
              { value: 'Chennai', label: 'Chennai' },
            ]}
            selected={filters.location}
            onChange={(value) => handleFilterChange('location', value)}
          />
          <RadioDropdown
            title="Role"
            name="role"
            options={[
              { value: '', label: 'All' },
              { value: 'Frontend', label: 'Frontend' },
              { value: 'Backend', label: 'Backend' },
              { value: 'Fullstack', label: 'Fullstack' },
              { value: 'DevOps', label: 'DevOps' },
              { value: 'Data-Science', label: 'Data-Science' },
            ]}
            selected={filters.role}
            onChange={(value) => handleFilterChange('role', value)}
          />
          <RadioDropdown
            title="Salary Range"
            name="salaryRange"
            options={[
              { value: '', label: 'All' },
              { value: '0-40K', label: '0-40K' },
              { value: '42K-1Lakh', label: '42K-1Lakh' },
              { value: '1Lakh-5Lakh', label: '1Lakh-5Lakh' },
            ]}
            selected={filters.salaryRange}
            onChange={(value) => handleFilterChange('salaryRange', value)}
          />
        </div>

        {/* Job Cards */}
        <div className="p-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job, index) => (
                 <Link to="/applyjobdcard"><Jobcard key={index} {...job} /></Link>
              ))
            ) : (
              <p className="text-gray-500 col-span-full">No jobs match the selected filters.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home_jobs;
