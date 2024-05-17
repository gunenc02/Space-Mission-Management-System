import { useParams } from "react-router-dom";
import CreateHealthRecord from "../modals/CreateHealthRecord";
import { useEffect, useState } from "react";
import HealthRecordDetails from "../modals/HealthRecordDetails";
import FireAstronaut from "../modals/FireAstronaut";

import { Link } from "react-router-dom";
import Header from "../../components/Header";
import Navbar from "../../components/Navbar";
import {
  Astronaut,
  HealthRecord,
  SpaceMission,
} from "../../data-types/entities";
import { getAstronautProfile } from "../../calling/astronautCaller";

export default function AstronautProfile() {
  const [astronaut, setAstronaut] = useState<Astronaut>(null);
  const [spaceMissions, setSpaceMissions] = useState<SpaceMission[]>([]);
  const [healthRecords, setHealthRecords] = useState<HealthRecord[]>([]);

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

  const fetchMissions = function () {
    const url =
      "http://localhost:8080/spaceMission/getSpaceMissionsByAstronautId/" + id;

    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setSpaceMissions(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  const fetchHealthRecords = function () {
    const sentUrl = "http://localhost:8080/astronaut/getHealthRecords/" + id;

    fetch(sentUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          throw new Error(
            `Failed to fetch health records: ${response.statusText}`
          );
        }
      })
      .catch((err) => {
        console.error("Error:", err);
        throw err;
      });
  };

  useEffect(() => {
    const fetchAstronaut = async () => {
      setAstronaut(await getAstronautProfile(Number(id), { token: null }));
    };

    fetchMissions();
    fetchHealthRecords();
    fetchAstronaut();
  }, []);

  return (
    <div className="outer">
      <Header />
      <Navbar />
      <div className="button-bar">
        {localStorage.getItem("userRole") === "EXPERT" && (
          <button
            className="top-button"
            onClick={handleCreateHealthRecordClick}
          >
            Create Health Record
          </button>
        )}

        {localStorage.getItem("userRole") === "COMPANY" && (
          <button className="top-button" onClick={handleFireAstronautClick}>
            Fire Astronaut
          </button>
        )}
      </div>
      <div className="profile-container">
        <div className="profile-header">
          <div className="profile-image">
            <img
              src="astronaut-image.png"
              alt="Astronaut"
              style={{ width: "150px", height: "150px" }}
            />
          </div>
          <div className="profile-info">
            <h1>{astronaut?.name}</h1>
            <p>Country: {astronaut?.country}</p>
            <p>Date of Birth: {astronaut?.dateOfBirth.toString()}</p>
            <p>
              Status:{" "}
              {astronaut?.onDuty === true
                ? "On mission"
                : "Available for mission"}
            </p>
          </div>
        </div>
        <div className="profile-details">
          <div className="missions-section">
            <h2>Space Missions</h2>
            {spaceMissions.map((mission) => (
              <Link
                to={"/space-mission/" + mission.id}
                key={mission.id}
                className="mission-entry"
              >
                {mission.missionName}
              </Link>
            ))}
          </div>
          <div className="health-section">
            <h2>Health Records</h2>
            {healthRecords.map((record) => (
              <div className="health-record-container">
                <div key={record.id} className="health-record">
                  {record.date.toString()}
                </div>
                <button
                  className="health-record-details-button"
                  onClick={handleHealthRecordDetailsClick}
                >
                  Details
                </button>
                <div>
                  {healthRecordDetailsOpen && (
                    <HealthRecordDetails
                      healthRecordId={record.id}
                      onClose={handleHealthRecordDetailsClick}
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        <style>{`
                    .profile-container {
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        padding: 20px;
                        max-width: 800px;
                        margin: auto;
                    }
                    .profile-header {
                        display: flex;
                        justify-content: space-around;
                        width: 100%;
                        margin-bottom: 20px;
                    }
                    .profile-info {
                        margin-left: 20px;
                    }
                    .profile-details {
                        display: flex;
                        justify-content: space-between;
                        width: 100%;
                    }
                    .missions-section, .health-section {
                        flex: 1;
                        padding: 10px;
                        margin: 5px;
                        background: #f0f0f0;
                        border: 1px solid #ccc;
                    }
                    .mission-entry {
                        padding: 8px;
                        margin: 5px 0;
                        background: white;
                        border: 1px solid #ddd;
                        display: block;
                        text-decoration: none;
                        color: black;
                    }
                    .button-bar {
                        display: flex;
                        justify-content: center;
                        width: 100%;
                        margin-top: 10px;
                    }
                    .top-button {
                        padding: 8px 16px;
                        margin: 0 10px;
                        background-color: #007bff;
                        color: white;
                        border: none;
                        border-radius: 5px;
                        cursor: pointer;
                        width: fit-content;
                        align-self: flex-end;
                    }
                    .top-button:hover {
                        background-color: #0056b3;
                    }
                    .health-record-container {
                        display: flex;
                        flex-direction: row;
                        background: #ffffff;
                    }
                    .health-record-details-button {
                        width: 10vw;
                        height: fit-content;
                        background-color: #007bff;
                    }
                    .health-record {
                        padding: 8px;
                        margin: 5px 0;
                        background: white;
                        display: block;
                        text-decoration: none;
                        color: black;
                        width: 12vw;
                    }
                `}</style>
      </div>
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
    </div>
  );
}
