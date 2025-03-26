import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./register.css";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://103.146.240.119:5000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Registration Successful! Redirecting to Login...");
        navigate("/login"); // Redirect to Login page
      } else {
        setError(data.msg);
      }
    } catch (err) {
      setError("Server Error. Please try again later.");
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h2 className="register-title">Register</h2>
        {error && <p className="register-error">{error}</p>}
        <form onSubmit={handleRegister} className="register-form">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="register-input"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="register-input"
          />
          <button type="submit" className="register-button">Register</button>
        </form>
      </div>
    </div>
  );
};

export default Register;