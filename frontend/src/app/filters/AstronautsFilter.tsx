import { useState } from "react";
import { FilterProps } from "../../data-types/modal-props";
import "../../styles/Modal.css";

export default function AstronautsFilter(props: FilterProps) {
  const [country, setCountry] = useState<string | undefined>(undefined);
  const [minAge, setMinAge] = useState<number | undefined>(undefined);
  const [maxAge, setMaxAge] = useState<number | undefined>(undefined);
  const [minSalary, setMinSalary] = useState<number | undefined>(undefined);
  const [maxSalary, setMaxSalary] = useState<number | undefined>(undefined);
  const [onDuty, setOnDuty] = useState<boolean | undefined>(undefined);

  const handleFilter = () => {
    props.onFilter({ country, minAge, maxAge, minSalary, maxSalary, onDuty });
  };

  return (
    <div className="modal-overlay fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
      <div className="modal-outer bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <p className="modal-title text-2xl font-bold mb-4">Filter Astronauts</p>
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
            <label className="modal-label text-gray-700" htmlFor="min-age">Min Age</label>
            <input
              className="modal-input w-full p-2 border border-gray-300 rounded mt-1"
              type="number"
              id="min-age"
              value={minAge || ""}
              onChange={(e) => setMinAge(Number(e.target.value))}
            />
          </div>
          <div className="filter-min-max-item w-1/2 ml-2">
            <label className="modal-label text-gray-700" htmlFor="max-age">Max Age</label>
            <input
              className="modal-input w-full p-2 border border-gray-300 rounded mt-1"
              type="number"
              id="max-age"
              value={maxAge || ""}
              onChange={(e) => setMaxAge(Number(e.target.value))}
            />
          </div>
        </div>
        <div className="filter-mix-max-container flex justify-between mb-4">
          <div className="filter-min-max-item w-1/2 mr-2">
            <label className="modal-label text-gray-700" htmlFor="min-salary">Min Salary</label>
            <input
              className="modal-input w-full p-2 border border-gray-300 rounded mt-1"
              type="number"
              id="min-salary"
              value={minSalary || ""}
              onChange={(e) => setMinSalary(Number(e.target.value))}
            />
          </div>
          <div className="filter-min-max-item w-1/2 ml-2">
            <label className="modal-label text-gray-700" htmlFor="max-salary">Max Salary</label>
            <input
              className="modal-input w-full p-2 border border-gray-300 rounded mt-1"
              type="number"
              id="max-salary"
              value={maxSalary || ""}
              onChange={(e) => setMaxSalary(Number(e.target.value))}
            />
          </div>
        </div>
        <div className="modal-input-container mb-4">
          <label className="modal-label text-gray-700"> On Duty </label>
          <div className="modal-radio-container flex space-x-4 mt-1">
            <label htmlFor="radioYes" className="flex items-center space-x-2">
              <input className="modal-radio" type="radio" id="radioYes" value="yes" name="onDuty" onChange={() => setOnDuty(true)} />
              <span>Yes</span>
            </label>
            <label htmlFor="radioNo" className="flex items-center space-x-2">
              <input className="modal-radio" type="radio" id="radioNo" value="no" name="onDuty" onChange={() => setOnDuty(false)} />
              <span>No</span>
            </label>
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
