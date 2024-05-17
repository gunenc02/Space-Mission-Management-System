import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { getReceivedBids } from "../../calling/bidCaller";
import { getCompanies } from "../../calling/companyCaller";

interface Bid {
  id: number;
  offererId: number;
  price: string;
  deadline: string;
}

interface Company {
  company_id: number;
  company_name: string;
}

const ReceivedBids: React.FC = () => {
  const [bids, setBids] = useState<Bid[]>([]);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const userRole = localStorage.getItem("userRole");
    console.log("Logged in user ID:", userId + " and role is: " + userRole + " and name is: " + localStorage.getItem("userName"));

    if (userRole !== "COMPANY" || !userId) {
      setError("Access denied. Only companies can view bids.");
      return;
    }

    const numericUserId = parseInt(userId, 10);
    if (isNaN(numericUserId)) {
      setError("Invalid user ID.");
      return;
    }

    // Fetch received bids
    getReceivedBids(numericUserId)
      .then((data) => {
        console.log("Received Bids Data:", data); // Log the fetched data
        setBids(data);
      })
      .catch((err) => setError(err.message));

    // Fetch companies
    getCompanies({ token: "" }) // Adjust if you have a token management system
      .then((data) => {
        console.log("Companies Data:", data); // Log the fetched data
        setCompanies(data);
      })
      .catch((err) => setError(err.message));
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  const getCompanyNameById = (offererId: number) => {
    console.log("Offerer ID:", offererId);
    const company = companies.find((company) => company.company_id === offererId);
    console.log("Company:", company);
    return company ? company.company_name : 'Unknown';
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-semibold text-gray-800 my-6">Received Bids</h1>
        <div className="space-y-4">
          {bids.map((bid) => (
            <div key={bid.id} className="bg-white shadow-md rounded-md overflow-hidden cursor-pointer transition duration-300 hover:shadow-lg">
              <div className="p-4">
                <p className="text-lg font-semibold text-gray-800">
                  Offered Company: {getCompanyNameById(bid.offererId)}
                </p>
                <p className="text-sm text-gray-500">Bid Amount: {bid.price}</p>
                <p className="text-sm text-gray-500">Deadline: {new Date(bid.deadline).toLocaleDateString()}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReceivedBids;
