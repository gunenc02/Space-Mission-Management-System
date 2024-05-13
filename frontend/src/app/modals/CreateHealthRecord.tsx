import { useState } from "react";
//import React from "react";
import { CreateHealthRecordProps } from "../../data-types/modal-props";
import "../../styles/Modal.css";

/*function fetchSuccess() {}
function handleChange() {
  //empty function
}*/

export default function CreateHealthRecord(props: CreateHealthRecordProps) {
  const [errVisible, setErrVisible] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    height: "",
    weight: "",
    heartRate: "",
    bloodPressure: "",
    vaccinations: "",
    notes: "",
    eligible: "",
  });

  const updateForm = function (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    console.log("CHR debug: updateForm invoked");
    //this will simply update formData when a change occurs in one of our input elements
    const { id, value } = e.target;
    console.log(id + "," + value);
    setFormData((prevState) => ({
      ...prevState, //preserve the unchanged attributes of prevState
      [id]: value,
    }));
  };
  const radioChange = function (e: React.ChangeEvent<HTMLInputElement>) {
    setFormData((prevState) => ({
      ...prevState,
      eligible: e.target.value,
    }));
  };
  const registerHandler = function () {
    console.log("CHR debug: registerHandler invoked");

    //console.log("CHR debug formData is: " + formData.toString());
    //evaluate formData to ensure that retrieved input is okay
    console.log("Debug CHR:" + formData.height + "" + formData.weight);
    if (
      formData.height !== "" &&
      formData.weight !== "" &&
      formData.heartRate !== "" &&
      formData.bloodPressure !== "" &&
      formData.vaccinations !== "" &&
      formData.eligible !== ""
    ) {
      setErrVisible(false);
      const castedHeight = parseFloat(formData.height);
      const castedWeight = parseFloat(formData.weight);
      const castedHeartRate = parseInt(formData.heartRate);

      if (castedHeight == 0 || castedWeight == 0 || castedHeartRate === 0) {
        setErrVisible(true);
      } else {
        console.log("CHR debug: about to send the post request");
        //we can register the healthRecord to backend now
        const postUrl = `http://localhost:8080/healthRecord/create`;

        const currDate = new Date();
        const day = currDate.getDate();
        const month = currDate.getMonth() + 1;
        const year = currDate.getFullYear();
        const dateStr = year + "-" + month + "-" + day;

        const requestBody = {
          height: castedHeight,
          weight: castedWeight,
          heartRate: castedHeartRate,
          bloodPressure: formData.bloodPressure,
          vaccinations: formData.vaccinations,
          notes: formData.notes,
          availibilityForMission: formData.eligible,
          date: dateStr,
        };

        // Send a POST request to register the health record
        fetch(postUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
              console.log("Debug CHR: first then if");
            } else {
              //close the modal, the health record has been registered
              props.onClose();
            }
          })
          .catch((error) => {
            // Handle errors here
            console.error(
              "There was a problem with the fetch operation:",
              error
            );
          });
      }
    } else {
      console.log("Debug CHR: outer else");
      setErrVisible(true);
    }
  };
  return (
    <div className="modal-overlay">
      <div className="modal-outer">
        <p className="modal-title">Create Health Record</p>
        <div className="modal-input-container">
          <label className="modal-label" htmlFor="height">
            Height:
          </label>
          <input
            className="modal-input"
            type="text"
            value={formData.height}
            onChange={updateForm}
            id="height"
          ></input>
        </div>
        <div className="modal-input-container">
          <label className="modal-label" htmlFor="weight">
            Weight:
          </label>

          <input
            className="modal-input"
            type="text"
            value={formData.weight}
            onChange={updateForm}
            id="weight"
          ></input>
        </div>
        <div className="modal-input-container">
          <label className="modal-label" htmlFor="heartRate">
            Heart Rate:
          </label>
          <input
            className="modal-input"
            type="text"
            value={formData.heartRate}
            onChange={updateForm}
            id="heartRate"
          ></input>
        </div>
        <div className="modal-input-container">
          <label className="modal-label" htmlFor="bloodPressure">
            Blood Pressure:
          </label>
          <input
            className="modal-input"
            type="text"
            value={formData.bloodPressure}
            onChange={updateForm}
            id="bloodPressure"
          ></input>
        </div>
        <div className="modal-input-container">
          <label className="modal-label" htmlFor="vaccinations">
            Vaccinations (, separated list)
          </label>
          <textarea
            className="modal-input"
            id="vaccinations"
            value={formData.vaccinations}
            onChange={updateForm}
          ></textarea>
        </div>
        <div className="modal-input-container">
          <label className="modal-label" htmlFor="notes">
            Notes
          </label>
          <textarea
            className="modal-text-area"
            id="notes"
            value={formData.notes}
            onChange={updateForm}
          ></textarea>
        </div>

        <div className="modal-input-container">
          <label className="modal-label"> Eligible for mission: </label>
          <div className="modal-radio-container">
            <label htmlFor="radioYes">Yes</label>
            <input
              className="modal-radio"
              type="radio"
              id="radioYes"
              value="yes"
              name="eligible"
              onChange={radioChange}
            ></input>
            <label htmlFor="radioNo">No</label>
            <input
              className="modal-radio"
              type="radio"
              id="radiono"
              value="no"
              name="eligible"
              onChange={radioChange}
            ></input>
          </div>
        </div>

        <h5
          style={{
            color: "red",
            visibility: errVisible ? "visible" : "hidden",
          }}
        >
          Fields (except notes) cannot be empty
        </h5>
        <button
          className="modal-button"
          onClick={props.onClose}
          style={{ backgroundColor: "red", color: "white" }}
        >
          Cancel
        </button>
        <button
          className="modal-button"
          onClick={registerHandler}
          style={{ backgroundColor: "green", color: "white" }}
        >
          Register
        </button>
      </div>
    </div>
  );
}
