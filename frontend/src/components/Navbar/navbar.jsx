import React, { useState } from "react";
import "./Navbar.css";
import { FaPlus, FaSearch, FaDownload } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";


const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  


  return (
    <>
      <nav className="navbar">
        <div className="left-icons">
          <div className={`nav-icon ${location.pathname === "/" ? "active" : ""}`} onClick={() => navigate("/")}>
            <FaPlus /> Add Product
          </div>
          <div className={`nav-icon ${location.pathname === "/search" ? "active" : ""}`} onClick={() => navigate("/search")}>
            <FaSearch /> Search
          </div>
          <div 
              className={`nav-icon ${location.pathname === "/excel" ? "active" : ""}`} 
              onClick={() => {
                navigate("/excel");
  
              }}
            >
              <FaDownload /> Download Excel
            </div>

        </div>
        <div className="company-name">MyCompany</div>
      </nav>

      
    </>
  );
};

export default Navbar;
