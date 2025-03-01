import React from 'react';
import './Navbar.css';
import { FaPlus, FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <div className="left-icons">
        <div className="nav-icon active" onClick={() => navigate('/')}>
          <FaPlus /> Add Product
        </div>
        <div className="nav-icon" onClick={() => navigate('/search')}>
          <FaSearch /> Search
        </div>
      </div>
      <div className="company-name">MyCompany</div>
    </nav>
  );
};

export default Navbar;
