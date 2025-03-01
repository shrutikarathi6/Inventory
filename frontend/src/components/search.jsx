// import React, { useState } from "react";
// import axios from "axios";

// const Search = () => {
//     const [searchName, setSearchName] = useState("");
//     const [results, setResults] = useState([]);

//     const handleSearch = async () => {
//         try {
//             const response = await axios.get(`http://localhost:5000/api/students/search?name=${searchName}`);

//             setResults(response.data.results);
//         } catch (error) {
//             console.error("Error searching data:", error);
//         }
//     };

//     return (
//         <div>
//             <h2>Search Student</h2>
//             <input
//                 type="text"
//                 placeholder="Enter name to search"
//                 value={searchName}
//                 onChange={(e) => setSearchName(e.target.value)}
//             />
//             <button onClick={handleSearch}>Search</button>

//             {results.length > 0 ? (
//                 <table border="1">
//                     <thead>
//                         <tr>
//                             <th>Name</th>
//                             <th>Roll No</th>
//                             <th>Age</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {results.map((student, index) => (
//                             <tr key={index}>
//                                 <td>{student.name}</td>
//                                 <td>{student.roll}</td>
//                                 <td>{student.age}</td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             ) : (
//                 <p>No results found</p>
//             )}
//         </div>
//     );
// };

// export default Search;
import React, { useState } from "react";
import axios from "axios";

const Search = () => {
    const [filters, setFilters] = useState([{ key: "name", value: "" }]);
    const [results, setResults] = useState([]);

    // Add a new filter dynamically
    const addFilter = () => {
        setFilters([...filters, { key: "name", value: "" }]);
    };

    // Update filter value
    const handleFilterChange = (index, key, value) => {
        const updatedFilters = [...filters];
        updatedFilters[index] = { key, value };
        setFilters(updatedFilters);
    };

    // Remove a filter
    const removeFilter = (index) => {
        const updatedFilters = filters.filter((_, i) => i !== index);
        setFilters(updatedFilters);
    };

    // Perform search with multiple filters
    // const handleSearch = async () => {
    //     try {
    //         // Construct query string dynamically
    //         const queryParams = filters
    //             .map(filter => ${filter.key}=${encodeURIComponent(filter.value)})
    //             .join("&");

    //         const response = await axios.get(http://localhost:5000/api/students/search?${queryParams});
    //         setResults(response.data.results);
    //     } catch (error) {
    //         console.error("Error searching data:", error);
    //     }
    // };
    const handleSearch = async () => {
        try {
            // Construct query string dynamically
            const queryParams = filters
                .map(filter => `${filter.key}=${encodeURIComponent(filter.value)}`)
                .join("&");
    
            const response = await axios.get(`http://localhost:5000/api/students/search?${queryParams}`);
            setResults(response.data.results);
        } catch (error) {
            console.error("Error searching data:", error);
        }
    };
    

    return (
        <div>
            <h2>Search Students</h2>

            {/* Dynamic Filters Section */}
            {filters.map((filter, index) => (
                <div key={index} style={{ display: "flex", alignItems: "center", marginBottom: "8px" }}>
                    <select
                        value={filter.key}
                        onChange={(e) => handleFilterChange(index, e.target.value, filter.value)}
                        style={{ marginRight: "10px" }}
                    >
                        <option value="name">Name</option>
                        <option value="roll">Roll No</option>
                        <option value="age">Age</option>
                    </select>

                    {/* <input
                        type="text"
                        placeholder={Enter ${filter.key}}
                        value={filter.value}
                        onChange={(e) => handleFilterChange(index, filter.key, e.target.value)}
                        style={{ marginRight: "10px" }}
                    /> */}
                    <input
                        type="text"
                        placeholder={`Enter ${filter.key}`} // ✅ Correct syntax
                        value={filter.value}
                        onChange={(e) => handleFilterChange(index, filter.key, e.target.value)}
                        style={{ marginRight: "10px" }}
                    />


                    {/* Remove button (except for the first filter) */}
                    {index > 0 && (
                        <button onClick={() => removeFilter(index)} style={{ marginRight: "10px" }}>−</button>
                    )}
                </div>
            ))}

            {/* Add New Filter Button */}
            <button onClick={addFilter}>+ Add Filter</button>

            {/* Search Button */}
            <button onClick={handleSearch} style={{ marginLeft: "10px" }}>Search</button>

            {/* Results Table */}
            {results.length > 0 ? (
                <table border="1" style={{ marginTop: "20px" }}>
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
