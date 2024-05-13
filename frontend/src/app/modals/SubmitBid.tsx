//import { useState } from "react";
import { SubmitBidProps } from "../../data-types/modal-props";
import "../../styles/Modal.css";

export default function CreateSpaceMission(props: SubmitBidProps) {
  return (
    <div className="modal-overlay">
      <div className="modal-outer">
        <p className="modal-title">Submit Bid</p>

        <div className="modal-input-container">
          <label className="modal-label" htmlFor="price">
            Bid Price
          </label>

          <input className="modal-input" type="text" id="price"></input>
        </div>

        <div className="modal-input-container">
          <label className="modal-label" htmlFor="notes">
            Notes
          </label>

          <textarea className="modal-text-area" id="notes"></textarea>
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
          style={{ backgroundColor: "green", color: "white" }}
          className="modal-button"
        >
          Submit
        </button>
      </div>
    </div>
  );
}
