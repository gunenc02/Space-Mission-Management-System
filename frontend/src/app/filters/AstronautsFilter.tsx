import { FilterProps } from "../../data-types/modal-props";
import "../../styles/Modal.css";

export default function AstronautsFilter(props: FilterProps) {
  return (
    <div className="modal-overlay">
      <div className="modal-outer">
        <p className="modal-title">Filter Astronauts</p>

        <div className="modal-input-container">
          <label className="modal-label" htmlFor="country">
            Country
          </label>

          <input className="modal-input" type="text" id="country"></input>
        </div>

        <div className="filter-mix-max-container">
          <div className="filter-min-max-item">
            <label className="modal-label" htmlFor="min-age">
              Min Age
            </label>

            <input className="modal-input" type="number" id="text"></input>
          </div>
          <div className="filter-min-max-item">
            <label className="modal-label" htmlFor="max-age">
              Max Age
            </label>

            <input className="modal-input" type="number" id="text"></input>
          </div>
        </div>

        <div className="filter-mix-max-container">
          <div className="filter-min-max-item">
            <label className="modal-label" htmlFor="min-salary">
              Min Salary
            </label>

            <input className="modal-input" type="number" id="text"></input>
          </div>
          <div className="filter-min-max-item">
            <label className="modal-label" htmlFor="max-salary">
              Max Salary
            </label>

            <input className="modal-input" type="number" id="text"></input>
          </div>
        </div>

        <div className="modal-input-container">
          <label style={{ marginTop: 20 }}> On Mission </label>
          <div className="modal-radio-container">
            <label htmlFor="radioYes">Yes</label>
            <input
              className="modal-radio"
              type="radio"
              id="radioYes"
              value="yes"
              name="eligible"
            ></input>
            <label htmlFor="radioNo">No</label>
            <input
              className="modal-radio"
              type="radio"
              id="radiono"
              value="no"
              name="eligible"
            ></input>
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
