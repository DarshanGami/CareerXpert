import React, { useState } from "react";

const EditCompanyForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    logo: "",
    about: "",
    website: "",
    employees: "",
    branches: "",
    social: {
      linkedin: "",
      facebook: "",
      twitter: "",
      instagram: "",
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes("social.")) {
      const [_, key] = name.split(".");
      setFormData({
        ...formData,
        social: {
          ...formData.social,
          [key]: value,
        },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center py-7">
      {/* Header Section */}
      <div className="bg-blue-600 text-white w-full py-6 px-8 rounded-t-lg shadow-md max-w-3xl">
        <h2 className="text-2xl font-bold">Edit Company</h2>
        <p className="text-sm text-gray-100 mt-1">
          Update the details of your company below
        </p>
      </div>

      {/* Form Section */}
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-b-lg shadow-md w-full max-w-3xl">
        {/* Basic Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name */}
          <div>
            <label className="block text-gray-700 font-medium">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter company name"
              className="w-full border border-gray-300 rounded-lg p-2 placeholder-gray-400"
              required
            />
          </div>

          {/* Logo */}
          <div>
            <label className="block text-gray-700 font-medium">Logo URL</label>
            <input
              type="url"
              name="logo"
              value={formData.logo}
              onChange={handleChange}
              placeholder="e.g., https://example.com/logo.png"
              className="w-full border border-gray-300 rounded-lg p-2 placeholder-gray-400"
            />
          </div>

          {/* About */}
          <div className="col-span-2">
            <label className="block text-gray-700 font-medium">
              About <span className="text-red-500">*</span>
            </label>
            <textarea
              name="about"
              value={formData.about}
              onChange={handleChange}
              placeholder="Provide a brief description about the company"
              className="w-full border border-gray-300 rounded-lg p-2 placeholder-gray-400"
              required
            ></textarea>
          </div>
        </div>

        {/* Additional Information */}
        <h3 className="text-lg font-semibold text-gray-700 mt-8">Additional Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          {/* Website */}
          <div>
            <label className="block text-gray-700 font-medium">
              Website <span className="text-red-500">*</span>
            </label>
            <input
              type="url"
              name="website"
              value={formData.website}
              onChange={handleChange}
              placeholder="e.g., https://www.companywebsite.com"
              className="w-full border border-gray-300 rounded-lg p-2 placeholder-gray-400"
              required
            />
          </div>

          {/* Employees */}
          <div>
            <label className="block text-gray-700 font-medium">Number of Employees</label>
            <input
              type="number"
              name="employees"
              value={formData.employees}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2 placeholder-gray-400"
            />
          </div>

          {/* Branches */}
          <div>
            <label className="block text-gray-700 font-medium">Number of Branches</label>
            <input
              type="number"
              name="branches"
              value={formData.branches}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2 placeholder-gray-400"
            />
          </div>
        </div>

        {/* Social Links */}
        <h3 className="text-lg font-semibold text-gray-700 mt-8">Social Links</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          {["linkedin", "facebook", "twitter", "instagram"].map((platform) => (
            <div key={platform}>
              <label className="block text-gray-700 font-medium capitalize">
                {platform}
              </label>
              <input
                type="url"
                name={`social.${platform}`}
                value={formData.social[platform]}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-2 placeholder-gray-400"
              />
            </div>
          ))}
        </div>

        {/* Submit Button */}
        <div className="mt-8">
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-medium py-2 rounded-lg hover:bg-blue-700"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditCompanyForm;