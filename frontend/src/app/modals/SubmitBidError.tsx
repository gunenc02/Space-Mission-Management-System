import { SubmitBidErrorProps } from "../../data-types/modal-props";
import "../../styles/Modal.css";

export default function SubmitBidError(props: SubmitBidErrorProps) {
  return (
    <div className="modal-overlay">
      <div className="modal-outer">
        <p className="modal-title">Fire Astronaut</p>
        <p className="modal-warning-text">
          The mission date collides with one of your existing missions.
        </p>

        <button
          onClick={props.onClose}
          style={{ backgroundColor: "blue", color: "white" }}
          className="modal-button"
        >
          OK
        </button>
      </div>
    </div>
  );
}
