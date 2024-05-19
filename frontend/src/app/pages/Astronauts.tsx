import { useEffect, useState } from "react";
import Header from "../../components/Header";
import Navbar from "../../components/Navbar";
import { Astronaut } from "../../data-types/entities";
import { filterAstronauts, getAstronauts, searchAstronautsByName } from "../../calling/astronautCaller";
import { Link } from "react-router-dom";
import AstronautsFilter from "../filters/AstronautsFilter";

export default function Astronauts() {
  const [astronauts, setAstronauts] = useState<Astronaut[]>([]);
  const [filteredAstronauts, setFilteredAstronauts] = useState<Astronaut[]>([]);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Fetch astronauts from the server
  useEffect(() => {
    getAstronauts({ token: "" }).then((data) => {
      setAstronauts(data);
      setFilteredAstronauts(data);
    });
  }, []);

  const handleFilter = (filters: {
    country?: string;
    minAge?: number;
    maxAge?: number;
    minSalary?: number;
    maxSalary?: number;
    onDuty?: boolean;
  }) => {
    const nonEmptyFilters = Object.fromEntries(
      Object.entries(filters).filter(
        ([_, v]) => v !== undefined && v !== null && v !== ""
      )
    );
    filterAstronauts(nonEmptyFilters).then((data) => {
      setFilteredAstronauts(data);
      setIsFilterModalOpen(false); // Close the modal after filtering
    });
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchQuery(value);
    if (value) {
      searchAstronautsByName(value).then((data) => {
        setFilteredAstronauts(data);
      });
    } else {
      setFilteredAstronauts(astronauts); // Reset to full list if search query is empty
    }
  };

  return (
    <div className="outer flex flex-col items-center bg-blue-100 min-h-screen">
      <Header className="sticky top-0 z-50" />
      <Navbar className="sticky top-0 z-50" />
      <div
        className="w-full max-w-6xl p-6 overflow-auto"
        style={{ maxHeight: "calc(100vh - 200px)" }}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Astronauts</h2>
          <div className="flex space-x-2">
            <input
              type="text"
              placeholder="Search by name"
              value={searchQuery}
              onChange={handleSearch}
              className="px-4 py-2 border rounded-lg shadow-sm"
            />
            <button
              onClick={() => setIsFilterModalOpen(true)}
              className="px-6 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 min-w-[150px] text-sm sm:text-base"
            >
              Filter
            </button>
          </div>
        </div>
        <div className="flex flex-col space-y-4">
          {filteredAstronauts.map((astronaut: Astronaut) => (
            <Link
              to={"/astronaut/" + astronaut.userId}
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
              <div className="p-4">
                <p className="text-xl font-bold mb-2">{astronaut.name}</p>
                <p>Country: {astronaut.country}</p>
                <p>
                  Date of Birth:{" "}
                  {new Date(astronaut.dateOfBirth).toLocaleDateString()}
                </p>
                <p>{astronaut.onDuty ? "Is on mission" : "Available for mission"}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
      {isFilterModalOpen && (
        <AstronautsFilter
          onClose={() => setIsFilterModalOpen(false)}
          onFilter={handleFilter}
        />
      )}
    </div>
  );
}
