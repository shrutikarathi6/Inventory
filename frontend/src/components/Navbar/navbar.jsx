import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./navbar.css"

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("token"); // Check if user is logged in

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token
    navigate("/login"); // Redirect to login page
  };

  return (
    <nav className="navbar">
      {token ? (
        <>
          <button onClick={() => navigate("/")}>Home</button>
          <button onClick={() => navigate("/search")}>Search</button>
          <button onClick={() => navigate("/excel")}>Download Excel</button>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <>
          {location.pathname !== "/login" && <button onClick={() => navigate("/login")}>Login</button>}
          {location.pathname !== "/register" && <button onClick={() => navigate("/register")}>Register</button>}
        </>
      )}
    </nav>
  );
};

export default Navbar;
