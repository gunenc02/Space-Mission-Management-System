import React from 'react';
import Navbar from "../../components/Navbar";

interface Bid {
  id: number;
  company: string;
  amount: string;
  deadline: string;
}

const ReceivedBids: React.FC = () => {
  const bids: Bid[] = [
    { id: 1, company: 'SpaceY', amount: '45,000,000$', deadline: '25.03.2024' },
    { id: 2, company: 'SpaceY', amount: '45,000,000$', deadline: '15.03.2024' },
    { id: 3, company: 'SpaceY', amount: '45,000,000$', deadline: '15.03.2024' },
    { id: 4, company: 'SpaceY', amount: '45,000,000$', deadline: '15.03.2024' },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-semibold text-gray-800 my-6">Received Bids</h1>
        <div className="space-y-4">
          {bids.map((bid) => (
            <div key={bid.id} className="bg-white shadow-md rounded-md overflow-hidden cursor-pointer transition duration-300 hover:shadow-lg">
              <div className="p-4">
                <p className="text-lg font-semibold text-gray-800">Offerer Company: {bid.company}</p>
                <p className="text-sm text-gray-500">Bid Amount: {bid.amount}</p>
                <p className="text-sm text-gray-500">Deadline: {bid.deadline}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReceivedBids;
