import { NavLink, useNavigate } from "react-router-dom";
import "../styles/Navbar.css";

export default function Navbar() {
  const navigate = useNavigate();

  // ✅ SAFE parsing (prevents crash)
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <nav className="navbar">
      {/* 🌱 Logo */}
      <div className="navbar-logo" onClick={() => navigate("/dashboard")}>
        🌱 Smart Farm
      </div>

      {/* 🔗 Navigation Links */}
      <div className="navbar-links">
        <NavLink to="/dashboard">Dashboard</NavLink>
        <NavLink to="/recommendation">Recommendation</NavLink>
        <NavLink to="/expenses">Expenses</NavLink>
        <NavLink to="/soil">Soil</NavLink>
        <NavLink to="/addnewcrop">Add New Crop</NavLink>
      </div>

      {/* 👤 Profile Section */}
      <div className="navbar-profile">
        <div
          className="profile-click"
          onClick={() => navigate("/profile")}
          title="View Profile"
        >
          {user?.profileImage ? (
            <img
              src={`${user.profileImage}?t=${Date.now()}`} // ✅ CACHE BUST
              alt="profile"
              className="profile-pic"
            />
          ) : (
            <span className="profile-placeholder">
              {user?.name?.charAt(0)?.toUpperCase() || "U"}
            </span>
          )}
        </div>

        <button className="logout-btn" onClick={logout}>
          Logout
        </button>
      </div>
    </nav>
  );
}
