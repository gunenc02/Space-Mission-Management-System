import { useState } from "react";
import { CreateMissionProps } from "../../data-types/modal-props";
import "../../styles/Modal.css";

export default function CreateSpaceMission(props: CreateMissionProps) {
  return (
    <div className="modal-overlay">
      <div className="modal-outer">
        <p className="modal-title">Create Space Mission</p>

        <div className="modal-input-container">
          <label className="modal-label" htmlFor="name">
            Mission Name
          </label>

          <input className="modal-input" type="text" id="name"></input>
        </div>

        <div className="modal-input-container">
          <label className="modal-label" htmlFor="budget">
            Budget
          </label>

          <input className="modal-input" type="text" id="budget"></input>
        </div>

        <div className="modal-input-container">
          <label className="modal-label" htmlFor="objective">
            Mission Objective
          </label>

          <textarea className="modal-text-area" id="objective"></textarea>
        </div>

        <div className="modal-input-container">
          <label className="modal-label" htmlFor="image">
            Image
          </label>

          <input
            type="file"
            id="image"
            name="image"
            accept="jpg, jpeg, png"
            className="modal-input"
          />
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
          Create
        </button>
      </div>
    </div>
  );
}
