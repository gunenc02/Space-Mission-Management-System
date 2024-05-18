import { useEffect, useState } from "react";
import Header from "../../components/Header";
import Navbar from "../../components/Navbar";
import { SpaceMission } from "../../data-types/entities";
import { filterSpaceMissions, getSpaceMissions } from "../../calling/spaceMissionCaller";
import CreateSpaceMission from "../modals/CreateSpaceMission";
import SpaceMissionsFilter from "../filters/SpaceMissionsFilter";
import { Link } from "react-router-dom";

export default function SpaceMissions() {
  const [spaceMissions, setSpaceMissions] = useState<SpaceMission[]>([]);
  const [filteredSpaceMissions, setFilteredSpaceMissions] = useState<SpaceMission[]>([]);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [createMissionOpen, setCreateMissionOpen] = useState(false);

  const handleCreateMissionClick = () => {
    setCreateMissionOpen(!createMissionOpen);
  };

  useEffect(() => {
    getSpaceMissions({ token: "" }).then((data) => {
      setSpaceMissions(data);
      setFilteredSpaceMissions(data);
    });
  }, []);

  const handleFilter = (filters: { minBudget?: number; maxBudget?: number; minCreateDate?: string; maxCreateDate?: string; minPerformDate?: string; maxPerformDate?: string }) => {
    const nonEmptyFilters = Object.fromEntries(Object.entries(filters).filter(([_, v]) => v !== undefined && v !== null && v !== ''));
    filterSpaceMissions(nonEmptyFilters).then((data) => {
      setFilteredSpaceMissions(data);
      setIsFilterModalOpen(false); // Close the modal after filtering
    });
  };

  return (
    <div className="outer flex flex-col items-center bg-blue-100 min-h-screen">
      <Header className="sticky top-0 z-50" />
      <Navbar className="sticky top-0 z-50" />
      <div className="w-full max-w-6xl p-6 overflow-auto" style={{ maxHeight: "calc(100vh - 200px)" }}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Space Missions</h2>
          <div className="flex space-x-2">
            {localStorage.getItem("userRole") === "COMPANY" && (
              <button
                onClick={handleCreateMissionClick}
                className="px-6 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 min-w-[150px] text-sm sm:text-base"
              >
                Create Space Mission
              </button>
            )}
            <button
              onClick={() => setIsFilterModalOpen(true)}
              className="px-6 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 min-w-[150px] text-sm sm:text-base"
            >
              Filter
            </button>
          </div>
        </div>
        <div className="flex flex-col space-y-4">
          {filteredSpaceMissions.map((spaceMission: SpaceMission) => (
            <Link
              to={"/space-mission/" + spaceMission.id}
              className="flex flex-col md:flex-row items-center bg-white rounded-lg shadow-md overflow-hidden hover:-translate-y-1 hover:shadow-lg w-full"
              key={spaceMission.id}
            >
              <div className="w-full md:w-1/3 h-48">
                <img
                  src={`data:image/jpeg;base64,${spaceMission.image}`}
                  alt={spaceMission.missionName}
                  className="w-full h-full object-scale-down"
                />
              </div>
              <div className="p-4">
                <p className="text-xl font-bold mb-2">{spaceMission.missionName}</p>
                <p>Objective: {spaceMission.objective}</p>
                <p>Budget: {spaceMission.budget}</p>
                <p>Create Date: {new Date(spaceMission.createDate).toLocaleDateString()}</p>
                <p>Perform Date: {new Date(spaceMission.performDate).toLocaleDateString()}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
      {isFilterModalOpen && (
        <SpaceMissionsFilter
          onClose={() => setIsFilterModalOpen(false)}
          onFilter={handleFilter}
        />
      )}
      {createMissionOpen && (
        <CreateSpaceMission
          companyId={Number(localStorage.getItem("userId"))}
          onClose={handleCreateMissionClick}
        />
      )}
    </div>
  );
}
