import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

const CompanyList = (props) => {
    const [companies, setCompanies] = useState([]); // Set initial state to an empty array
    const [isLoading, setIsLoading] = useState(true); // For loading state
    const [error, setError] = useState(null); // For error state
    const [selectedCompany, setSelectedCompany] = useState(null);  // Store selected company for editing
    const [UpdateData , setUpdateData] = useState(false);
    const [IsEditing,setIsEditing]=useState(false);
    const navigate = useNavigate();

    // Fetch companies data from the backend
    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                const response = await axios.get('http://localhost:5001/api/v1/company/my-companies', {
                    withCredentials: true, // Ensures cookies are sent with request (for authentication)
                });
                setCompanies(response.data.companies); // Set the companies data to the state
            } catch (error) {
                setError('Error fetching companies data');
            } finally {
                setIsLoading(false);
            }
        };
        // console.log(companies);
        fetchCompanies();
    }, []); // Empty dependency array means this effect runs once when the component mounts

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    const handleDelete = async (companyId) => {
        try {
            const response = await axios.delete(`http://localhost:5001/api/v1/company/delete/${companyId}`, {
                withCredentials: true, // Ensures cookies are sent with request (for authentication)
            });
            // If delete is successful, update the state to remove the deleted company
            setCompanies(companies.filter(company => company._id !== companyId));
            alert('Company deleted successfully!');
        } catch (error) {
            alert('Error deleting company');
        }
    };

    {/* Render the UpdateCompany component if selectedCompany exists */}

    // Function to open the UpdateCompany form with the selected company data
    const handleEdit = (companyId) => {
        const companyToEdit = companies.find(company => company._id === companyId);
        
        setSelectedCompany(companyToEdit); // Set the selected company data
        // console.log('selectedCompany',selectedCompany);
        props.setcompanyData(companyToEdit);
        navigate('/editcompanyprofile');
        setIsEditing(true);
    };

    const handleCompanyUpdate = (updatedCompany) => {
        // Update the company in the state with the updated details
        setCompanies(prevCompanies =>
            prevCompanies.map(company =>
                company._id === updatedCompany._id ? updatedCompany : company
            )
        );
        setIsEditing(false); 
    };

    return (
        <div>
            <Navbar />

            <div className="flex flex-col min-h-screen">
                {/* Main Content */}
                <main className="flex-grow">
                    <div className="container mx-auto p-4">
                        <h1 className="text-2xl font-bold mb-4">Your Companies</h1>

                        <div className={"grid gap-4 grid-cols-1 mx-10"}>
                            {companies.map((company) => (
                                <div
                                    key={company._id}
                                    className="bg-white shadow-lg rounded-lg p-4 flex items-center justify-between transition-transform transform hover:scale-105"
                                >
                                    {/* Logo and Company Info (Name + Date in horizontal line) */}
                                    <div className="flex items-center space-x-4 flex-1">
                                        <img
                                            src={company.logo || 'https://via.placeholder.com/150'} // Fallback logo if none
                                            alt={`${company.name} logo`}
                                            className="w-16 h-16 rounded-full object-cover"
                                        />
                                        <div className="flex flex-col justify-between">
                                            <h2 className="text-lg font-semibold">{company.name}</h2>
                                        </div>
                                    </div>

                                    {/* Edit and Delete Buttons */}
                                    <div className="flex space-x-2">
                                        {/* <Link to={`/UpdateCompany/${company._id}`}> */}
                                            <button
                                                onClick={() => handleEdit(company._id)}
                                                className="bg-yellow-500 text-white px-4 py-2 rounded"
                                                >
                                                Edit
                                            </button>
                                        {/* </Link> */}

                                        <button
                                            onClick={() => handleDelete(company._id)}
                                            className="bg-red-500 text-white px-4 py-2 rounded"
                                            >
                                            Delete
                                        </button>
                                    </div> 
                            </div>
                            ))}
                        </div>
                    </div>
                </main>
                {/* Footer */}
                <Footer />
            </div>
        </div>
    );
};

export default CompanyList;
