import { FilterProps } from "../../data-types/modal-props";
import "../../styles/Modal.css";

export default function CompaniesFilter(props: FilterProps) {
  return (
    <div className="modal-overlay">
      <div className="modal-outer">
        <p className="modal-title">Filter Companies</p>

        <div className="modal-input-container">
          <label className="modal-label" htmlFor="country">
            Country
          </label>

          <input className="modal-input" type="text" id="country"></input>
        </div>

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
