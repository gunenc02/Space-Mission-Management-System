import { useEffect, useState } from "react";
import Header from "../../components/Header";
import Navbar from "../../components/Navbar";
import { Company } from "../../data-types/entities";
import { filterCompanies, getCompanies } from "../../calling/companyCaller";
import { Link } from "react-router-dom";
import CompaniesFilter from "../filters/CompaniesFilter";

export default function Companies() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [filteredCompanies, setFilteredCompanies] = useState<Company[]>([]);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  useEffect(() => {
    getCompanies({ token: "" }).then((data) => {
      setCompanies(data);
      setFilteredCompanies(data);
    });
  }, []);

  const handleFilter = (filters: { country?: string; minBudget?: number; maxBudget?: number }) => {
    const nonEmptyFilters = Object.fromEntries(Object.entries(filters).filter(([_, v]) => v !== undefined && v !== null && v !== ''));
    filterCompanies(nonEmptyFilters).then((data) => {
      setFilteredCompanies(data);
      setIsFilterModalOpen(false); // Close the modal after filtering
    });
  };

  return (
    <div className="outer flex flex-col items-center bg-blue-100 min-h-screen">
      <Header className="sticky top-0 z-50" />
      <Navbar className="sticky top-0 z-50" />
      <div className="w-full max-w-6xl p-6 overflow-auto" style={{ maxHeight: "calc(100vh - 200px)" }}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Companies</h2>
          <button
            onClick={() => setIsFilterModalOpen(true)}
            className="px-6 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 min-w-[150px] text-sm sm:text-base"
          >
            Filter
          </button>
        </div>
        <div className="flex flex-col space-y-4">
          {filteredCompanies.map((company: Company) => (
            <Link
              to={"/company/" + company.userId}
              className="flex flex-col md:flex-row items-center bg-white rounded-lg shadow-md overflow-hidden hover:-translate-y-1 hover:shadow-lg w-full"
              key={company.userId}
            >
              <div className="w-full md:w-1/3 h-48">
                <img
                  src={`data:image/jpeg;base64,${company.logo}`}
                  alt={company.name}
                  className="w-full h-full object-scale-down"
                />
              </div>
              <div className="p-4">
                <p className="text-xl font-bold mb-2">{company.name}</p>
                <p>Country: {company.country}</p>
                <p>Budget: {company.money}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
      {isFilterModalOpen && (
        <CompaniesFilter
          onClose={() => setIsFilterModalOpen(false)}
          onFilter={handleFilter}
        />
      )}
    </div>
  );
}
