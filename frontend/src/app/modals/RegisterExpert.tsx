import { useState } from "react";
import {
  FireAstronautProps,
  RegisterExpertProps,
} from "../../data-types/modal-props";
import "../../styles/Modal.css";

export default function RegisterExpert(props: RegisterExpertProps) {
  return (
    <div className="modal-overlay">
      <div className="modal-outer">
        <p className="modal-title">Register Expert</p>

        <div className="modal-input-container">
          <label className="modal-label" htmlFor="name">
            Expert Name
          </label>

          <input className="modal-input" type="text" id="name"></input>
        </div>

        <div className="modal-input-container">
          <label className="modal-label" htmlFor="email">
            Expert Email
          </label>

          <input className="modal-input" type="text" id="email"></input>
        </div>

        <div className="modal-input-container">
          <label className="modal-label" htmlFor="password">
            Expert Password
          </label>

          <input className="modal-input" type="password" id="password"></input>
        </div>

        <div className="modal-input-container">
          <label className="modal-label" htmlFor="confirm-password">
            Confirm Expert Password
          </label>

          <input
            className="modal-input"
            type="password"
            id="confirm-password"
          ></input>
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
          Register
        </button>
      </div>
    </div>
  );
}
