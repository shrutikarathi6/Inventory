import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from "../../components/common/Navbar/navbar.jsx"

const CheckGstOrNonGst = () => {
    const navigate = useNavigate();

    const handleNavigation = (path) => {
        navigate(path);
    };

    return (
        <div style={{
            backgroundColor: "#adb5bd",
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center"
        }}>
            <Navbar />
            <div style={{
                width: "30%",
                backgroundColor: "#e5e5e5",
                padding: "40px",
                borderRadius: "10px",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
            }}>
                <h1 style={{
                    marginBottom: "20px",
                    fontSize: "22px",
                    color: "black"
                }}>Select GST or Non-GST</h1>

                <div style={{ width: "100%", display: "flex", justifyContent: "space-around" }}>
                    <button 
                        onClick={() => handleNavigation('/gst/home')} 
                        style={{
                            width: "40%",
                            padding: "10px",
                            backgroundColor: "#4a9fd6",
                            color: "white",
                            border: "none",
                            borderRadius: "5px",
                            cursor: "pointer",
                            transition: "0.3s",
                            fontSize: "16px"
                        }}
                        onMouseOver={(e) => e.target.style.backgroundColor = "#3579a8"}
                        onMouseOut={(e) => e.target.style.backgroundColor = "#4a9fd6"}
                    >
                        GST
                    </button>

                    <button 
                        onClick={() => handleNavigation('/nongst/home')} 
                        style={{
                            width: "40%",
                            padding: "10px",
                            backgroundColor: "#4a9fd6",
                            color: "white",
                            border: "none",
                            borderRadius: "5px",
                            cursor: "pointer",
                            transition: "0.3s",
                            fontSize: "16px"
                        }}
                        onMouseOver={(e) => e.target.style.backgroundColor = "#3579a8"}
                        onMouseOut={(e) => e.target.style.backgroundColor = "#4a9fd6"}
                    >
                        Non-GST
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CheckGstOrNonGst;
