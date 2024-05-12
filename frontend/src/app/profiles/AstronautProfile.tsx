import { useParams } from "react-router-dom";
import { Astronaut } from "../../data-types/entities";
import CreateHealthRecord from "../modals/CreateHealthRecord";
import { useState } from "react";

export default function AstronautProfile() {
  const { id } = useParams();
  const [createHealthRecordOpen, setCreateHealthRecordOpen] =
    useState<boolean>(false);

  const handleCreateHealthRecordClick = () => {
    setCreateHealthRecordOpen(!createHealthRecordOpen);
  };

  return (
    <div>
      <h1 className="black">Astronaut Profile</h1>

      <button onClick={handleCreateHealthRecordClick}>
        Create Health Record
      </button>
      <div>
        {createHealthRecordOpen && (
          <CreateHealthRecord
            astronautId={Number(id)}
            onClose={handleCreateHealthRecordClick}
          />
        )}
      </div>
    </div>
  );
}
