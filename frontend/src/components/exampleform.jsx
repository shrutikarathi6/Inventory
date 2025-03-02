import './exampleform.css';
import React, { useState } from "react";
import axios from "axios";

const ExampleForm = () => {
  const [formData, setFormData] = useState({ name: "", roll: "", age: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/submit", formData);
      alert(response.data.message);
      setFormData({ name: "", roll: "", age: "" });  // Reset form after submission
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to submit data!");
    }
  };

  return (
    <div className="background">
      <div className="foreground">
        <h2>Add Details</h2>
        <form onSubmit={handleSubmit} className="form-container">
          <div className="input-container">
            <label className="input-label">Name:</label>
            <input
              type="text"
              name="name"  // ✅ Fixed: Added name attribute
              placeholder="Enter Name"
              className="input-field"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-container">
            <label className="input-label">Roll:</label>
            <input
              type="text"
              name="roll"  // ✅ Fixed: Added name attribute
              placeholder="Enter Roll"
              className="input-field"
              value={formData.roll}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-container">
            <label className="input-label">Age:</label>
            <input
              type="number"
              name="age"  // ✅ Fixed: Added name attribute
              placeholder="Enter Age"
              className="input-field"
              value={formData.age}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="submit-button">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default ExampleForm;
