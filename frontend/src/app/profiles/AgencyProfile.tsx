import { useEffect, useState } from "react";
import Header from "../../components/Header.tsx";
import Navbar from "../../components/Navbar.tsx";
import { Agency } from "../../data-types/entities.tsx";
import { getAgencies } from "../../calling/agencyCaller.tsx";
import { Link } from "react-router-dom";
import ApproveAgency from "../modals/ApproveAgency.tsx";
import { useParams } from "next/navigation";

export default function AgencyProfile() {
  const [agencies, setAgencies] = useState<Agency[]>([]);
  const [approveAgencyOpen, setApproveAgencyOpen] = useState<boolean>(false);

  const handleApproveAgencyClick = () => {
    setApproveAgencyOpen(!approveAgencyOpen);
  };

  const missions = [
    { id: 1, name: "YAKBE-2024, SpaceY" },
    { id: 2, name: "R-25, ROKETSAN" },
  ];

  const astronauts = [
    { id: 1, name: "John Doe" },
    { id: 2, name: "Ahmet Reşat Demir" },
    { id: 3, name: "Bahadır Günenc" },
  ];

  useEffect(() => {
    getAgencies({ token: "" }).then((data) => {
      setAgencies(data);
    });
  }, []);

  return (
    <div className="outer">
      <Header />
      <Navbar />

      <div className="agency-profile-container">
        {localStorage.getItem("userRole") == "ADMIN" && (
          <button className="top-button" onClick={handleApproveAgencyClick}>
            Approve Agency
          </button>
        )}

        <div className="header">
          <div className="logo-container">
            <img src="photo.png" alt="NASA Logo" style={{ height: "100px" }} />
          </div>
          <div className="information-box">
            <h1>NASA</h1>
            <p>Country: USA</p>
            <p>Email: info@nasa.com</p>
          </div>
        </div>
        <div className="content">
          <div className="missions">
            <h2>Approved Space Missions</h2>
            {missions.map((mission) => (
              <Link to="/" key={mission.id} className="mission-box">
                {mission.name}
              </Link>
            ))}
          </div>
          <div className="astronauts">
            <h2>Approved Astronauts</h2>
            {astronauts.map((astronaut) => (
              <Link to="/" key={astronaut.id} className="astronaut-box">
                {astronaut.name}
              </Link>
            ))}
          </div>
        </div>
        <style>{`
                  .agency-profile-container {
                      display: flex;
                      flex-direction: column;
                      align-items: center;
                      padding: 20px;
                      margin: auto;
                      max-width: 960px;
                  }

                  .header {
                      display: flex;
                      justify-content: space-between;
                      width: 100%;
                      margin-bottom: 20px;
                  }

                  .logo-container img {
                      width: auto;
                      height: 80px;
                  }

                  .information-box {
                      text-align: right;
                  }

                  .content {
                      display: flex;
                      justify-content: space-around;
                      width: 100%;
                  }

                  .missions, .astronauts {
                      width: 300px;
                      padding: 10px;
                      margin: 5px 0;
                      display: flex;
                      flex-direction: column;
                      align-items: center;
                  }

                  .mission-box, .astronaut-box {
                      width: 280px; 
                      padding: 10px;
                      margin: 5px 0;
                      background: #f0f0f0;
                      color: black;
                      text-decoration: none;
                      border: 1px solid #ccc;
                      text-align: center;
                  }

                  .mission-box:hover, .astronaut-box:hover {
                      background: #e0e0e0;
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
              `}</style>
      </div>
      <div>
        {approveAgencyOpen && (
          <ApproveAgency
            agencyId={Number(1)}
            onClose={handleApproveAgencyClick}
          />
        )}
      </div>
    </div>
  );
}

/*
<div className="list-container">

   {agencies.map((agency: Agency) => (
       <div className="list-item" key={agency.id}>
           <div className="list-image-box">
               <img src={agency.logo} />
           </div>
           <div className="list-information-box">
               <p>Name: {agency.name}</p>
               <p>{agency.isApproved ? "Approved" : "Not approved"}</p>
           </div>
       </div>

   ))}
</div>
*/
