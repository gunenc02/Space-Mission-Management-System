import { useEffect, useState } from "react";
import Header from "../../components/Header";
import Navbar from "../../components/Navbar";
import { Platform } from "../../data-types/entities";
import "../../styles/Details.css";
import { getPlatformById } from "../../calling/platformCaller";
import { useParams } from "react-router-dom";

export default function PlatformDetails() {
  const [platform, setPlatform] = useState<Platform | null>(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      setPlatform(await getPlatformById(Number(id), { token: null }));
    };

    fetchData();
  }, []);

  return (
      <div className="outer">
        <Header />
        <Navbar />
        <div className="profile-container">
          <div className="profile-header">
            <div className="profile-image">
              <img
                  src={`data:image/jpeg;base64,${platform?.image}`}
                  alt={`${platform?.platformName} Image`}
                  style={{ width: "150px", height: "150px" }}
              />
            </div>
            <div className="profile-info">
              <h1>{platform?.platformName}</h1>
            </div>
          </div>

          <div className="profile-details">
            <div className="details-section scroll-container">
              <div className="details-info-box">
                <div className="details-info-item">Platform Name: {platform?.platformName}</div>
                <div className="details-info-item">Production Year: {platform?.productionYear}</div>
                <div className="details-info-item">Cost per Launch: {platform?.costPerLaunch}</div>
              </div>
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
      .details-section {
        flex: 1;
        padding: 10px;
        margin: 5px;
        background: #f0f0f0;
        border: 1px solid #ccc;
        overflow-y: auto;
        max-height: 400px;
      }
      .details-info-box {
        margin-bottom: 10px;
        background: white;
        padding: 10px;
        border: 1px solid #ddd;
      }
      .details-info-item {
        padding: 5px 0;
      }
      .scroll-container {
        overflow-y: auto;
        max-height: 300px;
      }
    `}</style>
      </div>
  );

}
