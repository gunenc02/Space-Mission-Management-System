import { useEffect, useState } from "react";
import Header from "../../components/Header";
import Navbar from "../../components/Navbar";
import { Platform } from "../../data-types/entities";
import { getPlatforms } from "../../calling/platformCaller";
import { Link } from "react-router-dom";
import PlatformsFilter from "../filters/PlatformsFilter";
import { FilterValues } from "../../data-types/modal-props";

export default function Platforms() {
  const [platforms, setPlatforms] = useState<Platform[]>([]);
  const [filteredPlatforms, setFilteredPlatforms] = useState<Platform[]>([]);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  useEffect(() => {
    getPlatforms({ token: "" }).then((data) => {
      setPlatforms(data);
      setFilteredPlatforms(data);
      console.log(data);
    });
  }, []);

  const handleFilter = (filters: FilterValues) => {
    const { minYear, maxYear, minCost, maxCost } = filters;
    const newFilteredPlatforms = platforms.filter((platform) => {
      return (
        (minYear ? platform.productionYear >= minYear : true) &&
        (maxYear ? platform.productionYear <= maxYear : true) &&
        (minCost ? platform.costPerLaunch >= minCost : true) &&
        (maxCost ? platform.costPerLaunch <= maxCost : true)
      );
    });
    setFilteredPlatforms(newFilteredPlatforms);
    setIsFilterModalOpen(false);
  };

  return (
    <div className="flex flex-col items-center bg-gray-100 min-h-screen">
      <Header />
      <Navbar />
      <div className="w-full max-w-6xl p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Platforms</h2>
          <div className="flex space-x-2">
            <button
              onClick={() => setIsFilterModalOpen(true)}
              className="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M11 5l7 7-7 7M5 5v14"
                ></path>
              </svg>
              Filter
            </button>
            <button className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition">
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 4v16m8-8H4"
                ></path>
              </svg>
              Add Platform
            </button>
          </div>
        </div>
        <div className="flex flex-col space-y-4">
          {filteredPlatforms.map((platform: Platform) => (
            <Link
              to={"/platform/" + platform.id}
              className="flex flex-col md:flex-row items-center bg-white rounded-lg shadow-md overflow-hidden transform transition-transform hover:-translate-y-1 hover:shadow-lg w-full"
              key={platform.id}
            >
              <div className="w-full md:w-1/3 h-48 overflow-hidden">
                <img
                  src={platform.image}
                  alt={platform.platformName}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4 text-center md:text-left md:flex-1">
                <p className="text-xl font-bold mb-2">{platform.platformName}</p>
                <p>Production Year: {platform.productionYear}</p>
                <p>Cost per Launch: {platform.costPerLaunch}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
      {isFilterModalOpen && (
        <PlatformsFilter
          onClose={() => setIsFilterModalOpen(false)}
          onFilter={handleFilter}
        />
      )}
    </div>
  );
}
