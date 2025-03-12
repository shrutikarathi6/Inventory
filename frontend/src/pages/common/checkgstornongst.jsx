import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from "../../components/common/Navbar/navbar.jsx"

const CheckGstOrNonGst = () => {
    const navigate = useNavigate();

    const handleNavigation = (path) => {
        navigate(path);
    };

    return (
        
        <div className="container">
            <Navbar/>
            <h1 className="title">Select GST or Non-GST</h1>
            <div className="button-container">
                <button className="gst-btn" onClick={() => handleNavigation('/gst/home')}>
                    GST
                </button>
                <button className="nongst-btn" onClick={() => handleNavigation('/nongst/home')}>
                    Non-GST
                </button>
            </div>
        </div>
    );
};

export default CheckGstOrNonGst;
