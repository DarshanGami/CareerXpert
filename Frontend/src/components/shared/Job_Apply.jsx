// JobApplicationsList.jsx
import React from 'react';
import JobApplicationCard from './JobApplicationCard';
import google from './google.png';
import Navbar from './Navbar';
import Footer from './Footer';
import { Link } from 'react-router-dom';

const jobApplications = [
    {
        logo: {google}, // replace with actual logo URLs
        companyName: 'Google',
        role: 'Frontend Developer',
        appliedDate: '2024-10-01',
        status: 'Pending',
        resumelinks: '/',
    },
    {
        logo: {google},
        companyName: 'Microsoft',
        role: 'Backend Developer',
        appliedDate: '2024-10-05',
        status: 'Accepted',
        resumelinks: '/'
    },
    {
        logo: {google},
        companyName: 'Amazon',
        role: 'Data Scientist',
        appliedDate: '2024-10-10',
        status: 'Rejected',
        resumelinks: '/'
    },
    // Add more jobs as needed
];

const Job_Apply = () => {
    return (

        <div>
         
         <Navbar></Navbar>

        <div className="min-h-screen p-8">
            <h1 className="text-4xl font-bold text-blue-700 mb-8">My Job Applications</h1>
            {jobApplications.map((job, index) => (
                
               <Link to ="/jobdcard">

                <JobApplicationCard
                key={index}
                logo={job.logo}
                companyName={job.companyName}
                role={job.role}
                appliedDate={job.appliedDate}
                status={job.status}
                resumelinks={job.resumelinks}
                />

                </Link>

            ))}
        </div>

        <Footer></Footer>

    </div>
    );
};

export default Job_Apply;
