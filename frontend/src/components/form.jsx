import React, { useState } from "react";
import axios from "axios";

const Form = () => {
    const [formData, setFormData] = useState({ name: "", roll: "", age: "" });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/submit", formData);
            alert(response.data.message);
            setFormData({ name: "", roll: "", age: "" });
        } catch (error) {
            console.error("Error submitting form:", error);
            alert("Failed to submit data!");
        }
    };

    return (
        <div>
            <h2>Student Registration Form</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
                <input type="text" name="roll" placeholder="Roll No" value={formData.roll} onChange={handleChange} required />
                <input type="number" name="age" placeholder="Age" value={formData.age} onChange={handleChange} required />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default Form;
