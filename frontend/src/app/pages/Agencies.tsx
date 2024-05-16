import { useEffect, useState } from "react";
import Header from "../../components/Header";
import Navbar from "../../components/Navbar";
import { Agency } from "../../data-types/entities";
import { getAgencies } from "../../calling/agencyCaller";
import { Link } from "react-router-dom";

export default function Agencies() {
  const [agencies, setAgencies] = useState<Agency[]>([]);

  useEffect(() => {
    getAgencies({ token: "" }).then((data) => {
      setAgencies(data);
    });
  }, []);

  return (
    <div className="outer">
      <Header />
      <Navbar />
      <div className="smm-list-container">
        {agencies.map((agency: Agency) => (
          <Link
            to={"/agency/" + agency.id}
            className="smm-list-item"
            key={agency.id}
          >
            <div className="smm-list-image-box">
              <img src={agency.logo} />
            </div>
            <div className="smm-list-information-box">
              <p>Name: {agency.name}</p>
              <p>{agency.isApproved ? "Approved" : "Not approved"}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
