import { FilterProps } from "../../data-types/modal-props";
import "../../styles/Modal.css";

export default function SpaceMissionsFilter(props: FilterProps) {
  return (
    <div className="modal-overlay">
      <div className="modal-outer">
        <p className="modal-title">Filter Space Missions</p>

        <div className="filter-mix-max-container">
          <div className="filter-min-max-item">
            <label className="modal-label" htmlFor="min-budget">
              Min Budget
            </label>

            <input className="modal-input" type="number" id="text"></input>
          </div>
          <div className="filter-min-max-item">
            <label className="modal-label" htmlFor="max-budget">
              Max Budget
            </label>

            <input className="modal-input" type="number" id="text"></input>
          </div>
        </div>

        <div className="filter-mix-max-container">
          <div className="filter-min-max-item">
            <label className="modal-label" htmlFor="min-create-date">
              Min Create Date
            </label>

            <input className="modal-input" type="date"></input>
          </div>
          <div className="filter-min-max-item">
            <label className="modal-label" htmlFor="max-create-date">
              Max Create Date
            </label>

            <input className="modal-input" type="date"></input>
          </div>
        </div>

        <div className="filter-mix-max-container">
          <div className="filter-min-max-item">
            <label className="modal-label" htmlFor="min-perform-date">
              Min Perform Date
            </label>

            <input className="modal-input" type="date"></input>
          </div>
          <div className="filter-min-max-item">
            <label className="modal-label" htmlFor="max-perform-date">
              Max Perform Date
            </label>

            <input className="modal-input" type="date"></input>
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
