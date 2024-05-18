import { useState } from "react";
import { FilterProps } from "../../data-types/modal-props";
import "../../styles/Modal.css";

export default function AgenciesFilter(props: FilterProps) {
  const [isApproved, setIsApproved] = useState<boolean | undefined>(undefined);

  const handleFilter = () => {
    props.onFilter({ isApproved });
  };

  return (
    <div className="modal-overlay fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
      <div className="modal-outer bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <p className="modal-title text-2xl font-bold mb-4">Filter Agencies</p>
        <div className="modal-input-container mb-4">
          <label style={{ marginTop: 20 }} className="modal-label text-gray-700"> Is Approved? </label>
          <div className="modal-radio-container flex justify-around mt-2">
            <div>
              <label htmlFor="radioYes" className="mr-2">Yes</label>
              <input
                className="modal-radio"
                type="radio"
                id="radioYes"
                name="isApproved"
                onChange={() => setIsApproved(true)}
              />
            </div>
            <div>
              <label htmlFor="radioNo" className="mr-2">No</label>
              <input
                className="modal-radio"
                type="radio"
                id="radioNo"
                name="isApproved"
                onChange={() => setIsApproved(false)}
              />
            </div>
          </div>
        </div>
        <div className="modal-button-container flex justify-end space-x-4 mt-4">
          <button onClick={props.onClose} className="modal-button bg-red-500 text-white px-4 py-2 rounded">Cancel</button>
          <button onClick={handleFilter} className="modal-button bg-blue-500 text-white px-4 py-2 rounded">Filter</button>
        </div>
      </div>
    </div>
  );
}
