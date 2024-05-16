//import { useState } from "react";
import { HealthRecordDetailsProps } from "../../data-types/modal-props";
import "../../styles/Modal.css";
import { HealthRecord } from "../../data-types/entities";
import { useEffect, useState } from "react";

export default function CreateHealthRecord(props: HealthRecordDetailsProps) {
  const [healthRecord, setHealthRecord] = useState<HealthRecord>({
    id: 0,
    astronautId: 0,
    expertId: 0,
    date: new Date(),
    availabilityForMission: false,
    weight: 0,
    height: 0,
    heartRate: 0,
    bloodPressure: 0,
    vaccinations: "",
    notes: "",
  });

  const url = "http://localhost:8080/healthRecord/" + props.healthRecordId;

  useEffect(() => {
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setHealthRecord(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  return (
    <div className="modal-overlay">
      <div className="modal-outer">
        <p className="modal-title">Health Record Details</p>
        <div className="modal-input-container">
          <label className="modal-label" htmlFor="height">
            Height: {healthRecord.height}
          </label>
        </div>
        <div className="modal-input-container">
          <label className="modal-label" htmlFor="weight">
            Weight: {healthRecord.weight}
          </label>
        </div>
        <div className="modal-input-container">
          <label className="modal-label" htmlFor="heartRate">
            Heart Rate: {healthRecord.heartRate}
          </label>
        </div>
        <div className="modal-input-container">
          <label className="modal-label" htmlFor="bloodPressure">
            Blood Pressure: {healthRecord.bloodPressure}
          </label>
        </div>
        <div className="modal-input-container">
          <label className="modal-label" htmlFor="vaccinations">
            Vaccinations: {healthRecord.vaccinations}
          </label>
        </div>
        <div className="modal-input-container">
          <label className="modal-label" htmlFor="notes">
            Notes: {healthRecord.notes}
          </label>
        </div>
        <div className="modal-input-container">
          <label className="modal-label" htmlFor="notes">
            Eligible for Mission:{" "}
            {healthRecord.availabilityForMission ? "Yes" : "No"}
          </label>
        </div>

        <div className="modal-button-container">
          <button
            className="modal-button"
            style={{ backgroundColor: "blue", color: "white" }}
            onClick={props.onClose}
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
}
