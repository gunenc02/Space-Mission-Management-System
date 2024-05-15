import { useState } from "react";
import { FilterProps } from "../../data-types/modal-props";
import "../../styles/Modal.css";

export default function PlatformsFilter(props: FilterProps) {
  const [minYear, setMinYear] = useState<number | undefined>(undefined);
  const [maxYear, setMaxYear] = useState<number | undefined>(undefined);
  const [minCost, setMinCost] = useState<number | undefined>(undefined);
  const [maxCost, setMaxCost] = useState<number | undefined>(undefined);

  const applyFilter = () => {
    props.onFilter({ minYear, maxYear, minCost, maxCost });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-outer">
        <p className="modal-title">Filter Platforms</p>

        <div className="filter-mix-max-container">
          <div className="filter-min-max-item">
            <label className="modal-label" htmlFor="min-production-year">
              Min Production Year
            </label>
            <input
              className="modal-input"
              type="number"
              id="min-production-year"
              value={minYear}
              onChange={(e) => setMinYear(parseInt(e.target.value))}
            />
          </div>
          <div className="filter-min-max-item">
            <label className="modal-label" htmlFor="max-production-year">
              Max Production Year
            </label>
            <input
              className="modal-input"
              type="number"
              id="max-production-year"
              value={maxYear}
              onChange={(e) => setMaxYear(parseInt(e.target.value))}
            />
          </div>
        </div>

        <div className="filter-mix-max-container">
          <div className="filter-min-max-item">
            <label className="modal-label" htmlFor="min-cost">
              Min Cost per Launch
            </label>
            <input
              className="modal-input"
              type="number"
              id="min-cost"
              value={minCost}
              onChange={(e) => setMinCost(parseInt(e.target.value))}
            />
          </div>
          <div className="filter-min-max-item">
            <label className="modal-label" htmlFor="max-cost">
              Max Cost per Launch
            </label>
            <input
              className="modal-input"
              type="number"
              id="max-cost"
              value={maxCost}
              onChange={(e) => setMaxCost(parseInt(e.target.value))}
            />
          </div>
        </div>

        <div className="modal-button-container">
          <button
            onClick={props.onClose}
            className="modal-button bg-red-500 text-white"
          >
            Cancel
          </button>
          <button
            onClick={applyFilter}
            className="modal-button bg-blue-500 text-white"
          >
            Filter
          </button>
        </div>
      </div>
    </div>
  );
}
