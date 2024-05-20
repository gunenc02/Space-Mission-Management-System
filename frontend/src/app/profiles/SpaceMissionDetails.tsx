import { Link, useParams } from "react-router-dom";
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
  const [approvingAgencies, setApprovingAgencies] = useState<Company[]>([]);
  const [hasJoinRequest, setHasJoinRequest] = useState<boolean>(false);

  const handleSubmitBidClick = () => {
    setSubmitBidOpen(!submitBidOpen);
  };

  const markPerformedHandler = function () {
    const missionId = spaceMission?.id;
    const performerId = performerCompany?.userId;
    const sentUrl = `http://localhost:8080/company/${performerId}/markPerformed/${id}`;

    fetch(sentUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.status === 200) {
          console.log("Marked mission as performed");
        } else {
          throw new Error(
            `Failed to mark space mission as performed: ${response.statusText}`
          );
        }
      })
      .catch((err) => {
        console.error("Error:", err);
        throw err;
      });
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
      })
      .catch((err) => {
        console.error("Error:", err);
        throw err;
      });
  }, [id]);

  const sendJoinRequestHandler = function () {
    const userId = localStorage.getItem("userId");
    const url =
      "http://localhost:8080/astronaut/" +
      userId +
      "/requestJoin/" +
      spaceMission?.id;

    return fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.status === 200) {
          console.log(" ");
          alert("Join request sent successfully");
          window.location.reload();
        } else {
          throw new Error(
            `Failed to send join request: ${response.statusText}`
          );
        }
      })
      .catch((err) => {
        console.error("Error:", err);
        throw err;
      });
  };

  const cancelJoinRequestHandler = function () {
    const userId = localStorage.getItem("userId");
    const url =
      "http://localhost:8080/astronaut/" + userId + "/deleteJoinRequest/" + id;
    fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          alert("Cancel request sent successfully");
          window.location.reload();
        } else {
          throw new Error(
            `Failed to cancel join request: ${response.statusText}`
          );
        }
      })
      .catch((error) => {
        console.error("There was a problem with the fetch (delete operation):", error);
      });
  };

  // Fetch approving agencies
  useEffect(() => {
    const sentUrl =
      "http://localhost:8080/agency/getAgenciesApprovedMission/" + id;

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
        setApprovingAgencies(data);
        console.log(data);
      })
      .catch((err) => {
        console.error("Error:", err);
        throw err;
      });
  }, [id]);

  const submitBidDisplayValidator = function () {
    let result = false;
    const userId = localStorage.getItem("userId");
    const performerId = performerCompany?.userId;
    const creatorId = creatorCompany?.userId;
    if (userId !== null && performerId !== null && creatorId !== null) {
      const castedId = parseInt(userId);
      const isPerformed = spaceMission?.performStatus === "performed";
      result =
        localStorage.getItem("userRole") === "COMPANY" &&
        castedId !== performerId &&
        !isPerformed;
    }
    return result;
  };

  const markPerformedDisplayValidator = function () {
    let result = false;
    const userId = localStorage.getItem("userId");
    const performerId = performerCompany?.userId;
    if (userId !== null && performerId !== null) {
      const castedId = parseInt(userId);
      result =
        castedId === performerId && spaceMission?.performStatus === "pending";
    }
    return result;
  };

  // Check if user has already sent join request
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const sentUrl = `http://localhost:8080/astronaut/${userId}/hasJoinRequest/${id}`;

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
            `Failed to fetch hasJoinRequest astronaut: ${response.statusText}`
          );
        }
      })
      .then((data) => {
        setHasJoinRequest(data === true);
      })
      .catch((err) => {
        console.error("Error:", err);
        throw err;
      });
  }, [id]);

  const approveMissionHandler = function () {
    const userId = localStorage.getItem("userId");
    const sentUrl =
      "http://localhost:8080/agency/approveMission/" + userId + "/" + id;

    fetch(sentUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.status === 200) {
          alert("Mission approved successfully");
          window.location.reload();
          return response.json();
        } else {
          throw new Error(
            `Failed to approve mission: ${response.statusText}`
          );
        }
      })
      .then((data) => {
        console.log("Mission approved:", data);
      })
      .catch((err) => {
        console.error("Error:", err);
        throw err;
      });
  };

  return (
    <div className="outer">
      <Header />
      <Navbar />
      <div className="approving-agencies-container">
        <p className="approving-agencies-title">Approving Agencies</p>
        <div className="approving-agencies-row">
          {approvingAgencies.map((agency) => (
            <div key={agency.userId} className="agency-entry">
              {agency.name}
              <img
                className="approving-agency-logo"
                src={`data:image/jpeg;base64,${agency?.logo}`}
                alt={agency.name}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="profile-container">
        {submitBidDisplayValidator() && (
          <button onClick={handleSubmitBidClick} className="button">
            Submit Bid
          </button>
        )}
        {markPerformedDisplayValidator() && (
          <button onClick={markPerformedHandler} className="button">
            Mark as performed
          </button>
        )}
        {localStorage.getItem("userRole") === "ASTRONAUT" &&
          !hasJoinRequest && (
            <button className="button" onClick={sendJoinRequestHandler}>
              Send Join Request
            </button>
          )}
        {localStorage.getItem("userRole") === "ASTRONAUT" &&
          hasJoinRequest && (
            <button
              className="cancel-button"
              onClick={cancelJoinRequestHandler}
            >
              Cancel Join Request
            </button>
          )}
        {localStorage.getItem("userRole") === "AGENCY" && (
          <button onClick={approveMissionHandler} style={{
            padding: '8px 16px',
            width: '200px',
            background: '#4CAF50',
            color: 'white',
            borderRadius: '4px',
            marginLeft: "auto",
            marginRight: '300px'
          }} className="button">
            Approve Mission
          </button>
        )}
        <div className="profile-header">
          <div className="profile-image">
            <img
              src={`data:image/jpeg;base64,${spaceMission?.image}`}
              alt={spaceMission?.missionName || "Mission Image"}
              style={{ width: "200px", height: "150px" }}
            />
          </div>
          <div className="profile-info">
            <h1>{spaceMission?.missionName}</h1>
            <p>Creator Company: {creatorCompany?.name}</p>
            <p>Performer Company: {performerCompany?.name || "N/A"}</p>
          </div>
        </div>
        <div className="profile-details">
          <div className="missions-section">
            <h2>Astronauts</h2>
            <div className="scroll-container">
              {astronauts.map((astronaut) => (
                <Link
                  to={`/astronaut/${astronaut.userId}`}
                  key={astronaut.userId}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <div className="profile-list-item">
                    <h3>{astronaut.name}</h3>
                    <p>Country: {astronaut.country}</p>
                    <p>
                      Date of Birth:{" "}
                      {new Date(astronaut.dateOfBirth).toLocaleDateString()}
                    </p>
                  </div>
                </Link>
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
        margin-top: -20px;
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
      .cancel-button {
        padding: 8px 16px;
        width: 200px;
        margin: 20px;
        margin-left: auto;
        background-color: red;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
      }
      .button {
        padding: 8px 16px;
        width: 200px;
        margin: 20px;
        margin-left: auto;
        background-color: #4CAF50;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
      }
    `}</style>
    </div>
  );
}
