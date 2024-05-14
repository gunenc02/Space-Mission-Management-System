import { useState, useEffect } from "react";
import {
  getCompanyProfile,
  getPerformedSpaceMissionsOfCompany,
} from "../../calling/companyCaller";
import { Company, SpaceMissionForListing } from "../../data-types/entities";
import { useParams } from "react-router-dom";
import RegisterExpert from "../modals/RegisterExpert";

export default function CompanyProfile() {
  const { id } = useParams();
  const [companyInfo, setCompanyInfo] = useState<Company | null>(null);
  const [spaceMissions, setSpaceMissions] = useState<
    SpaceMissionForListing[] | null
  >(null);
  const [error, setError] = useState("");
  const [registerExpertOpen, setRegisterExpertOpen] = useState<boolean>(false);

  const handleRegisterExpertClick = () => {
    setRegisterExpertOpen(!registerExpertOpen);
  };

  useEffect(() => {
    if (!id) {
      setError("Company ID is missing");
      return;
    }

    const numericId = parseInt(id, 10);
    if (isNaN(numericId)) {
      setError("Invalid Company ID");
      return;
    }

    const token = ""; // Assuming token management
    const user = { token };

    getCompanyProfile(numericId, user)
      .then((data) => {
        setCompanyInfo(data);
        return getPerformedSpaceMissionsOfCompany(numericId, user);
      })
      .then((missions) => {
        const missionsWithDates = missions.map((mission) => ({
          ...mission,
          startDate: new Date(mission.startDate),
          endDate: new Date(mission.endDate),
        }));
        setSpaceMissions(missionsWithDates);
        setError("");
      })
      .catch((err) => {
        setError(err.message);
        setCompanyInfo(null);
        setSpaceMissions(null);
        console.error("API error:", err);
      });
  }, [id]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!companyInfo) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <button className="top-button" onClick={handleRegisterExpertClick}>
        Register Expert
      </button>
      <h1>{companyInfo.name}</h1>
      <p>Email: {companyInfo.userMail}</p>
      <p>Country: {companyInfo.country}</p>
      <img
        src={companyInfo.logo}
        alt={`${companyInfo.name} logo`}
        style={{ width: "100px" }}
      />
      <p>Budget: ${companyInfo.money.toLocaleString()}</p>
      {spaceMissions ? (
        <div>
          <h2>Space Missions</h2>
          <ul>
            {spaceMissions.map((mission) => (
              <li key={mission.id}>
                <h3>{mission.missionName}</h3>
                <p>Created by: {mission.creatorCompanyName}</p>
                <p>Status: {mission.status}</p>
                <p>Start Date: {mission.startDate.toLocaleDateString()}</p>
                <p>End Date: {mission.endDate.toLocaleDateString()}</p>
                <img
                  src={mission.image}
                  alt={mission.missionName}
                  style={{ width: "100px" }}
                />
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div>Loading space missions...</div>
      )}

      <div>
        {registerExpertOpen && (
          <RegisterExpert
            companyId={Number(id)}
            onClose={handleRegisterExpertClick}
          />
        )}
      </div>
    </div>
  );
}
