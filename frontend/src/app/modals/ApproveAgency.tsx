//import { useState } from "react";
import { ApproveAgencyProps } from "../../data-types/modal-props";
import "../../styles/Modal.css";

export default function ApproveAgency(props: ApproveAgencyProps) {
  const approveHandler = function(){
    const postUrl = `http://localhost:8080/admin`;

    const requestBody = {
      id: props.agencyId
    };
    // send a post request for approval of this agency
    fetch(postUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", 
      },
      body: JSON.stringify(requestBody),  
    
    })

    props.onClose(); //place at the corrct position
  }

  return (
    <div className="modal-overlay">
      <div className="modal-outer">
        <p className="modal-title">Approve Agency</p>
        <p className="modal-warning-text">
          Are you sure you want to approve this agency?
        </p>

        <button
          onClick={props.onClose}
          style={{ backgroundColor: "red", color: "white" }}
          className="modal-button"
        >
          Cancel
        </button>
        <button
          onClick={approveHandler}
          style={{ backgroundColor: "green", color: "white" }}
          className="modal-button"
        >
          Approve
        </button>
      </div>
    </div>
  );
}
