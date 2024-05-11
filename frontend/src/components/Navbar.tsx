import { Link } from "react-router-dom";
import "../styles/Navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar-outer">
      <ul className="list">
        <li className="navbar-list-item">
          <Link className="link" to="/space-missions">
            Space Missions
          </Link>
        </li>
        <li className="navbar-list-item">
          <Link className="link" to="/astronauts">
            Astronauts
          </Link>
        </li>
        <li className="navbar-list-item">
          <Link className="link" to="/companies">
            Companies
          </Link>
        </li>
        <li className="navbar-list-item">
          <Link className="link" to="/agencies">
            Agencies
          </Link>
        </li>
        <li className="navbar-list-item">
          <Link className="link" to="/platforms">
            Platforms
          </Link>
        </li>
      </ul>
    </nav>
  );
}
