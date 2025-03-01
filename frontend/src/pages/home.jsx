import React from "react";
import Form from "../components/form.jsx";
import Exampleform from "../components/exampleform.jsx";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar/navbar.jsx";

const Home = () => {
    return (
        <div>
            <Navbar/>
            <Exampleform />
            {/* <Link to="/search">Go to Search Page</Link> */}
        </div>
    );
};

export default Home;
