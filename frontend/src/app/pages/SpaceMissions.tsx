import { useEffect, useState } from "react";
import Header from "../../components/Header";
import Navbar from "../../components/Navbar";
import { SpaceMission } from "../../data-types/entities";
import { getSpaceMissions } from "../../calling/spaceMissionCaller";

export default function SpaceMissions() {
  const [spaceMissions, setSpaceMissions] = useState<SpaceMission[]>([]);

  // Fetch astronauts from the server
  useEffect(() => {
    getSpaceMissions({ token: "" }).then((data) => {
      setSpaceMissions(data);
    });
  }, []);

  return (
    <div className="outer">
      <Header />
      <Navbar />
      <div className="list-container">
        {spaceMissions.map((spaceMission: SpaceMission) => (
          <div className="list-item" key={spaceMission.id}>
            <div className="list-image-box">
              <img src={spaceMission.image} />
            </div>
            <div className="list-information-box">
              <p>Name: {spaceMission.missionName}</p>
              <p>Objective: {spaceMission.objective}</p>
              <p>Budget: {spaceMission.budget}</p>
              <p>
                Create Date:{" "}
                {new Date(spaceMission.createDate).toLocaleDateString()}
              </p>
              <p>
                Perform Date:{" "}
                {new Date(spaceMission.performDate).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
