import { useState } from "react";
import { CreateMissionProps } from "../../data-types/modal-props";
import "../../styles/Modal.css";

export default function CreateSpaceMission(props: CreateMissionProps) {
  const [formData, setFormData] = useState({
    missionName: "",
    budget: "",
    objective: "",
    image: "",
  });

  //!!! Tag ids and attribute names must match for the updateForm to work properly
  const updateForm = function (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) {
    const { id, value } = e.target;

    if (id === "image") {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        // Strip out the data:image/jpeg;base64, part
        const base64Image = base64String.split(",")[1];
        setFormData((prevState) => ({
          ...prevState,
          image: base64Image,
        }));
      };
      reader.readAsDataURL(file);
    } else {
      setFormData((prevState) => ({
        ...prevState, //preserve the unchanged attributes of prevState
        [id]: value,
      }));
    }
  };

  const createHandler = function () {
    const postUrl = `http://localhost:8080/spaceMission/create`;

    //!!! CHECK HERE WHEN DEBUGGING MIGHT BE PROBLEMATIC REQUEST BODY !!!
    const requestBody = {
      missionName: formData.missionName,
      budget: formData.budget,
      objective: formData.objective,
      image: formData.image,
      creatorId: props.companyId,
    };

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
        } else {
          // reload page
          window.location.reload();
          props.onClose();
        }
      })
      .catch((error) => {
        // Handle errors here
        console.error("There was a problem with the fetch operation:", error);
      });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-outer">
        <p className="modal-title">Create Space Mission</p>

        <div className="modal-input-container">
          <label className="modal-label" htmlFor="missionName">
            Mission Name
          </label>

          <input
            className="modal-input"
            value={formData.missionName}
            onChange={updateForm}
            type="text"
            id="missionName"
          ></input>
        </div>

        <div className="modal-input-container">
          <label className="modal-label" htmlFor="budget">
            Budget
          </label>

          <input
            className="modal-input"
            value={formData.budget}
            onChange={updateForm}
            type="number"
            id="budget"
          ></input>
        </div>

        <div className="modal-input-container">
          <label className="modal-label" htmlFor="objective">
            Mission Objective
          </label>

          <textarea
            className="modal-text-area"
            id="objective"
            name="objective"
            onChange={updateForm}
          ></textarea>
        </div>

        <div className="modal-input-container">
          <label className="modal-label" htmlFor="image">
            Image
          </label>

          <input
            type="file"
            onChange={updateForm}
            id="image"
            name="image"
            accept="jpg, jpeg, png"
            className="modal-input"
          />
        </div>

        <div className="modal-button-container ">
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
    </div>
  );
}
