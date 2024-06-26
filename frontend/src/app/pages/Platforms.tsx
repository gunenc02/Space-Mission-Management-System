import { useEffect, useState } from "react";
import Header from "../../components/Header";
import Navbar from "../../components/Navbar";
import { Platform } from "../../data-types/entities";
import { getPlatforms } from "../../calling/platformCaller";
import { Link } from "react-router-dom";
import PlatformsFilter from "../filters/PlatformsFilter";
import { FilterValues } from "../../data-types/modal-props";
import AddPlatform from "../modals/AddPlatform";

export default function Platforms() {
  const [platforms, setPlatforms] = useState<Platform[]>([]);
  const [filteredPlatforms, setFilteredPlatforms] = useState<Platform[]>([]);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isAddPlatformOpen, setIsAddPlatformOpen] = useState(false);

  useEffect(() => {
    getPlatforms({ token: "" }).then((data) => {
      setPlatforms(data);
      setFilteredPlatforms(data);
      setTimeout(() => {
        console.log(platforms);
      }, 1000);
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

  const addPlatformDisplayValidator = function(){
    const result = localStorage.getItem("userRole") === "COMPANY";
    return result;
  }
  return (
    <div className="outer flex flex-col items-center bg-blue-100 min-h-screen">
      <Header className="sticky top-0 z-50" />
      <Navbar className="sticky top-0 z-50" />
      <div
        className="w-full max-w-6xl p-6 overflow-auto"
        style={{ maxHeight: "calc(100vh - 200px)" }}
      >
        {" "}
        {/* Adjust 100px based on the combined height of Header and Navbar */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Platforms</h2>
          <div className="flex space-x-2">
            <button
              onClick={() => setIsFilterModalOpen(true)}
              className="px-6 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 min-w-[150px] text-sm sm:text-base"
            >
              Filter
            </button>
            
            {addPlatformDisplayValidator() && (<button
              onClick={() => setIsAddPlatformOpen(true)}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 min-w-[100px] text-sm sm:text-base"
            >
              Add Platform
            </button>)}
          </div>
        </div>
        <div className="flex flex-col space-y-4">
          {filteredPlatforms.map((platform: Platform) => (
            <Link
              to={"/platform/" + platform.id}
              className="flex flex-col md:flex-row items-center bg-white rounded-lg shadow-md overflow-hidden hover:-translate-y-1 hover:shadow-lg w-full"
              key={platform.id}
            >
              <div className="w-full md:w-1/3 h-48">
                <img
                  src={`data:image/jpeg;base64,${platform.image}`}
                  alt={platform.platformName}
                  className="w-full h-full object-scale-down"
                />
              </div>
              <div className="p-4">
                <p className="text-xl font-bold mb-2">
                  {platform.platformName}
                </p>
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
      {isAddPlatformOpen && (
        <AddPlatform
          onClose={() => setIsAddPlatformOpen(false)}
          companyId={Number(localStorage.getItem("userId"))}
        />
      )}
    </div>
  );
}
