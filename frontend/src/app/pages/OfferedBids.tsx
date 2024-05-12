import React from 'react';
import Navbar from "../../components/Navbar";

interface Bid {
  id: number;
  offeredCompany: string;
  amount: string;
  deadline: string;
}

const OfferedBids: React.FC = () => {
  const bids: Bid[] = [
    { id: 1, offeredCompany: 'SpaceY', amount: '45,000,000$', deadline: '25.03.2024' },
    { id: 2, offeredCompany: 'SpaceX', amount: '35,000,000$', deadline: '15.03.2024' },
    { id: 3, offeredCompany: 'Blue Origin', amount: '40,000,000$', deadline: '15.03.2024' },
    { id: 4, offeredCompany: 'Virgin Galactic', amount: '30,000,000$', deadline: '15.03.2024' },
  ];

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
                <p className="text-sm text-gray-500">Deadline: {bid.deadline}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OfferedBids;
