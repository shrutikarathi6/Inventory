import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Admin/Navbar/navbar";

const AdminLogin = () => {
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    

    const handleLogin = async (e) => {
        e.preventDefault();
        console.log(email,password)
        if (email === "admin@gmail.com" && password === "admin") {
            localStorage.setItem("adminAuth", "true"); // Store authentication flag
            navigate("/admin"); // Redirect to Admin Home
        } else {
            alert("Invalid credentials!");
        }
    };

    return (
        <>
         <Navbar/>
        <div className="login-container">
           
            <div className="login-box">
                <h2 className="login-title">Admin Login</h2>
                <form onSubmit={handleLogin} className="login-form">
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="login-input"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="login-input"
                    />
                     
                    <button type="submit" className="login-button">Login</button>
                </form>
            </div>
        </div>
        </>
    );
};

export default AdminLogin;
