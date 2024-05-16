//import { useState } from "react";
import { useState } from "react";
import { offerBid } from "../../calling/bidCaller";
import { SubmitBidProps } from "../../data-types/modal-props";
import "../../styles/Modal.css";

export default function SubmitBid(props: SubmitBidProps) {
  const [formData, setFormData] = useState({
    price: "",
    description: "",
    offererId: -1,
    receiverId: -1,
    missionId: props.missionId,
  });

  const handleSubmit = () => {
    formData.offererId = props.fromCompanyId;
    formData.receiverId =
      props.toCompanyId !== undefined ? props.toCompanyId : -1;
    offerBid(formData, { token: null });
    props.onClose();
    alert("Bid submitted successfully!");
  };

  const updateForm = function (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) {
    const { id, value } = e.target;

    setFormData((prevState) => ({
      ...prevState, //preserve the unchanged attributes of prevState
      [id]: value,
    }));
  };

  return (
    <div className="modal-overlay">
      <div className="modal-outer">
        <p className="modal-title">Submit Bid</p>

        <div className="modal-input-container">
          <label className="modal-label" htmlFor="price">
            Bid Price
          </label>

          <input
            className="modal-input"
            type="text"
            id="price"
            onChange={updateForm}
          ></input>
        </div>

        <div className="modal-input-container">
          <label className="modal-label" htmlFor="description">
            Notes
          </label>

          <textarea
            className="modal-text-area"
            id="description"
            onChange={updateForm}
          ></textarea>
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
            onClick={handleSubmit}
            style={{ backgroundColor: "green", color: "white" }}
            className="modal-button"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
