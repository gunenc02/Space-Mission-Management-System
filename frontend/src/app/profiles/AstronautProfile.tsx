import { useParams } from "react-router-dom";
import CreateHealthRecord from "../modals/CreateHealthRecord";
import { useState } from "react";
import HealthRecordDetails from "../modals/HealthRecordDetails";
import FireAstronaut from "../modals/FireAstronaut";

export default function AstronautProfile() {
  const { id } = useParams();
  const [createHealthRecordOpen, setCreateHealthRecordOpen] =
    useState<boolean>(false);
  const [fireAstronautOpen, setFireAstronautOpen] = useState<boolean>(false);
  const [healthRecordDetailsOpen, setHealthRecordDetailsOpen] =
    useState<boolean>(false);

  const handleCreateHealthRecordClick = () => {
    setCreateHealthRecordOpen(!createHealthRecordOpen);
  };

  const handleFireAstronautClick = () => {
    setFireAstronautOpen(!fireAstronautOpen);
  };

  const handleHealthRecordDetailsClick = () => {
    setHealthRecordDetailsOpen(!healthRecordDetailsOpen);
  };

  return (
    <div>
      <h1 className="black">Astronaut Profile</h1>

      <button onClick={handleCreateHealthRecordClick}>
        Create Health Record
      </button>
      <button onClick={handleFireAstronautClick}>Fire Astronaut</button>
      <button onClick={handleHealthRecordDetailsClick}>
        Health Record Details
      </button>

      <div>
        {createHealthRecordOpen && (
          <CreateHealthRecord
            astronautId={Number(id)}
            onClose={handleCreateHealthRecordClick}
          />
        )}
      </div>
      <div>
        {fireAstronautOpen && (
          <FireAstronaut
            astronautId={Number(id)}
            onClose={handleFireAstronautClick}
          />
        )}
      </div>
      <div>
        {healthRecordDetailsOpen && (
          <HealthRecordDetails
            healthRecordId={Number(id)}
            onClose={handleHealthRecordDetailsClick}
          />
        )}
      </div>
    </div>
  );
}
