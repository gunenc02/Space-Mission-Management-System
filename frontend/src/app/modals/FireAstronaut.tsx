//import { useState } from "react";
import { FireAstronautProps } from "../../data-types/modal-props";
import "../../styles/Modal.css";

export default function FireAstronaut(props: FireAstronautProps) {
  const handleFire = function(){
    const deleteUrl = "http://localhost:8080/";
  }

  //FIX BACKEND FIRST TO IMPLEMENT FETCH OF THIS
  return (
    <div className="modal-overlay">
      <div className="modal-outer">
        <p className="modal-title">Fire Astronaut</p>
        <p className="modal-warning-text">
          Are you sure you want to fire this astronaut?
        </p>

        <button
          onClick={props.onClose}
          style={{ backgroundColor: "blue", color: "white" }}
          className="modal-button"
        >
          Cancel
        </button>
        <button
          onClick={props.onClose}
          style={{ backgroundColor: "red", color: "white" }}
          className="modal-button"
        >
          Fire
        </button>
      </div>
    </div>
  );
}
