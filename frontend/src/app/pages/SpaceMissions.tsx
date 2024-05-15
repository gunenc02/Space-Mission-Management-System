import { useEffect, useState } from "react";
import Header from "../../components/Header";
import Navbar from "../../components/Navbar";
import { SpaceMission } from "../../data-types/entities";
import { getSpaceMissions } from "../../calling/spaceMissionCaller";
import CreateSpaceMission from "../modals/CreateSpaceMission";
import { RequestCookies } from "next/dist/compiled/@edge-runtime/cookies";
import "../../styles/App.css";
import { getExpertById } from "../../calling/expertCaller";

export default function SpaceMissions() {
  const [spaceMissions, setSpaceMissions] = useState<SpaceMission[]>([]);
  const [createMissionOpen, setCreateMissionOpen] = useState(false);

  const handleCreateMissionClick = () => {
    setCreateMissionOpen(!createMissionOpen);
  };

  // Fetch astronauts from the server
  useEffect(() => {
    getSpaceMissions({ token: "" }).then((data) => {
      setSpaceMissions(data);
      getExpertById(1, { token: "" });
    });
  }, []);

  return (
    <div className="outer">
      <Header />
      <Navbar />
      {localStorage.getItem("userRole") === "COMPANY" && (
        <button className="top-button" onClick={handleCreateMissionClick}>
          Create Space Mission
        </button>
      )}

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
      <div>
        {createMissionOpen && (
          <CreateSpaceMission
            companyId={Number(localStorage.getItem("userId"))}
            onClose={handleCreateMissionClick}
          />
        )}
      </div>
    </div>
  );
}
