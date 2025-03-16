import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Home, Search, FileText, LogOut, LogIn, UserPlus } from "lucide-react"; // Icons import kiye
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
          <>
            <button className={`nav-btn ${location.pathname === "/gst/home" ? "active" : ""}`} onClick={() => navigate("/gst/home")}>
              <Home size={18} /> Home
            </button>
            <button className={`nav-btn ${location.pathname === "/gst/search" ? "active" : ""}`} onClick={() => navigate("/gst/search")}>
              <Search size={18} /> Search
            </button>
            <button className={`nav-btn ${location.pathname === "/gst/excel" ? "active" : ""}`} onClick={() => navigate("/gst/excel")}>
              <FileText size={18} /> Download
            </button>
            <button className={`nav-btn ${location.pathname === "/" ? "active" : ""}`} onClick={() => navigate("/")}>
              <Home size={18} /> GST/NONGST
            </button>
            <button className={`nav-btn ${location.pathname === "/adminlogin" ? "active" : ""}`} onClick={() => navigate("/adminlogin")}>
              <Search size={18} /> AdminLogin
            </button>
            <button className="nav-btn logout-btn" onClick={handleLogout}>
              <LogOut size={18} /> Logout
            </button>
          </>
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
