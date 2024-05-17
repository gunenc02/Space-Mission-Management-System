import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { getReceivedBids, approveBid, rejectBid } from "../../calling/bidCaller";
import { getCompanies } from "../../calling/companyCaller";

interface Bid {
  id: number;
  offererId: number;
  price: string;
  deadline: string;
  status: string;
}

interface Company {
  userId: number;
  name: string;
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
    const company = companies.find((company) => company.userId === offererId);
    console.log("Company:", company);
    return company ? company.name : 'Unknown';
  };

  const handleApproveBid = (id: number) => {
    approveBid(id)
      .then(() => {
        // Update the status of the bid to approved
        setBids((prevBids) =>
          prevBids.map((bid) =>
            bid.id === id ? { ...bid, status: "approved" } : bid
          )
        );
        console.log(`Bid ${id} approved`);
      })
      .catch((err) => setError(err.message));
  };

  const handleRejectBid = (id: number) => {
    rejectBid(id)
      .then(() => {
        // Update the status of the bid to rejected
        setBids((prevBids) =>
          prevBids.map((bid) =>
            bid.id === id ? { ...bid, status: "rejected" } : bid
          )
        );
        console.log(`Bid ${id} rejected`);
      })
      .catch((err) => setError(err.message));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-semibold text-gray-800 my-6">Received Bids</h1>
        <div className="space-y-4">
          {bids.map((bid) => (
            <div key={bid.id} className="bg-white shadow-md rounded-md overflow-hidden cursor-pointer transition duration-300 hover:shadow-lg">
              <div className="p-4 flex justify-between items-center">
                <div>
                  <p className="text-lg font-semibold text-gray-800">
                    Offerer Company: {getCompanyNameById(bid.offererId)}
                  </p>
                  <p className="text-sm text-gray-500">Bid Amount: {bid.price}</p>
                  <p className="text-sm text-gray-500">Deadline: {new Date(bid.deadline).toLocaleDateString()}</p>
                  <p className="text-sm text-gray-500">Status: {bid.status}</p>
                </div>
                <div className="flex space-x-4">
                  <button
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
                    onClick={() => handleApproveBid(bid.id)}
                  >
                    Approve
                  </button>
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
                    onClick={() => handleRejectBid(bid.id)}
                  >
                    Reject
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReceivedBids;
