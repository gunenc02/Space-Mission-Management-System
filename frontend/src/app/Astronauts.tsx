import { useEffect, useState } from "react";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import { Astronaut } from "../data-types/props";
import { getAstronauts } from "../calling/astronautCaller";

export default function Astronauts() {
  const [astronauts, setAstronauts] = useState<Astronaut[]>([]);

  // Fetch astronauts from the server
  useEffect(() => {
    getAstronauts({ token: "" }).then((data) => {
      setAstronauts(data);
    });
  }, []);

  return (
    <div className="outer">
      <Header />
      <Navbar />
      <div className="astronauts-container">
        {astronauts.map((astronaut: Astronaut) => (
          <div className="astronauts-item" key={astronaut.id}>
            <div className="astronauts-image-box">
              <img src={astronaut.image} />
            </div>
            <div className="astronauts-information-box">
              <p>Name: {astronaut.name}</p>
              <p>Country: {astronaut.country}</p>
              <p>
                Date of Birth:{" "}
                {new Date(astronaut.dateOfBirth).toLocaleDateString()}
              </p>
              <p>
                {astronaut.onDuty ? "Is on mission" : "Available for mission"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
