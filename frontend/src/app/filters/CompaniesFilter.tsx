import { useState } from "react";
import { FilterProps } from "../../data-types/modal-props";
import "../../styles/Modal.css";

export default function CompaniesFilter(props: FilterProps) {
  const [country, setCountry] = useState<string | undefined>(undefined);
  const [minBudget, setMinBudget] = useState<number | undefined>(undefined);
  const [maxBudget, setMaxBudget] = useState<number | undefined>(undefined);

  const handleFilter = () => {
    props.onFilter({ country, minBudget, maxBudget });
  };

  return (
    <div className="modal-overlay fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
      <div className="modal-outer bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <p className="modal-title text-2xl font-bold mb-4">Filter Companies</p>
        <div className="modal-input-container mb-4">
          <label className="modal-label text-gray-700" htmlFor="country">Country</label>
          <input
            className="modal-input w-full p-2 border border-gray-300 rounded mt-1"
            type="text"
            id="country"
            value={country || ""}
            onChange={(e) => setCountry(e.target.value)}
          />
        </div>
        <div className="filter-mix-max-container flex justify-between mb-4">
          <div className="filter-min-max-item w-1/2 mr-2">
            <label className="modal-label text-gray-700" htmlFor="min-budget">Min Budget</label>
            <input
              className="modal-input w-full p-2 border border-gray-300 rounded mt-1"
              type="number"
              id="min-budget"
              value={minBudget || ""}
              onChange={(e) => setMinBudget(Number(e.target.value))}
            />
          </div>
          <div className="filter-min-max-item w-1/2 ml-2">
            <label className="modal-label text-gray-700" htmlFor="max-budget">Max Budget</label>
            <input
              className="modal-input w-full p-2 border border-gray-300 rounded mt-1"
              type="number"
              id="max-budget"
              value={maxBudget || ""}
              onChange={(e) => setMaxBudget(Number(e.target.value))}
            />
          </div>
        </div>
        <div className="modal-button-container flex justify-end space-x-4 mt-4">
          <button onClick={props.onClose} className="modal-button bg-red-500 text-white px-4 py-2 rounded">Cancel</button>
          <button onClick={handleFilter} className="modal-button bg-blue-500 text-white px-4 py-2 rounded">Filter</button>
        </div>
      </div>
    </div>
  );
}
