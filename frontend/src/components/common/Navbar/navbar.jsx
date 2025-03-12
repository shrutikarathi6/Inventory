import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { LogIn, UserPlus } from "lucide-react"; // Icons import
import "./navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="nav-left">
        {token ? (
          <button className="nav-btn" onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <>
            {location.pathname !== "/login" && (
              <button className="nav-btn" onClick={() => navigate("/login")}>
                <LogIn size={18} /> Login
              </button>
            )}

            {location.pathname !== "/register" && (
              <button className="nav-btn" onClick={() => navigate("/register")}>
                <UserPlus size={18} /> Register
              </button>
            )}
          </>
        )}
      </div>
      <div className="nav-right">MY COMPANY</div>
    </nav>
  );
};

export default Navbar;
