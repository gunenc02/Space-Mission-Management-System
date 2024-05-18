import { useState } from "react";
import { FilterProps } from "../../data-types/modal-props";
import "../../styles/Modal.css";

export default function SpaceMissionsFilter(props: FilterProps) {
  const [minBudget, setMinBudget] = useState<number | undefined>(undefined);
  const [maxBudget, setMaxBudget] = useState<number | undefined>(undefined);
  const [minCreateDate, setMinCreateDate] = useState<string | undefined>(undefined);
  const [maxCreateDate, setMaxCreateDate] = useState<string | undefined>(undefined);
  const [minPerformDate, setMinPerformDate] = useState<string | undefined>(undefined);
  const [maxPerformDate, setMaxPerformDate] = useState<string | undefined>(undefined);

  const handleFilter = () => {
    props.onFilter({ minBudget, maxBudget, minCreateDate, maxCreateDate, minPerformDate, maxPerformDate });
  };

  return (
    <div className="modal-overlay fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
      <div className="modal-outer bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <p className="modal-title text-2xl font-bold mb-4">Filter Space Missions</p>
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
        <div className="filter-mix-max-container flex justify-between mb-4">
          <div className="filter-min-max-item w-1/2 mr-2">
            <label className="modal-label text-gray-700" htmlFor="min-create-date">Min Create Date</label>
            <input
              className="modal-input w-full p-2 border border-gray-300 rounded mt-1"
              type="date"
              id="min-create-date"
              value={minCreateDate || ""}
              onChange={(e) => setMinCreateDate(e.target.value)}
            />
          </div>
          <div className="filter-min-max-item w-1/2 ml-2">
            <label className="modal-label text-gray-700" htmlFor="max-create-date">Max Create Date</label>
            <input
              className="modal-input w-full p-2 border border-gray-300 rounded mt-1"
              type="date"
              id="max-create-date"
              value={maxCreateDate || ""}
              onChange={(e) => setMaxCreateDate(e.target.value)}
            />
          </div>
        </div>
        <div className="filter-mix-max-container flex justify-between mb-4">
          <div className="filter-min-max-item w-1/2 mr-2">
            <label className="modal-label text-gray-700" htmlFor="min-perform-date">Min Perform Date</label>
            <input
              className="modal-input w-full p-2 border border-gray-300 rounded mt-1"
              type="date"
              id="min-perform-date"
              value={minPerformDate || ""}
              onChange={(e) => setMinPerformDate(e.target.value)}
            />
          </div>
          <div className="filter-min-max-item w-1/2 ml-2">
            <label className="modal-label text-gray-700" htmlFor="max-perform-date">Max Perform Date</label>
            <input
              className="modal-input w-full p-2 border border-gray-300 rounded mt-1"
              type="date"
              id="max-perform-date"
              value={maxPerformDate || ""}
              onChange={(e) => setMaxPerformDate(e.target.value)}
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
