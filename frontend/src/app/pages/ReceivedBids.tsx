import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { getReceivedBids } from "../../calling/bidCaller.tsx";

interface Bid {
  id: number;
  offeredCompany: string;
  amount: string;
  deadline: string;
}

const OfferedBids: React.FC = () => {
  const [bids, setBids] = useState<Bid[]>([]);
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

    getReceivedBids(numericUserId)
      .then((data) => setBids(data))
      .catch((err) => setError(err.message));
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-semibold text-gray-800 my-6">Offered Bids</h1>
        <div className="space-y-4">
          {bids.map((bid) => (
            <div key={bid.id} className="bg-white shadow-md rounded-md overflow-hidden cursor-pointer transition duration-300 hover:shadow-lg">
              <div className="p-4">
                <p className="text-lg font-semibold text-gray-800">Offered Company: {bid.offeredCompany}</p>
                <p className="text-sm text-gray-500">Bid Amount: {bid.amount}</p>
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
