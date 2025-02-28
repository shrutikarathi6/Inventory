import React, { useState } from "react";
import axios from "axios";

const Search = () => {
    const [searchName, setSearchName] = useState("");
    const [results, setResults] = useState([]);

    const handleSearch = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/search?name=${searchName}`);
            setResults(response.data.results);
        } catch (error) {
            console.error("Error searching data:", error);
        }
    };

    return (
        <div>
            <h2>Search Student</h2>
            <input
                type="text"
                placeholder="Enter name to search"
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>

            {results.length > 0 ? (
                <table border="1">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Roll No</th>
                            <th>Age</th>
                        </tr>
                    </thead>
                    <tbody>
                        {results.map((student, index) => (
                            <tr key={index}>
                                <td>{student.name}</td>
                                <td>{student.roll}</td>
                                <td>{student.age}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No results found</p>
            )}
        </div>
    );
};

export default Search;
