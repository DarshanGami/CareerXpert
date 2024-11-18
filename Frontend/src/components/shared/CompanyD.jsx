import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CompanyD_1 from './CompanyD_1';
import Company_2 from './Company_2';
import ReviewSection from './ReviewSection';
import HDFC from "./HDFC.png"
function CompanyD() {
  const [showMoreAbout, setShowMoreAbout] = useState(false);
  const [showMoreCulture, setShowMoreCulture] = useState(false);
  const [jobCards, setJobCards] = useState([]);

  useEffect(() => {
    // Simulate fetching data from backend
    const fetchJobData = async () => {
      const dummyData = [
        { id: 1, title: 'Field Sales Executive', company: 'Verifitech India Private Limited', daysLeft: '1 month left' },
        { id: 2, title: 'Address Verification Executive', company: 'Verifitech India Private Limited', daysLeft: '29 days left' },
        { id: 3, title: 'Software Developer', company: 'Tech Solutions Ltd.', daysLeft: '3 weeks left' },
        { id: 4, title: 'Marketing Specialist', company: 'Creative Agency Inc.', daysLeft: '2 weeks left' },
        { id: 5, title: 'Product Manager', company: 'Innovatech Co.', daysLeft: '1 month left' },
        { id: 6, title: 'UX Designer', company: 'DesignPro Studio', daysLeft: '3 weeks left' },
      ];
      setJobCards(dummyData);
    };

    fetchJobData();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      {/* Header Section */}
      <div className="bg-white rounded-lg shadow-md p-8 mb-8">
        <div className="flex items-start">
          <img src={HDFC} alt="HDFC Bank Logo" className="object-cover w-20 h-20 mr-8" />
          <div>
            <h1 className="text-4xl font-semibold">HDFC Bank</h1>
            <p className="text-gray-600 mb-2">Banking</p>
            <Link to="https://www.hdfcbank.com/" className="text-blue-600 hover:underline mb-4 block" target="_blank" rel="noopener noreferrer">
              https://www.hdfcbank.com/
            </Link>
            <div className="grid grid-cols-3 gap-4">
              <InfoItem label="Revenue" value="US$ 26 Billion" />
              <InfoItem label="Number of Employees" value="1,77,000" />
              <InfoItem label="Branches" value="8,344" />
            </div>
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <Company_2 title="About HDFC Bank" content="HDFC Bank Limited is an Indian banking and financial services company headquartered in Mumbai. ..." showMore={showMoreAbout} setShowMore={setShowMoreAbout} />
      <Company_2 title="Culture & Values" content="HDFC Bank fosters a culture of excellence, innovation, and customer-centric services. ..." showMore={showMoreCulture} setShowMore={setShowMoreCulture} />

      {/* Opportunities Section with Job Cards */}
      <Company_2 title="Opportunities">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
          {jobCards.map((job) => (
            <Link key={job.id} to="/applyjobdcard">
              <CompanyD_1 title={job.title} company={job.company} daysLeft={job.daysLeft} />
            </Link>
          ))}
        </div>
      </Company_2>
      
      <ReviewSection />
    </div>
  );
}

// InfoItem Component for displaying company info in a grid
const InfoItem = ({ label, value }) => (
  <div>
    <h2 className="text-lg font-semibold">{label}</h2>
    <p className="text-gray-700">{value}</p>
  </div>
);

export default CompanyD;
