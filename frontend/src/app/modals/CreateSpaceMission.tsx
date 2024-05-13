import { useState } from "react";
import { CreateMissionProps } from "../../data-types/modal-props";
import "../../styles/Modal.css";

export default function CreateSpaceMission(props: CreateMissionProps) {
  
  const [formData, setFormData] = useState({
    missionName: "",
    budget: "",
    image: "",
  });

  //!!! Tag ids and attribute names must match for the updateForm to work properly
  const updateForm = function (e: React.ChangeEvent<HTMLInputElement>) {
    console.log("CHR debug: updateForm invoked");
    //this will simply update formData when a change occurs in one of our input elements
    const { id, value } = e.target;
    console.log(id + "," + value);
    if(id === "image"){
      const imgValue = (e.target.files[0]).toString(); //Might be problematic better check it out
      setFormData((prevState) => ({
        ...prevState, //preserve the unchanged attributes of prevState
        [id]: imgValue,
      }));
    }
    else{
      setFormData((prevState) => ({
        ...prevState, //preserve the unchanged attributes of prevState
        [id]: value,
      }));
    }
  };
  const createHandler = function(){
    const postUrl = `http://localhost:8080/spaceMission/create`;

    //!!! CHECK HERE WHEN DEBUGGING MIGHT BE PROBLEMATIC REQUEST BODY !!!
    const requestBody = {
      missionName: formData.missionName,
      budget: formData.budget,
      image: formData.image,
      creatorId: props.companyId,
    };

    fetch(postUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    }).then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      } 
      else {
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
  
  return (
    <div className="modal-overlay">
      <div className="modal-outer">
        <p className="modal-title">Create Space Mission</p>

        <div className="modal-input-container">
          <label className="modal-label" htmlFor="missionName">
            Mission Name
          </label>

          <input className="modal-input" value={formData.missionName} onChange={updateForm} type="text" id="missionName"></input>
        </div>

        <div className="modal-input-container">
          <label className="modal-label" htmlFor="budget">
            Budget
          </label>

          <input className="modal-input" value={formData.budget} onChange={updateForm} type="text" id="budget"></input>
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
            value={formData.image}
            onChange={updateForm}
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
          onClick={createHandler}
          style={{ backgroundColor: "green", color: "white" }}
          className="modal-button"
        >
          Create
        </button>
      </div>
    </div>
  );
}