import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "./updateform.css";

const UpdateForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const studentData = location.state?.student || { name: "", uniqueid: "", roll: "", age: "" };

  const [formData, setFormData] = useState(studentData);

  useEffect(() => {
    setFormData(studentData); // Ensures data is set when component mounts
  }, [studentData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:5000/api/students/update/${formData.uniqueid}`, formData);
      alert(response.data.message);
      navigate("/search");
    } catch (error) {
      console.error("Error updating student:", error);
      alert("Failed to update data!");
    }
  };

  return (
    <div className="background">
      <div className="foreground">
        <h2>Update Details</h2>
        <form onSubmit={handleSubmit} className="form-container">
          <div className="input-container">
            <label className="input-label">Name:</label>
            <input type="text" name="name" className="input-field" value={formData.name} onChange={handleChange} required />
          </div>
          <div className="input-container">
            <label className="input-label">Unique ID:</label>
            <input type="number" name="uniqueid" className="input-field" value={formData.uniqueid} readOnly />
          </div>
          <div className="bajubaju">
            <div className="input-container">
              <label className="input-label">Roll:</label>
              <input type="number" name="roll" className="input-field" value={formData.roll} onChange={handleChange} required />
            </div>
            <div className="input-container">
              <label className="input-label">Age:</label>
              <input type="number" name="age" className="input-field" value={formData.age} readOnly />
            </div>
          </div>
          <button type="submit" className="submit-button">Update</button>
        </form>
      </div>
    </div>
  );
};

export default UpdateForm;
