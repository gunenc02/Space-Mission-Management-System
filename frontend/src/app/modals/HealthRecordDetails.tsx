import { useState } from "react";
import { HealthRecordDetailsProps } from "../../data-types/modal-props";
import "../../styles/Modal.css";
import { HealthRecord } from "../../data-types/entities";

export default function CreateHealthRecord(props: HealthRecordDetailsProps) {
  const healthRecord: HealthRecord = {
    id: 1,
    astronautId: 123,
    expertId: 456,
    date: new Date(),
    availabilityForMission: true,
    weight: 70,
    height: 180,
    heartRate: 75,
    bloodPressure: 120,
    vaccinations: "COVID-19, Influenza",
    notes: "No significant issues.",
  };

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

        <button
          className="modal-button"
          style={{ backgroundColor: "blue", color: "white" }}
          onClick={props.onClose}
        >
          OK
        </button>
      </div>
    </div>
  );
}
