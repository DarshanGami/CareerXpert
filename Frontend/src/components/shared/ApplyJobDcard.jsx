import React, { useEffect, useState } from "react";
import google from "./google.png";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import toast from "react-hot-toast";

const ApplyJobDcard = (props) => {
  var BASE_URL = "http://localhost:5001";
  const [currentJobDetail, setCurrentJobDetail] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate

  const route = () => {
    navigate("/jobapply"); // Navigate to the /userdetails route
  };
  const { search } = useLocation(); // Get the query string from the URL
  const queryParams = new URLSearchParams(search); // Parse the query string
  const job_id = queryParams.get("job_id");
  const role = queryParams.get("role");

  // Function to retrieve token from localStorage
  const getToken = () => {
    return localStorage.getItem("TOKEN");
  };
  const token = getToken();

  // fetch the user data
  const fetchJobDetails = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/v1/jobs/${job_id}`, {
        method: "GET",
        headers: {
          //   "Content-Type": "application/json",
          //   Authorization: `Bearer ${token}`, // Send token in Authorization header
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch Job details");
      }

      const data = await response.json();
      return data?.job;
    } catch (error) {
      console.error("Error fetching Job Data:", error);
      return null;
    }
  };

  useEffect(() => {
    const func = async () => {
      const data = await fetchJobDetails();
      setCurrentJobDetail(data);
    };

    func();
  }, []);

  const handleJobApply = async () => {
    try {
      const resumeUrl = props?.user?.resume?.url;
      if (!resumeUrl) {
        alert("Resume not found. Please upload your resume.");
        return;
      }
      const response = await fetch(
        `${BASE_URL}/api/v1/application/${job_id}/apply`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            resume: resumeUrl, // Include the resume in the request body
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to apply for the job");
      }

      const data = await response.json();

      console.log("Application submitted successfully:", data);
      // alert("Application submitted successfully!");
      toast("Application Submitted");
    } catch (error) {
      console.error("Error applying for the job:", error);
      // alert(error.message || "Something went wrong. Please try again.");
      toast(error.message);
    }
  };

  const updatedDate = new Date(currentJobDetail?.updatedAt).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "short",
      day: "numeric",
    }
  );

  const deadline = new Date(currentJobDetail?.deadline).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "short",
      day: "numeric",
    }
  );

  const formatSalaryToLPA = `${(currentJobDetail?.salary / 100000).toFixed(
    2
  )} LPA`;

  // console.log(props, "[PROPS]");

  return (
    <div>
      <Navbar user={props?.user} />
      <div className="p-8 bg-gray-100 min-h-screen">
        <div className="bg-white shadow-lg rounded-lg p-6 flex items-start space-x-4 mb-4">
          <img
            src={currentJobDetail?.company?.logo}
            alt="logo"
            className="object-cover mr-3 w-16 h-16 rounded-full"
          />
          <div className="flex-grow">
            <h3 className="text-lg font-bold text-blue-700">
              {currentJobDetail?.title}
            </h3>
            {/* Link to the company page */}
            <Link
              to={`/companydescription?company_id=${currentJobDetail?.company?._id}&role=${role}`}
              className="text-gray-800 hover:text-blue-500"
            >
              {currentJobDetail?.company?.name}
            </Link>
            <p className="text-gray-500">{currentJobDetail?.location}</p>
            <p className="text-gray-400">Updated On: {updatedDate}</p>
          </div>
          {role != "Recruiter" && (
            <button
              onClick={handleJobApply}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg font-semibold"
            >
              {" "}
              Apply For Job
            </button>
          )}
        </div>
        <div className="bg-white shadow-md rounded-lg p-6 mb-4">
          <h3 className="text-lg font-semibold text-blue-700 mb-2">
            Job Description
          </h3>
          <p className="text-gray-700">{currentJobDetail?.description}</p>
          {/* Full job description */}
        </div>
        <div className="bg-white shadow-md rounded-lg p-6 mb-4">
          <h3 className="text-lg font-semibold text-blue-700 mb-2">
            Job Details
          </h3>
          <p className="text-gray-800">
            <span className="font-semibold">Application Deadline:</span>{" "}
            {deadline}
          </p>
          <p className="text-gray-800">
            <span className="font-semibold">Location:</span>{" "}
            {currentJobDetail?.location}
          </p>
          <p className="text-gray-800">
            <span className="font-semibold">Experience:</span>{" "}
            {currentJobDetail?.experience}yr
          </p>
          <p className="text-gray-800">
            <span className="font-semibold">Salary:</span> {formatSalaryToLPA}
          </p>
          <p className="text-gray-800">
            <span className="font-semibold">User Type:</span>{" "}
            {currentJobDetail?.userType}
          </p>
          <p className="text-gray-800">
            <span className="font-semibold">Type:</span>{" "}
            {currentJobDetail?.workType}
          </p>
          <p className="text-gray-800">
            <span className="font-semibold">Timing:</span>{" "}
            {currentJobDetail?.timing}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ApplyJobDcard;



