import { useEffect, useState } from "react";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import { Platform } from "../data-types/props";
import { getPlatforms } from "../calling/platformCaller";

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
      <div className="list-container">
        {platforms.map((platform: Platform) => (
          <div className="list-item" key={platform.id}>
            <div className="list-image-box">
              <img src={platform.image} />
            </div>
            <div className="list-information-box">
              <p>Name: {platform.platformName}</p>
              <p>Production Year: {platform.productionYear}</p>
              <p>Cost per Launch: {platform.costPerLaunch}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
