import { useParams } from "react-router-dom";
import { Astronaut } from "../../data-types/entities";
import CreateHealthRecord from "../modals/CreateHealthRecord";
import { useState } from "react";

export default function AstronautProfile() {
  const { id } = useParams();
  const [createHealthRecordOpen, setCreateHealthRecordOpen] =
    useState<boolean>(false);

  return (
    <div>
      <h1 className="black">Astronaut Profile</h1>

      <button
        onClick={() => setCreateHealthRecordOpen(!createHealthRecordOpen)}
      >
        Create Health Record
      </button>
      <div>
        {createHealthRecordOpen && (
          <CreateHealthRecord astronautId={Number(id)} />
        )}
      </div>
    </div>
  );
}
