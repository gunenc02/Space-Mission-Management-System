import { useEffect, useState } from "react";
import Header from "../../components/Header";
import Navbar from "../../components/Navbar";
import { Agency } from "../../data-types/entities";
import { filterAgencies, getAgencies } from "../../calling/agencyCaller";
import { Link } from "react-router-dom";
import AgenciesFilter from "../filters/AgenciesFilter";

export default function Agencies() {
  const [agencies, setAgencies] = useState<Agency[]>([]);
  const [filteredAgencies, setFilteredAgencies] = useState<Agency[]>([]);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  useEffect(() => {
    getAgencies({ token: "" }).then((data) => {
      setAgencies(data);
      setFilteredAgencies(data);
    });
  }, []);

  const handleFilter = (filters: { isApproved?: boolean }) => {
    const nonEmptyFilters = Object.fromEntries(Object.entries(filters).filter(([_, v]) => v !== undefined && v !== null));
    filterAgencies(nonEmptyFilters).then((data) => {
      setFilteredAgencies(data);
      setIsFilterModalOpen(false); // Close the modal after filtering
    });
  };

  return (
    <div className="outer flex flex-col items-center bg-blue-100 min-h-screen">
      <Header className="sticky top-0 z-50" />
      <Navbar className="sticky top-0 z-50" />
      <div className="w-full max-w-6xl p-6 overflow-auto" style={{ maxHeight: "calc(100vh - 200px)" }}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Agencies</h2>
          <div className="flex space-x-2">
            <button
              onClick={() => setIsFilterModalOpen(true)}
              className="px-6 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 min-w-[150px] text-sm sm:text-base"
            >
              Filter
            </button>
          </div>
        </div>
        <div className="flex flex-col space-y-4">
          {filteredAgencies.map((agency: Agency) => (
            <Link
              to={"/agency/" + agency.userId}
              className="flex flex-col md:flex-row items-center bg-white rounded-lg shadow-md overflow-hidden hover:-translate-y-1 hover:shadow-lg w-full"
              key={agency.userId}
            >
              <div className="w-full md:w-1/3 h-48">
                <img
                  src={`data:image/jpeg;base64,${agency.logo}`}
                  alt={agency.name}
                  className="w-full h-full object-scale-down"
                />
              </div>
              <div className="p-4">
                <p className="text-xl font-bold mb-2">{agency.name}</p>
                <p>{agency.isApproved ? "Approved" : "Not approved"}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
      {isFilterModalOpen && (
        <AgenciesFilter
          onClose={() => setIsFilterModalOpen(false)}
          onFilter={handleFilter}
        />
      )}
    </div>
  );
}
