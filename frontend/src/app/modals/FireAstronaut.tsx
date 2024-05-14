//import { useState } from "react";
import { FireAstronautProps } from "../../data-types/modal-props";
import "../../styles/Modal.css";

export default function FireAstronaut(props: FireAstronautProps) {
  const handleFire = function () {
    const deleteUrl = "http://localhost:8080/fireAstronaut";
    const performerId = "??????????companyId"; // company id we must retrieve via login
    const requestBody = {
      id: performerId,
      astronautId: props.astronautId,
    };

    fetch(deleteUrl, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network respone was not ok");
        } else {
          //delete successful close the modal
          props.onClose();
        }
      })
      .catch((error) => {
        // Handle errors here
        console.error(
          "There was a problem with the fetch (delete (fireAstronaut)) operation:",
          error
        );
      });
  };

  //FIX BACKEND FIRST TO IMPLEMENT FETCH OF THIS
  return (
    <div className="modal-overlay">
      <div className="modal-outer">
        <p className="modal-title">Fire Astronaut</p>
        <p className="modal-warning-text">
          Are you sure you want to fire this astronaut?
        </p>

        <div className="modal-button-container">
          <button
            onClick={props.onClose}
            style={{ backgroundColor: "blue", color: "white" }}
            className="modal-button"
          >
            Cancel
          </button>
          <button
            onClick={handleFire}
            style={{ backgroundColor: "red", color: "white" }}
            className="modal-button"
          >
            Fire
          </button>
        </div>
      </div>
    </div>
  );
}
