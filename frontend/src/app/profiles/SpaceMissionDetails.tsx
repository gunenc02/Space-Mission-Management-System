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
      })
      .catch((err) => {
        console.error("Error:", err);
        throw err;
      });
  }, []);

  return (
    <div className="outer">
      <Header />
      <Navbar />
      <div className="details-outer">
        <div className="details-top-div">
          <div className="details-title">{spaceMission?.missionName}</div>
          <button className="details-button" onClick={handleSubmitBidClick}>
            Submit Bid
          </button>
        </div>
      </div>
      <div className="details-column-container">
        <div className="details-left-column">
          <div className="details-long-text">{spaceMission?.objective}</div>
          <div className="details-scroll-list">
            Astronauts
            {astronauts.map((astronaut) => (
              <div key={astronaut.id} className="details-list-item">
                Name: {astronaut.name}
                <br />
                Country: {astronaut.country}
                <br />
                Date of Birth: {astronaut.dateOfBirth.toString()}
              </div>
            ))}
          </div>
        </div>
        <div className="details-right-column">
          <img
            className="details-image"
            src={spaceMission?.image}
            alt="Mission Image"
          />
          <div className="details-info-box">
            <div className="details-info-item"> Creator Company:</div>
            <div className="details-info-item"> Performer Company:</div>
            <div className="details-info-item"> Platform:</div>
            <div className="details-info-item">
              Budget: {spaceMission?.budget}
            </div>
          </div>
        </div>
      </div>
      {submitBidOpen && (
        <SubmitBid
          fromCompanyId={Number(localStorage.getItem("userId"))}
          toCompanyId={spaceMission?.creatorId}
          onClose={handleSubmitBidClick}
        />
      )}
    </div>
  );
}
