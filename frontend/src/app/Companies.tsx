import { useEffect, useState } from "react";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import "../styles/App.css";
import { Company } from "../data-types/props";
import { getCompanies } from "../calling/companyCaller";

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
      <div className="list-container">
        {companies.map((company: Company) => (
          <div className="list-item" key={company.id}>
            <div className="list-image-box">
              <img src={company.logo} />
            </div>
            <div className="list-information-box">
              <p>Name: {company.name}</p>
              <p>Country: {company.country}</p>
              <p>Budget: {company.budget}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
