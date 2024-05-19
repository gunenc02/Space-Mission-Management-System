import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import {
  getCompanyProfile,
  getPerformedSpaceMissionsOfCompany,
} from "../../calling/companyCaller";
import {
  Company,
  Expert,
  SpaceMissionForListing,
} from "../../data-types/entities";
import RegisterExpert from "../modals/RegisterExpert";
import Header from "../../components/Header";
import Navbar from "../../components/Navbar";

export default function CompanyProfile() {
  const { id } = useParams<{ id?: string }>();
  const [companyInfo, setCompanyInfo] = useState<Company | null>(null);
  const [spaceMissions, setSpaceMissions] = useState<
    SpaceMissionForListing[] | null
  >(null);
  const [experts, setExperts] = useState<Expert[]>([]);
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
        const parsedMissions = missions.map((mission) => ({
          ...mission,
          startDate: new Date(mission.startDate),
          endDate: new Date(mission.endDate),
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

  useEffect(() => {
    const sentUrl = "http://localhost:8080/expert/getByCompany/" + id;
    fetch(sentUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(`Failed to fetch astronauts: ${response.statusText}`);
        }
      })
      .then((data) => {
        console.log(data);
        setExperts(data);
      })
      .catch((err) => {
        console.error("Error:", err);
        throw err;
      });
  }, [id]); // Ensure dependency array includes `id` if `id` is used within this effect

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
      <Header />
      <Navbar />
      <div className="profile-container">
        <div className="profile-header">
          <div className="profile-image">
            <img
              src={`data:image/jpeg;base64,${companyInfo?.logo}`}
              alt={`${companyInfo.name} logo`}
              style={{ width: "150px" }}
            />
          </div>
          <div className="profile-info">
            <h1>{companyInfo.name}</h1>
            <p>Email: {companyInfo.userMail}</p>
            <p>Country: {companyInfo.country}</p>
            <p>Budget: ${companyInfo.money.toLocaleString()}</p>
          </div>
        </div>
        <div className="profile-details">
          <div className="missions-section scroll-container">
            <div className="subtitle">Space Missions</div>
            {spaceMissions ? (
              <ul>
                {spaceMissions.map((mission) => (
                  <Link
                    to={"/space-mission/" + mission.id}
                    key={mission.id}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <div className="mission-list-item">
                      <h2>Mission Name: {mission.missionName}</h2>
                      <p>Created by: {mission.companyName}</p>
                      <p>Status: {mission.status}</p>
                      <p>
                        Start Date: {mission.startDate.toLocaleDateString()}
                      </p>
                      <p>End Date: {mission.endDate.toLocaleDateString()}</p>
                      <img
                        src={`data:image/jpeg;base64,${mission.image}`}
                        alt={mission.missionName}
                        style={{ width: "100px" }}
                      />
                    </div>
                  </Link>
                ))}
              </ul>
            ) : (
              <div>Loading space missions...</div>
            )}
          </div>
          <div className="experts-section scroll-container">
            <div className="subtitle">Experts</div>
            {experts.map((expert) => (
              <Link
                to={"/expert/" + expert.userId}
                key={expert.userId}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <div className="mission-list-item">
                  <h2>Expert Name: {expert.name}</h2>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <style>{`
      .outer {
        display: flex;
        flex-direction: column;
        align-items: center;
        min-height: 100vh;
      }
      .profile-container {
        width: 100%;
        max-width: 800px;
        padding: 20px;
        margin: auto;
      }
      .profile-header {
        display: flex;
        justify-content: space-between;
        margin-bottom: 20px;
      }
      .profile-info {
        margin-left: 20px;
      }
      .profile-details {
        display: flex;
        width: 100%;
        justify-content: space-between;
      }
      .missions-section, .experts-section {
        flex: 1 1 50%;
        padding: 10px;
        margin: 5px;
        background: #f0f0f0;
        border: 1px solid #ccc;
        overflow-y: auto;
        max-height: 400px;
      }
      .scroll-container {
        overflow-y: auto;
        max-height: 300px;
      }
      .mission-list-item, .expert-list-item {
        margin-bottom: 20px;
        background-color: #ccc;
        padding: 10px;
        border-radius: 5px;
      }
      .subtitle {
        font-size: 1.8rem;
        margin-bottom: 10px;
      }
      .top-button:hover {
        background-color: #0056b3;
      }
    `}</style>
      {registerExpertOpen && (
        <RegisterExpert
          companyId={parseInt(id, 10)}
          onClose={handleRegisterExpertClick}
        />
      )}
    </div>
  );
}
