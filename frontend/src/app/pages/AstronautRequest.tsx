import { useEffect, useState } from "react";
import Header from "../../components/Header";
import Navbar from "../../components/Navbar";
import { Astronaut } from "../../data-types/entities";
import {
  getJoinRequests,
  acceptAstronaut,
  declineAstronaut,
} from "../../calling/companyCaller";

export default function AstronautRequest() {
  const [requests, setRequests] = useState<Astronaut[]>([]);

  useEffect(() => {
    const companyId = Number(localStorage.getItem("userId"));
    getJoinRequests(companyId).then((data) => {
      console.log(data);
      setRequests(data);
    });
  }, []);

  const handleAccept = (astronautId: number, missionId: number) => {
    acceptAstronaut(astronautId, missionId).then(() => {
      setRequests((prevRequests) =>
        prevRequests.filter((req) => req.userId !== astronautId)
      );
    });
  };

  const handleDecline = (astronautId: number, missionId: number) => {
    declineAstronaut(astronautId, missionId).then(() => {
      setRequests((prevRequests) =>
        prevRequests.filter((req) => req.userId !== astronautId)
      );
    });
  };

  return (
    <div className="outer flex flex-col items-center bg-blue-100 min-h-screen">
      <Header />
      <Navbar />
      <div
        className="w-full max-w-6xl p-6 overflow-auto"
        style={{ maxHeight: "calc(100vh - 200px)" }}
      >
        <h2 className="text-2xl font-bold mb-4">Astronaut Join Requests</h2>
        <div className="flex flex-col space-y-4">
          {requests.map((astronaut: Astronaut) => (
            <div
              className="flex flex-col md:flex-row items-center bg-white rounded-lg shadow-md overflow-hidden hover:-translate-y-1 hover:shadow-lg w-full"
              key={astronaut.userId}
            >
              <div className="w-full md:w-1/3 h-48">
                <img
                  src={`data:image/jpeg;base64,${astronaut.image}`}
                  alt={astronaut.name}
                  className="w-full h-full object-scale-down"
                />
              </div>
              <div className="p-4 flex-1">
                <p className="text-xl font-bold mb-2">{astronaut.name}</p>
                <p>Country: {astronaut.country}</p>
                <p>
                  Date of Birth:{" "}
                  {new Date(astronaut.dateOfBirth).toLocaleDateString()}
                </p>
                <p>
                  {astronaut.onDuty ? "Is on mission" : "Available for mission"}
                </p>
              </div>
              <div className="p-4 flex space-x-2">
                <button
                  onClick={() =>
                    handleAccept(astronaut.userId, astronaut.missionId)
                  }
                  className="bg-green-500 text-white px-4 py-2 rounded"
                >
                  Accept
                </button>
                <button
                  onClick={() =>
                    handleDecline(astronaut.userId, astronaut.missionId)
                  }
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Decline
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
