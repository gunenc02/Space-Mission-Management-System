import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  getCompanyProfile,
  getPerformedSpaceMissionsOfCompany,
} from "../../calling/companyCaller";
import { Company, SpaceMissionForListing } from "../../data-types/entities";
import RegisterExpert from "../modals/RegisterExpert";
import Header from "../../components/Header.tsx";
import Navbar from "../../components/Navbar.tsx";

export default function CompanyProfile() {
  const { id } = useParams<{ id?: string }>();
  const [companyInfo, setCompanyInfo] = useState<Company | null>(null);
  const [spaceMissions, setSpaceMissions] = useState<SpaceMissionForListing[] | null>(null);
  const [error, setError] = useState("");
  const [registerExpertOpen, setRegisterExpertOpen] = useState<boolean>(false);

  useEffect(() => {
    if (!id) {
      setError("Company ID is missing");
      return;
    }

    const numericCompanyId = parseInt(id, 10);
    if (isNaN(numericCompanyId)) {
      setError("Invalid Company ID");
      return;
    }

    const token = ""; // Assuming token management
    const user = { token };

    getCompanyProfile(numericCompanyId, user)
        .then((data) => {
          setCompanyInfo(data);
          return getPerformedSpaceMissionsOfCompany(numericCompanyId, user);
        })
        .then((missions) => {
          const parsedMissions = missions.map(mission => ({
            ...mission,
            startDate: new Date(mission.startDate),
            endDate: new Date(mission.endDate)
          }));
          setSpaceMissions(parsedMissions);
          setError("");
        })
        .catch((err) => {
          setError(err.message);
          setCompanyInfo(null);
          setSpaceMissions(null);
          console.error("API error:", err);
        });
  }, [id]);

  const handleRegisterExpertClick = () => {
    setRegisterExpertOpen(!registerExpertOpen);
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!companyInfo) {
    return <div>Loading...</div>;
  }

  return (
      <div className="outer">
        <Header/>
        <Navbar/>
        <div className="button-bar">
          <button className="top-button" onClick={handleRegisterExpertClick}>
            Register Expert
          </button>
        </div>
        <div className="profile-container">
          <div className="profile-header">
            <div className="profile-image">
              <img src={companyInfo.logo} alt={`${companyInfo.name} logo`} style={{ width: "150px" }} />
            </div>
            <div className="profile-info">
              <h1>{companyInfo.name}</h1>
              <p>Email: {companyInfo.userMail}</p>
              <p>Country: {companyInfo.country}</p>
              <p>Budget: ${companyInfo.money.toLocaleString()}</p>
            </div>
          </div>
          <div className="profile-details">
            <div className="missions-section">
              <h2>Space Missions</h2>
              {spaceMissions ? (
                  <ul>
                    {spaceMissions.map((mission) => (
                        <li key={mission.id}>
                          <h3>{mission.missionName}</h3>
                          <p>Created by: {mission.companyName}</p>
                          <p>Status: {mission.status}</p>
                          <p>Start Date: {mission.startDate.toLocaleDateString()}</p>
                          <p>End Date: {mission.endDate.toLocaleDateString()}</p>
                          <img src={mission.image} alt={mission.missionName} style={{ width: "100px" }} />
                        </li>
                    ))}
                  </ul>
              ) : (
                  <div>Loading space missions...</div>
              )}
            </div>
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
        <div>
          {registerExpertOpen && (
              <RegisterExpert
                  companyId={parseInt(id, 10)}
                  onClose={handleRegisterExpertClick}
              />
          )}
        </div>
      </div>
  );
}
