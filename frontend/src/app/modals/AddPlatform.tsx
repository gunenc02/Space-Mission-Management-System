import { useState } from "react";
import { AddPlatformProps } from "../../data-types/modal-props";
import "../../styles/Modal.css";

export default function AddPlatform(props: AddPlatformProps) {
  const [formData, setFormData] = useState({
    platformName: "",
    productionYear: null,
    costPerLaunch: null,
    image: "",
  });

  //!!! Tag ids and attribute names must match for the updateForm to work properly
  const updateForm = function (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) {
    //this will simply update formData when a change occurs in one of our input elements
    const { id, value } = e.target;
    console.log(id + "," + value);
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
    const postUrl = `http://localhost:8080/platform/create`;

    const requestBody = {
      platformName: formData.platformName,
      productionYear: formData.productionYear,
      costPerLaunch: formData.costPerLaunch,
      image: formData.image,
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
        <p className="modal-title">Add Platform</p>

        <div className="modal-input-container">
          <label className="modal-label" htmlFor="platformName">
            Platform Name
          </label>

          <input
            className="modal-input"
            value={formData.platformName}
            onChange={updateForm}
            type="text"
            id="platformName"
          ></input>
        </div>

        <div className="modal-input-container">
          <label className="modal-label" htmlFor="productionYear">
            Production Year
          </label>

          <input
            className="modal-input"
            value={formData.productionYear}
            onChange={updateForm}
            type="number"
            id="productionYear"
          ></input>
        </div>

        <div className="modal-input-container">
          <label className="modal-label" htmlFor="costPerLaunch">
            Cost per Launch
          </label>

          <input
            className="modal-input"
            value={formData.costPerLaunch}
            onChange={updateForm}
            type="number"
            id="costPerLaunch"
          ></input>
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
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
