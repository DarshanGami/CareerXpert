import React from 'react';
import Input from './Input';

const ProfileUser = ({ user, loading }) => {
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 py-8">
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
                {/* Profile Header with Photo */}
                <div className="relative h-48 bg-gradient-to-r from-blue-500 to-blue-600">
                    <div className="absolute -bottom-16 left-8">
                        <div className="relative">
                            <img 
                                src={user?.profilePhoto?.url || "https://via.placeholder.com/150"} 
                                alt="Profile" 
                                className="w-32 h-32 rounded-full border-4 border-white object-cover"
                            />
                        </div>
                    </div>
                </div>

                <div className="pt-20 px-8">
                    <form className="space-y-6">
                        {/* Basic Information */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Input 
                                lablename="Username"
                                type="text"
                                disabled
                                name="username"
                                value={user?.username || ''}
                            />
                            <Input 
                                lablename="Email"
                                type="email"
                                disabled
                                name="email"
                                value={user?.email || ''}
                            />
                            <Input 
                                lablename="Phone"
                                type="tel"
                                disabled
                                name="phone"
                                value={user?.phone || ''}
                            />
                            <Input 
                                lablename="DOB"
                                type="date"
                                disabled
                                name="DOB"
                                value={user?.DOB?.split('T')[0] || ''}
                            />
                            <Input 
                                lablename="City"
                                type="text"
                                disabled
                                name="city"
                                value={user?.city || ''}
                            />
                            <Input 
                                lablename="Address"
                                type="text"
                                disabled
                                name="address"
                                value={user?.address || ''}
                            />
                        </div>

                        {/* About Me */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">About Me</label>
                            <textarea
                                name="aboutMe"
                                rows="4"
                                disabled
                                className="w-full p-2 border border-gray-300 rounded-md bg-gray-50"
                                value={user?.aboutMe || ''}
                            />
                        </div>

                        {/* Skills */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Skills</label>
                            <div className="flex flex-wrap gap-2">
                                {user?.skills?.map((skill) => (
                                    <span
                                        key={skill}
                                        className="px-4 py-2 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Social Links */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Input 
                                lablename="LinkedIn"
                                type="url"
                                disabled
                                name="linkedin"
                                value={user?.socialLinks?.linkedin || ''}
                            />
                            <Input 
                                lablename="GitHub"
                                type="url"
                                disabled
                                name="github"
                                value={user?.socialLinks?.github || ''}
                            />
                            <Input 
                                lablename="Portfolio"
                                type="url"
                                disabled
                                name="portfolio"
                                value={user?.socialLinks?.portfolio || ''}
                            />
                            <Input 
                                lablename="Twitter"
                                type="url"
                                disabled
                                name="twitter"
                                value={user?.socialLinks?.twitter || ''}
                            />
                        </div>

                        {/* Job Preferences */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <Input 
                                lablename="First Choice"
                                type="text"
                                disabled
                                name="first"
                                value={user?.jobPreference?.first || ''}
                            />
                            <Input 
                                lablename="Second Choice"
                                type="text"
                                disabled
                                name="second"
                                value={user?.jobPreference?.second || ''}
                            />
                            <Input 
                                lablename="Third Choice"
                                type="text"
                                disabled
                                name="third"
                                value={user?.jobPreference?.third || ''}
                            />
                        </div>

                        {/* Resume Section */}
                        {user?.resume?.url && (
                            <div className="flex items-center space-x-4 p-4 border rounded-lg bg-gray-50">
                                <div className="p-2 bg-blue-100 rounded-lg">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-sm font-medium text-gray-700">Resume</h3>
                                    <a 
                                        href={user.resume.url} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="text-sm text-blue-600 hover:text-blue-700"
                                    >
                                        View Resume
                                    </a>
                                </div>
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ProfileUser;
