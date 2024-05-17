import { useEffect, useState } from "react";
import Header from "../../components/Header";
import Navbar from "../../components/Navbar";
import "../../styles/App.css";
import { Company } from "../../data-types/entities";
import { getCompanies } from "../../calling/companyCaller";
import { Link } from "react-router-dom";

export default function Companies() {
  const [companies, setCompanies] = useState<Company[]>([]);

  useEffect(() => {
    getCompanies({ token: "" }).then((data) => {
      setCompanies(data);
    });
  }, []);

  return (
    <div className="outer">
      <Header />
      <Navbar />
      <div className="smm-list-container">
        {companies.map((company: Company) => (
          <Link
            to={"/company/" + company.userId}
            className="smm-list-item"
            key={company.userId}
          >
            <div className="smm-list-image-box">
              <img src={`data:image/jpeg;base64,${company.logo}`} />
            </div>
            <div className="smm-list-information-box">
              <p>Name: {company.name}</p>
              <p>Country: {company.country}</p>
              <p>Budget: {company.money}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
