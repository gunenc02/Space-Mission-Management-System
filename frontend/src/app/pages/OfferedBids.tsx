import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { getOfferedBids } from "../../calling/bidCaller";
import { getCompanies } from "../../calling/companyCaller"; // Adjust the import path as needed

interface Bid {
  id: number;
  receiverId: number;
  price: string;
  deadline: string;
}

interface Company {
  userId: number;
  name: string;
}

const OfferedBids: React.FC = () => {
  const [bids, setBids] = useState<Bid[]>([]);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const userRole = localStorage.getItem("userRole");
    console.log("Logged in user ID:", userId + "and role is: " + userRole + " and name is: " + localStorage.getItem("userName"));

    if (userRole !== "COMPANY" || !userId) {
      setError("Access denied. Only companies can view bids.");
      return;
    }

    const numericUserId = parseInt(userId, 10);
    if (isNaN(numericUserId)) {
      setError("Invalid user ID.");
      return;
    }

    // Fetch offered bids
    getOfferedBids(numericUserId)
      .then((data) => {
        console.log("Offered Bids Data:", data); // Log the fetched data
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

  const getCompanyNameById = (receiver_id: number) => {
    console.log("Receiver ID:", receiver_id);
    const company = companies.find((company) => company.userId === receiver_id);
    console.log("Company:", company);
    return company ? company.name : 'Unknown';
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-semibold text-gray-800 my-6">Offered Bids</h1>
        <div className="space-y-4">
          {bids.map((bid) => (
            <div key={bid.id} className="bg-white shadow-md rounded-md overflow-hidden cursor-pointer transition duration-300 hover:shadow-lg">
              <div className="p-4">
                <p className="text-lg font-semibold text-gray-800">
                  Offered Company: {getCompanyNameById(bid.receiverId)}
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

export default OfferedBids;
