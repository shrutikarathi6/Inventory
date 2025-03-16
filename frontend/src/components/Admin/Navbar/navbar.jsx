import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Home, Search, LogOut, LogIn } from "lucide-react"; // Icons import
import "./navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isAdminAuthenticated = localStorage.getItem("adminAuth") === "true";

  return (
    <nav className="navbar">
      <div className="nav-left">
        {/* Always show GST/NONGST button */}
        <button
          className={`nav-btn ${location.pathname === "/" ? "active" : ""}`}
          onClick={() => navigate("/")}
        >
          <Home size={18} /> GST/NONGST
        </button>

        {/* Show other options only if not on /adminlogin */}
        {location.pathname !== "/adminlogin" && isAdminAuthenticated && (
          <>

<button
              className={`nav-btn ${location.pathname === "/admin" ? "active" : ""}`}
              onClick={() => navigate("/admin")}
            >
              <Search size={18} /> AdminHome
            </button>
            
            <button
              className={`nav-btn ${location.pathname === "/admin/search/gst" ? "active" : ""}`}
              onClick={() => navigate("/admin/search/gst")}
            >
              <Search size={18} /> GST Search
            </button>

            <button
              className={`nav-btn ${location.pathname === "/admin/search/nongst" ? "active" : ""}`}
              onClick={() => navigate("/admin/search/nongst")}
            >
              <Search size={18} /> NONGST Search
            </button>

            <button className="nav-btn" onClick={() => {
              localStorage.removeItem("adminAuth");
              navigate("/adminlogin");
            }}>
              <LogOut size={18} /> Logout
            </button>
          </>
        )}

        {/* Show login button only if not authenticated and not already on /adminlogin */}
        {!isAdminAuthenticated && location.pathname !== "/adminlogin" && (
          <button className="nav-btn" onClick={() => navigate("/adminlogin")}>
            <LogIn size={18} /> Admin Login
          </button>
        )}
      </div>
      <div className="nav-right">Admin Panel</div>
    </nav>
  );
};

export default Navbar;
