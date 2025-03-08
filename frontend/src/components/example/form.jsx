// Frontend - React with Autofill Functionality
import React, { useState, useEffect } from "react";
import axios from "axios";

const AutoFillForm = () => {
  const [name, setName] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const fetchNames = async () => {
      try {
        if (name.length > 0) { // Only fetch when input is not empty
          const response = await axios.get(`http://localhost:5000/api/names?q=${name}`);
          setSuggestions(response.data);
        } else {
          setSuggestions([]); // Clear suggestions if input is empty
        }
      } catch (error) {
        console.error("Error fetching names:", error);
      }
    };
    
    fetchNames();
  }, [name]);

  return (
    <div>
      <h2>Autofill Form</h2>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter Name"
        list="name-suggestions"
      />
      <datalist id="name-suggestions">
        {suggestions.map((s, index) => (
          <option key={index} value={s} />
        ))}
      </datalist>
    </div>
  );
};

export default AutoFillForm;
