import './form.css';
import React, { useState, useEffect } from "react";
import axios from "axios";

const ExampleForm = () => {
  const [formData, setFormData] = useState({ name: "", uniqueid: "", roll: "", age: "" });
  const [isManualAge, setIsManualAge] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "age") {
      setIsManualAge(true);
    }
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    if (!isManualAge) {
      const newAge = Number(formData.uniqueid) + Number(formData.roll);
      if (!isNaN(newAge)) {
        setFormData((prev) => ({ ...prev, age: newAge }));
      }
    }
  }, [formData.uniqueid, formData.roll]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/students/submit", formData);
      alert(response.data.message);
      setFormData({ name: "", uniqueid: "", roll: "", age: "" });
      setIsManualAge(false);
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
              name="name"
              placeholder="Enter Name"
              className="input-field"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-container">
            <label className="input-label">Unique ID:</label>
            <input
              type="number"
              name="uniqueid"
              placeholder="Enter Unique Id"
              className="input-field"
              value={formData.uniqueid}
              onChange={handleChange}
              required
            />
          </div>

          <div className="bajubaju">
            <div className="input-container">
              <label className="input-label">Roll:</label>
              <input
                type="number"
                name="roll"
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
                  name="age"
                  placeholder="Calculated Age"
                  className="input-field"
                  value={formData.age}
                  readOnly // 👈 Read-only set kiya
                />
              </div>

          </div>

          <button type="submit" className="submit-button">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default ExampleForm;
