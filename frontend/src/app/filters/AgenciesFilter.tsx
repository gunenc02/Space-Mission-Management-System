import { FilterProps } from "../../data-types/modal-props";
import "../../styles/Modal.css";

export default function AgenciesFilter(props: FilterProps) {
  return (
    <div className="modal-overlay">
      <div className="modal-outer">
        <p className="modal-title">Filter Agencies</p>

        <div className="modal-input-container">
          <label style={{ marginTop: 20 }}> Is Approved? </label>
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
