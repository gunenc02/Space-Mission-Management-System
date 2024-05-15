import { useEffect, useState } from "react";
import Header from "../../components/Header";
import Navbar from "../../components/Navbar";
import { Platform } from "../../data-types/entities";
import { getPlatforms } from "../../calling/platformCaller";
import { Link } from "react-router-dom";

export default function Platforms() {
  const [platforms, setPlatforms] = useState<Platform[]>([]);

  useEffect(() => {
    getPlatforms({ token: "" }).then((data) => {
      setPlatforms(data);
      console.log(data);
    });
  }, []);

  return (
    <div className="outer">
      <Header />
      <Navbar />
      <div className="smm-list-container">
        {platforms.map((platform: Platform) => (
          <Link
            to={"/platform/" + platform.id}
            className="smm-list-item"
            key={platform.id}
          >
            <div className="smm-list-image-box">
              <img src={platform.image} />
            </div>
            <div className="smm-list-information-box">
              <p>Name: {platform.platformName}</p>
              <p>Production Year: {platform.productionYear}</p>
              <p>Cost per Launch: {platform.costPerLaunch}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
