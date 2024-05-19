import { useParams } from "react-router-dom";
import Header from "../../components/Header";
import Navbar from "../../components/Navbar";
import "../../styles/Details.css";
import { useEffect, useState } from "react";
import {
  Astronaut,
  Company,
  Platform,
  SpaceMission,
} from "../../data-types/entities";
import SubmitBid from "../modals/SubmitBid";
import { getAstronautsByMissionId } from "../../calling/astronautCaller";
import { getCompanyProfile } from "../../calling/companyCaller";
import { getPlatformById } from "../../calling/platformCaller";

export default function SpaceMissionDetails() {
  const { id } = useParams();
  const [spaceMission, setSpaceMission] = useState<SpaceMission | null>(null);
  const [astronauts, setAstronauts] = useState<Astronaut[]>([]);
  const [creatorCompany, setCreatorCompany] = useState<Company | null>(null);
  const [performerCompany, setPerformerCompany] = useState<Company | null>(
    null
  );
  const [platform, setPlatform] = useState<Platform | null>(null);
  const [submitBidOpen, setSubmitBidOpen] = useState(false);

  const handleSubmitBidClick = () => {
    setSubmitBidOpen(!submitBidOpen);
  };

  const [missionImage, setMissionImage] = useState("");

  useEffect(() => {
    const sentUrl = "http://localhost:8080/spaceMission/" + id;

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
          throw new Error(
            `Failed to fetch space mission: ${response.statusText}`
          );
        }
      })
      .then(async (data) => {
        setSpaceMission(data);
        setAstronauts(await getAstronautsByMissionId(data.id));
        setCreatorCompany(
          await getCompanyProfile(data.creatorId, { token: null })
        );
        setPerformerCompany(
          await getCompanyProfile(data.performerId, { token: null })
        );
        setPlatform(await getPlatformById(data.platformId, { token: null }));
      })
      .catch((err) => {
        console.error("Error:", err);
        throw err;
      });
  }, [id]);

  const submitBidDisplayValidator = function(){
    let result = false;
    const userId = localStorage.getItem("userId");
    const performerId = performerCompany?.userId;
    const creatorId = creatorCompany?.userId;
    if(userId !== null && performerId !== null && creatorId !== null){
      const castedId = parseInt(userId);
      //ONLY DO NOT DISPLAY TO THE CURRENT PERFORMER (THE PERFORMER OWNS THE MISSION)
      result = localStorage.getItem("userRole") === "COMPANY" && (castedId !== performerId);
      //console.log("Debug SMD: submitBidDisplay inner if invoked");
    }
    //console.log("Debug SMD submitBidDisplayValidator yields result: " + result);
    return result;
  }

  return (
      <div className="outer">
        <Header />
        <Navbar />
        <div className="profile-container">
          <div className="profile-header">
            <div className="profile-image">
              <img
                  src={missionImage || 'default_image_placeholder.png'}
                  alt={spaceMission?.missionName || 'Mission Image'}
                  style={{ width: "200px", height: "150px" }}
              />
            </div>
            <div className="profile-info">
              <h1>{spaceMission?.missionName}</h1>
              <p>Creator Company: {creatorCompany?.name}</p>
              <p>Performer Company: {performerCompany?.name || "N/A"}</p>
              {submitBidDisplayValidator() && (
                  <button onClick={handleSubmitBidClick} style={{marginTop: '10px'}}>
                    Submit Bid
                  </button>
              )}
            </div>
          </div>
          <div className="profile-details">
            <div className="missions-section">
              <h2>Astronauts</h2>
              <div className="scroll-container">
                {astronauts.map((astronaut) => (
                    <div key={astronaut.userId} className="profile-list-item">
                      <h3>{astronaut.name}</h3>
                      <p>Country: {astronaut.country}</p>
                      <p>Date of Birth: {new Date(astronaut.dateOfBirth).toLocaleDateString()}</p>
                    </div>
                ))}
              </div>
            </div>
            <div className="health-section">
              <h2>Details</h2>
              <p>{spaceMission?.objective}</p>
              <p>Platform: {platform?.platformName || "N/A"}</p>
              <p>Budget: {spaceMission?.budget}</p>
            </div>
          </div>
          {submitBidOpen && (
              <SubmitBid
                  fromCompanyId={Number(localStorage.getItem("userId"))}
                  toCompanyId={spaceMission?.creatorId}
                  missionId={Number(id)}
                  onClose={handleSubmitBidClick}
              />
          )}
        </div>
        <style>{`
      .outer {
        display: flex;
        flex-direction: column;
        align-items: center;
        min-height: 100vh;
      }
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
      .profile-image img {
        width: auto;
        height: 150px;
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
        padding: 8px;
        margin: 5px;
        background: #f0f0f0;
        border: 1px solid #ccc;
        overflow-y: auto;
        width: 40vw;
      }
      .scroll-container {
        max-height: 300px;
        overflow-y: auto;
      }
      .profile-list-item {
        margin-bottom: 10px;
        padding: 10px;
        border: 1px solid #ddd;
      }
    `}</style>
      </div>
  );

}
