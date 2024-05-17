import { useEffect, useState } from "react";
import Header from "../../components/Header";
import Navbar from "../../components/Navbar";
import { Platform } from "../../data-types/entities";
import "../../styles/Details.css";
import { getPlatformById } from "../../calling/platformCaller";

export default function PlatformDetails() {
  const [platform, setPlatform] = useState<Platform | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setPlatform(await getPlatformById(1, { token: null }));
    };

    fetchData();
  }, []);

  return (
    <div className="outer">
      <Header />
      <Navbar />
      <div className="details-outer">
        <div className="details-top-div">
          <div className="details-title">{platform?.platformName}</div>
        </div>
      </div>
      <div className="details-column-container">
        <div className="details-left-column">
          <div className="details-info-box">
            <div className="details-info-item">
              {" "}
              Platform Name: {platform?.platformName}
            </div>
            <div className="details-info-item">
              {" "}
              Production Year: {platform?.productionYear}{" "}
            </div>
            <div className="details-info-item">
              {" "}
              Cost per Launch: {platform?.costPerLaunch}
            </div>
            <div className="details-info-item"></div>
          </div>
        </div>
        <div className="details-right-column">
          <img
            className="details-image"
            src={`data:image/jpeg;base64,${platform?.image}`}
            alt="Platform Image"
          />
        </div>
      </div>
    </div>
  );
}
