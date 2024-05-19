import { Link } from "react-router-dom";
import "../styles/Header.css";
import { useState } from "react";

export default function Header() {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div className="header-outer">
      <div
        className="header-profile-outer"
        onClick={() => setDropdownOpen(!isDropdownOpen)}
      >
        <div className="header-profile">
          <div className="header-profile-text">
            <span>Menu</span>
          </div>

          {isDropdownOpen && (
            <div className="header-profile-dropdown">
              <Link
                to={
                  "/" +
                  localStorage.getItem("userRole")?.toLowerCase() +
                  "/" +
                  localStorage.getItem("userId")
                }
                className="header-profile-dropdown-link"
              >
                Profile
              </Link>
              {localStorage.getItem("userRole") === "COMPANY" && (
                <>
                  <Link
                    to="/transactions"
                    className="header-profile-dropdown-link"
                  >
                    Transactions
                  </Link>
                  <Link
                    to="/received-bids"
                    className="header-profile-dropdown-link"
                  >
                    Received Bids
                  </Link>
                  <Link
                    to="/offered-bids"
                    className="header-profile-dropdown-link"
                  >
                    Offered Bids
                  </Link>
                </>
              )}
              <Link to="/settings" className="header-profile-dropdown-link">
                Settings
              </Link>
              <Link to="/login" className="header-profile-dropdown-link">
                Logout
              </Link>
            </div>
          )}
        </div>
      </div>
      <div>
        <h1 className="header-header">Space Mission System</h1>
      </div>
    </div>
  );
}
