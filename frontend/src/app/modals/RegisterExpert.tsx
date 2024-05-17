import { useState } from "react";
import {
  //FireAstronautProps,
  RegisterExpertProps,
} from "../../data-types/modal-props";
import "../../styles/Modal.css";

export default function RegisterExpert(props: RegisterExpertProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  const updateForm = function (e: React.ChangeEvent<HTMLInputElement>) {
    const { id, value } = e.target;
    console.log(id + "," + value);
    setFormData((prevState) => ({
      ...prevState, //preserve the unchanged attributes of prevState
      [id]: value,
    }));
  };

  const registerHandler = function () {
    const postUrl = `http://localhost:8080/expert/register`;

    if (formData.password === formData.confirm_password) {
      const requestBody = {
        id: props.expertId,
        companyId: props.companyId,
        name: formData.name,
        mail: formData.email,
        password: formData.password,
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
            //close the modal, the health record has been registered
            alert("Expert was registered");
            window.location.reload();
            props.onClose();
          }
        })
        .catch((error) => {
          // Handle errors here
          console.error("There was a problem with the fetch operation:", error);
        });
    } else {
      console.log("Passwords don't match");
      //ToDo
      //Display a red label indicating passwords do not match
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-outer">
        <p className="modal-title">Register Expert</p>

        <div className="modal-input-container">
          <label className="modal-label" htmlFor="name">
            Expert Name
          </label>

          <input
            className="modal-input"
            value={formData.name}
            onChange={updateForm}
            type="text"
            id="name"
          ></input>
        </div>

        <div className="modal-input-container">
          <label className="modal-label" htmlFor="email">
            Expert Email
          </label>

          <input
            className="modal-input"
            value={formData.email}
            onChange={updateForm}
            type="text"
            id="email"
          ></input>
        </div>

        <div className="modal-input-container">
          <label className="modal-label" htmlFor="password">
            Expert Password
          </label>

          <input
            className="modal-input"
            value={formData.password}
            onChange={updateForm}
            type="password"
            id="password"
          ></input>
        </div>

        <div className="modal-input-container">
          <label className="modal-label" htmlFor="confirm_password">
            Confirm Expert Password
          </label>

          <input
            className="modal-input"
            value={formData.confirm_password}
            onChange={updateForm}
            type="password"
            id="confirm_password"
          ></input>
        </div>

        <div className="modal-button-container">
          <button
            onClick={props.onClose}
            style={{ backgroundColor: "red", color: "white" }}
            className="modal-button"
          >
            Cancel
          </button>
          <button
            onClick={registerHandler}
            style={{ backgroundColor: "green", color: "white" }}
            className="modal-button"
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
}
