import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { LogOut, LogIn, UserPlus, Search, Home } from "lucide-react";  // ✅ Added missing Home icon
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
            {location.pathname === "/maintenance" ? (
              <button className="nav-btn" onClick={() => navigate("/")}>
                <Home size={18} /> GST/NONGST
              </button>
            ) : location.pathname === "/" ? (
              <>
                <button className="nav-btn" onClick={() => navigate("/maintenance")}>
                  <Search size={18} /> Maintenance
                </button>
                <button className={`nav-btn ${location.pathname === "/adminlogin" ? "active" : ""}`} onClick={() => navigate("/adminlogin")}>
                              <UserPlus size={18} /> AdminLogin
                            </button>
                <button className="nav-btn logout-btn" onClick={handleLogout}>
                  <LogOut size={18} /> Logout
                </button>
              </>
            ) : null}
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
      <div className="nav-right">YLPL/AVS</div>
    </nav>
  );
};

export default Navbar;
