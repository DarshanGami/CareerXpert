// src/ResumeTable.js
import React, { useState } from 'react';

const ResumeTable = () => {
    const [resumes, setResumes] = useState([
        { username: 'JohnDoe', resume: 'https://placehold.co/100x100', status: 'Pending' },
        { username: 'JaneSmith', resume: 'https://placehold.co/100x100', status: 'Pending' },
        { username: 'MikeJohnson', resume: 'https://placehold.co/100x100', status: 'Pending' },
        { username: 'EmilyDavis', resume: 'https://placehold.co/100x100', status: 'Pending' },
        { username: 'ChrisBrown', resume: 'https://placehold.co/100x100', status: 'Pending' },
        { username: 'PatriciaMiller', resume: 'https://placehold.co/100x100', status: 'Pending' },
        { username: 'RobertWilson', resume: 'https://placehold.co/100x100', status: 'Pending' },
        { username: 'LindaMoore', resume: 'https://placehold.co/100x100', status: 'Pending' },
        { username: 'DavidTaylor', resume: 'https://placehold.co/100x100', status: 'Pending' },
        { username: 'BarbaraAnderson', resume: 'https://placehold.co/100x100', status: 'Pending' },
        { username: 'JamesThomas', resume: 'https://placehold.co/100x100', status: 'Pending' },
        { username: 'SusanJackson', resume: 'https://placehold.co/100x100', status: 'Pending' },
        { username: 'MichaelWhite', resume: 'https://placehold.co/100x100', status: 'Pending' },
        { username: 'SarahHarris', resume: 'https://placehold.co/100x100', status: 'Pending' },
        { username: 'WilliamMartin', resume: 'https://placehold.co/100x100', status: 'Pending' },
    ]);

    const handleAccept = (index) => {
        const newResumes = [...resumes];
        newResumes[index].status = 'Accepted';
        setResumes(newResumes);
    };

    const handleReject = (index) => {
        const newResumes = [...resumes];
        newResumes[index].status = 'Rejected';
        setResumes(newResumes);
    };

    return (
       
        <div className=" flex items-center justify-center min-h-screen">

        <div className="container mx-auto mt-10 p-5 bg-white shadow-lg rounded-lg">
            <h1 className="text-2xl font-bold mb-5 text-center">Applied User Details</h1>
            <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
                <thead className="bg-blue-600">
                    <tr>
                        <th className="text-white text-center py-3 px-4 border-b ">Username</th>
                        <th className=" text-white text-center py-3 px-4 border-b ">Resume</th>
                        <th className="text-white text-center py-3 px-4 border-b ">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {resumes.map((resume, index) => (
                        <tr key={index} className="hover:bg-gray-100 transition duration-200">
                            <td className="py-3 px-4 border-b text-center">{resume.username}</td>
                            <td className="py-3 px-4 border-b text-center">
                                <img src={resume.resume} alt={`Resume of ${resume.username}`} className="w-16 h-16 object-cover rounded-full mx-auto" />
                            </td>
                            <td className="py-3 px-4 border-b text-center">
                                <button 
                                    className="bg-green-500 text-white px-4 py-2 rounded mr-2 hover:bg-green-600 transition duration-200"
                                    onClick={() => handleAccept(index)}
                                >
                                    Accept
                                </button>
                                <button 
                                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-200"
                                    onClick={() => handleReject(index)}
                                >
                                    Reject
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        </div>
    );
};

export default ResumeTable;
