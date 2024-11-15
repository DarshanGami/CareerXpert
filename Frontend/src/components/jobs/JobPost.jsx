import React, { useState } from 'react';
import axios from 'axios';
import Input from '../shared/Input';
import { toast } from 'react-hot-toast';

const JobPost = () => {
    const [jobDetails, setJobDetails] = useState({
        title: '',
        description: '',
        requirements: [],
        location: '',
        experience: '',
        salary: '',
        timing: '',
        perks: [],
        category: '',
        domain: '',
        workType: '',
        userType: '',
        deadline: '',
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setJobDetails(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleArrayInput = (e, field) => {
        const { value } = e.target;
        setJobDetails(prev => ({
            ...prev,
            [field]: value.split('\n').filter(item => item.trim() !== '')
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await axios.post('http://localhost:5001/api/v1/jobs', jobDetails, {
                withCredentials: true
            });
            toast.success('Job posted successfully!');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Error posting job');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4 sm:px-6">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6">
                        <h2 className="text-3xl font-bold text-white">Post a New Job</h2>
                        <p className="mt-2 text-blue-100">Create a compelling job listing to attract the best candidates</p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="p-8 space-y-8">
                        {/* Basic Information */}
                        <div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-4">Basic Information</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Job Title*</label>
                                    <Input 
                                        name="title" 
                                        type="text" 
                                        value={jobDetails.title} 
                                        onChange={handleChange} 
                                        placeholder="e.g. Senior Software Engineer"
                                        required 
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Location*</label>
                                    <select 
                                        name="location" 
                                        value={jobDetails.location} 
                                        onChange={handleChange}
                                        required
                                        className="w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                    >
                                        <option value="">Select Location</option>
                                        <option value="Mumbai">Mumbai</option>
                                        <option value="Delhi">Delhi</option>
                                        <option value="Bangalore">Bangalore</option>
                                        <option value="Hyderabad">Hyderabad</option>
                                        <option value="Chennai">Chennai</option>
                                        <option value="Remote">Remote</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Experience*</label>
                                    <Input 
                                        name="experience" 
                                        type="text" 
                                        value={jobDetails.experience} 
                                        onChange={handleChange} 
                                        placeholder="e.g. 2-3 years"
                                        required 
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Salary*</label>
                                    <Input 
                                        name="salary" 
                                        type="text" 
                                        value={jobDetails.salary} 
                                        onChange={handleChange} 
                                        placeholder="e.g. $80,000 - $100,000"
                                        required 
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Job Type */}
                        <div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-4">Job Type</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Timing*</label>
                                    <select 
                                        name="timing" 
                                        value={jobDetails.timing} 
                                        onChange={handleChange}
                                        required
                                        className="w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                    >
                                        <option value="">Select Timing</option>
                                        <option value="Full Time">Full Time</option>
                                        <option value="Part Time">Part Time</option>
                                        <option value="Internship">Internship</option>
                                        <option value="Contract">Contract</option>
                                        <option value="Freelance">Freelance</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Work Type*</label>
                                    <select 
                                        name="workType" 
                                        value={jobDetails.workType} 
                                        onChange={handleChange}
                                        required
                                        className="w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                    >
                                        <option value="">Select Work Type</option>
                                        <option value="In Office">In Office</option>
                                        <option value="Remote">Remote</option>
                                        <option value="Field Work">Field Work</option>
                                        <option value="Hybrid">Hybrid</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Domain*</label>
                                    <select 
                                        name="domain" 
                                        value={jobDetails.domain} 
                                        onChange={handleChange}
                                        required
                                        className="w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                    >
                                        <option value="">Select Domain</option>
                                        <option value="Management">Management</option>
                                        <option value="Engineering">Engineering</option>
                                        <option value="Law">Law</option>
                                        <option value="Arts">Arts</option>
                                        <option value="Biology">Biology</option>
                                        <option value="Others">Others</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">User Type*</label>
                                    <select 
                                        name="userType" 
                                        value={jobDetails.userType} 
                                        onChange={handleChange}
                                        required
                                        className="w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                    >
                                        <option value="">Select User Type</option>
                                        <option value="College Students">College Students</option>
                                        <option value="Fresher">Fresher</option>
                                        <option value="Professionals">Professionals</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Detailed Information */}
                        <div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-4">Detailed Information</h3>
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Job Description*</label>
                                    <textarea
                                        name="description"
                                        value={jobDetails.description}
                                        onChange={handleChange}
                                        placeholder="Enter detailed job description..."
                                        required
                                        className="w-full p-3 bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 min-h-[150px]"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Requirements (One per line)</label>
                                    <textarea
                                        name="requirements"
                                        value={jobDetails.requirements.join('\n')}
                                        onChange={(e) => handleArrayInput(e, 'requirements')}
                                        placeholder="Enter job requirements (one per line)..."
                                        className="w-full p-3 bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 min-h-[150px]"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Perks (One per line)</label>
                                    <textarea
                                    
                                    name="perks"
                                    value={jobDetails.perks.join('\n')}
                                    onChange={(e) => handleArrayInput(e, 'perks')}
                                    placeholder="Enter job perks (one per line)..."
                                    className="w-full p-3 bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 min-h-[150px]"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Dates */}
                    <div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">Application Deadline</h3>
                        <div className="w-full md:w-1/2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Deadline*</label>
                            <Input 
                                name="deadline" 
                                type="date" 
                                value={jobDetails.deadline} 
                                onChange={handleChange}
                                required 
                                min={new Date().toISOString().split('T')[0]}
                            />
                        </div>
                    </div>


                    {/* Additional Info */}
                    {/* <div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">Additional Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Company ID*</label>
                                <Input 
                                    name="company" 
                                    type="text" 
                                    value={jobDetails.company} 
                                    onChange={handleChange}
                                    required 
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Created By*</label>
                                <Input 
                                    name="created_by" 
                                    type="text" 
                                    value={jobDetails.created_by} 
                                    onChange={handleChange}
                                    required 
                                />
                            </div>
                        </div>
                    </div> */}

                    {/* Submit Button */}
                    <div className="pt-6">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`
                                w-full md:w-auto px-8 py-3 rounded-lg text-white font-medium
                                ${isSubmitting 
                                    ? 'bg-blue-400 cursor-not-allowed' 
                                    : 'bg-blue-600 hover:bg-blue-700 transform hover:-translate-y-0.5 transition-all'}
                                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                                shadow-lg
                            `}
                        >
                            {isSubmitting ? (
                                <div className="flex items-center justify-center">
                                    <div className="animate-spin mr-2 h-5 w-5 border-t-2 border-b-2 border-white rounded-full"></div>
                                    Posting Job...
                                </div>
                            ) : (
                                'Post Job'
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
);
};

export default JobPost;                                  