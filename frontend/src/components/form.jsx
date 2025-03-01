// import React, { useState } from "react";
// import axios from "axios";

// const Form = () => {
//     const [formData, setFormData] = useState({ name: "", roll: "", age: "" });

//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await axios.post("http://localhost:5000/api/students/submit", formData);
//             alert(response.data.message);
//             setFormData({ name: "", roll: "", age: "" });
//         } catch (error) {
//             console.error("Error submitting form:", error);
//             alert("Failed to submit data!");
//         }
//     };

//     return (
//         <div>
//             <h2>Student Registration Form</h2>
//             <form onSubmit={handleSubmit}>
//                 <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
//                 <input type="text" name="roll" placeholder="Roll No" value={formData.roll} onChange={handleChange} required />
//                 <input type="number" name="age" placeholder="Age" value={formData.age} onChange={handleChange} required />
//                 <button type="submit">Submit</button>
//             </form>
//         </div>
//     );
// };
import React, { useState } from 'react';
import axios from 'axios';

const Form = () => {
    const [formData, setFormData] = useState({
        name: '',
        roll: '',
        age: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/students/submit', formData);
            alert(response.data.message);
            setFormData({
                name: '',
                roll: '',
                age: '',
            });
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('Failed to submit data!');
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-blue-100 p-6">
            <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-lg border border-gray-300">
                <h2 className="text-2xl font-bold text-center mb-6">ADD NEW STUDENT</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 gap-4">
                        <div>
                            <label className="block font-medium text-gray-700">Name</label>
                            <input type="text" name="name" placeholder="Enter Name" value={formData.name} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>
                        <div>
                            <label className="block font-medium text-gray-700">Roll No</label>
                            <input type="text" name="roll" placeholder="Enter Roll No" value={formData.roll} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>
                        <div>
                            <label className="block font-medium text-gray-700">Age</label>
                            <input type="number" name="age" placeholder="Enter Age" value={formData.age} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>
                    </div>
                    <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition font-semibold">ADD STUDENT</button>
                </form>
            </div>
        </div>
    );
};

export default Form;


