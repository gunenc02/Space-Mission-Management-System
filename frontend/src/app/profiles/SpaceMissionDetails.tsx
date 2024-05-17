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
  const [performerCompany, setPerformerCompany] = useState<Company | null>(null);
  const [platform, setPlatform] = useState<Platform | null>(null);
  const [submitBidOpen, setSubmitBidOpen] = useState(false);
  const [missionImage, setMissionImage] = useState('');

  const handleSubmitBidClick = () => {
    setSubmitBidOpen(!submitBidOpen);
  };


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

        //update the spaceMission image
        if(spaceMission !== null){
          const blob = new Blob([spaceMission.image])
          const imgURL = URL.createObjectURL(blob);
          setMissionImage(imgURL);
        }
      })
      .catch((err) => {
        console.error("Error:", err);
        throw err;
      });
  }, [id]);

  return (
      <div className="outer">
        <Header/>
        <Navbar/>


        <div className="profile-container">
          <div className="button-bar">
            {localStorage.getItem("userRole") === "COMPANY" && (
                <button className="details-button" onClick={handleSubmitBidClick}>
                  Submit Bid
                </button>
            )}
          </div>

          <div className="profile-header">
            <div className="profile-image">
              <img
                  src={missionImage}
                  alt="Mission Image"
                  style={{width: "150px"}}
              />
            </div>
            <div className="profile-info">
              <h1>{spaceMission?.missionName}</h1>
              <p>Performer Company: {performerCompany?.name || "N/A"}</p>
              <p>Creator Company: {creatorCompany?.name}</p>
              <p>Budget: {spaceMission?.budget}</p>
              <p>Platform: {platform?.platformName || "N/A"}</p>

            </div>
          </div>

          <div className="profile-details">
            <div className="astronauts-section scroll-container">
              <h2>Objective</h2>
              <p>{spaceMission?.objective}</p>

            </div>

            <div className="astronauts-section scroll-container">
              <h2>Approved Astronauts</h2>
              {astronauts ? (
                  <ul>
                    {astronauts.map((astronaut) => (
                        <li key={astronaut.userId} className="profile-list-item">
                          <img
                              src={astronaut.image}
                              alt={astronaut.name}
                              style={{width: "100px", height: "100px"}}
                          />
                          <h3>{astronaut.name}</h3>
                          <p>
                            Date of Birth:{" "}
                            {new Date(astronaut.dateOfBirth).toLocaleDateString()}
                          </p>
                          <p>Country: {astronaut.country}</p>
                          <p>On Duty: {astronaut.onDuty ? "Yes" : "No"}</p>
                          <p>Salary: ${astronaut.salary.toLocaleString()}</p>
                        </li>
                    ))}
                  </ul>
              ) : (
                  <div>Loading astronauts...</div>
              )}
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
      .astronauts-section {
        flex: 1 1 50%;
        padding: 10px;
        margin: 5px;
        background: #f0f0f0;
        border: 1px solid #ccc;
        overflow-y: auto;
        max-height: 400px;
      }
      ul {
        list-style: none;
        padding: 0;
      }
      .profile-list-item {
        margin-bottom: 10px;
        background: white;
        padding: 10px;
        border: 1
        border: 1px solid #ddd;
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
      .scroll-container {
        overflow-y: auto;  // Ensures vertical scrollability
        max-height: 300px; // Restricting height to enforce scrolling
      }
   `}</style>
      </div>
  );

}
