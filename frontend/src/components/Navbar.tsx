import { Link } from "react-router-dom";
import "../styles/Navbar.css";
import { useEffect, useState } from "react";

export default function Navbar() {
  const initialValue = [false, false, false, false, false];
  const [selections, setSelections] = useState(initialValue);

  const fullPath = window.location.href;
  console.log("Debug Navbar: fullPath is " + fullPath);
  
  const updateSelectionCSS = function(index){
    console.log("Debug Navbar: updateSelectionCSS invoked with index " + index);
    const newSelections = selections.map((selection, i) => i === index);
    //setSelections(prevSelections => prevSelections.map((_, i) => i === index));
    setSelections(newSelections);
    console.log("Debug navbar: selections after usc are: " + newSelections.toString());
  }
  useEffect(() => {
    console.log("Selections updated:", selections);
    // Any logic dependent on the updated selections can go here
  }, [selections]); // This effect will run whenever selections changes

  const linkStyle0 = {
    border: selections[0] ? '4px solid purple' : 'none',
    padding: '10px',
    display: 'inline-block'
  };
  const linkStyle1 = {
    border: selections[1] ? '4px solid purple' : 'none',
    padding: '10px',
    display: 'inline-block'
  };
  const linkStyle2 = {
    border: selections[2] ? '4px solid purple' : 'none',
    padding: '10px',
    display: 'inline-block'
  };
  const linkStyle3 = {
    border: selections[3] ? '4px solid purple' : 'none',
    padding: '10px',
    display: 'inline-block'
  };
  const linkStyle4 = {
    border: selections[4] ? '4px solid purple' : 'none',
    padding: '10px',
    display: 'inline-block'
  };
  return (
    <nav className="navbar-outer">
      <ul className="list">
        <li className="navbar-list-item">
          <Link className="link" style={linkStyle0} onClick={() => updateSelectionCSS(0)} to="/space-missions">
            Space Missions
          </Link>
        </li>
        <li className="navbar-list-item">
          <Link className="link" style={linkStyle1} onClick={() => updateSelectionCSS(1)} to="/astronauts">
            Astronauts
          </Link>
        </li>
        <li className="navbar-list-item">
          <Link className="link" style={linkStyle2} onClick={() => updateSelectionCSS(2)} to="/companies">
            Companies
          </Link>
        </li>
        <li className="navbar-list-item">
          <Link className="link" style={linkStyle3} onClick={() => updateSelectionCSS(3)} to="/agencies">
            Agencies
          </Link>
        </li>
        <li className="navbar-list-item">
          <Link className="link" style={linkStyle4} onClick={() => updateSelectionCSS(4)} to="/platforms">
            Platforms
          </Link>
        </li>
      </ul>
    </nav>
  );
}
