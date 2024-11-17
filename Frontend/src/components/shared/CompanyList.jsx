import React, { useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { Link } from 'react-router-dom';

// Example company data
const companyData = [
    { id: 1, name: 'Company A', logoUrl: 'https://via.placeholder.com/150', date: '2024-01-01' },
    { id: 2, name: 'Company B', logoUrl: 'https://via.placeholder.com/150', date: '2023-12-15' },
    // Add more companies here...
];

const CompanyList = () => {

    const [companies] = useState(companyData); // Set the data directly
    const [isHorizontal, setIsHorizontal] = useState(true); // Toggle for horizontal/vertical view

    // Function to handle delete action
    const handleDelete = (id) => {
        alert(`Deleting company with id: ${id}`);
        // You can implement the delete functionality here
    };

    // Function to handle edit action
    const handleEdit = (id) => {
        alert(`Editing company with id: ${id}`);
        // You can implement the edit functionality here
    };

    return (

        <div>

            <Navbar></Navbar>

            <div className="flex flex-col min-h-screen">
                {/* Main Content */}
                <main className="flex-grow">
                    <div className="container mx-auto p-4">
                        <h1 className="text-2xl font-bold mb-4">Company List</h1>

                        <Link className='{"grid gap-4 grid-cols-1 mx-10"}' to="/joblist">
                            <div className={"grid gap-4 grid-cols-1 mx-10"}>


                                {companies.map((company) => (
                                    <div
                                        key={company.id}
                                        className="bg-white shadow-lg rounded-lg p-4 flex items-center justify-between transition-transform transform hover:scale-105"
                                    >
                                        {/* Logo and Company Info (Name + Date in horizontal line) */}
                                        <div className="flex items-center space-x-4 flex-1">
                                            <img
                                                src={company.logoUrl}
                                                alt={`${company.name} logo`}
                                                className="w-16 h-16 rounded-full object-cover"
                                            />
                                            <div className="flex flex-col justify-between">
                                                <h2 className="text-lg font-semibold">{company.name}</h2>
                                                <p className="text-sm text-gray-500">{company.date}</p>
                                            </div>
                                        </div>

                                        {/* Edit and Delete Buttons */}
                                        <div className="flex space-x-2">

                                            <button
                                                onClick={() => handleEdit(company.id)}
                                                className="bg-yellow-500 text-white px-4 py-2 rounded"
                                            >
                                                Edit
                                            </button>

                                            <button
                                                onClick={() => handleDelete(company.id)}
                                                className="bg-red-500 text-white px-4 py-2 rounded"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Link>
                    </div>
                </main>

                {/* Footer */}
                <Footer />

            </div>

        </div>
    );
};

export default CompanyList;