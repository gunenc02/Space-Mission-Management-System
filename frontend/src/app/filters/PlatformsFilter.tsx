import { FilterProps } from "../../data-types/modal-props";
import "../../styles/Modal.css";

export default function PlatformsFilter(props: FilterProps) {
  return (
    <div className="modal-overlay">
      <div className="modal-outer">
        <p className="modal-title">Filter Platforms</p>

        <div className="filter-mix-max-container">
          <div className="filter-min-max-item">
            <label className="modal-label" htmlFor="min-production-year">
              Min Production Year
            </label>

            <input className="modal-input" type="number" id="text"></input>
          </div>
          <div className="filter-min-max-item">
            <label className="modal-label" htmlFor="max-production-year">
              Max Production Year
            </label>

            <input className="modal-input" type="number" id="text"></input>
          </div>
        </div>

        <div className="filter-mix-max-container">
          <div className="filter-min-max-item">
            <label className="modal-label" htmlFor="min-cost">
              Min Cost per Launch
            </label>

            <input className="modal-input" type="number" id="text"></input>
          </div>
          <div className="filter-min-max-item">
            <label className="modal-label" htmlFor="max-cost">
              Max Cost per Launch
            </label>

            <input className="modal-input" type="number" id="text"></input>
          </div>
        </div>

        <button
          onClick={props.onClose}
          style={{ backgroundColor: "red", color: "white" }}
          className="modal-button"
        >
          Cancel
        </button>
        <button
          onClick={props.onClose}
          style={{ backgroundColor: "blue", color: "white" }}
          className="modal-button"
        >
          Filter
        </button>
      </div>
    </div>
  );
}
