import React from "react";
// import Form from "../components/form.jsx";
import Example from "../components/example.jsx"

import { Link } from "react-router-dom";
import Navbar from "../components/Navbar/navbar.jsx";

const Home = () => {
    return (
        <div>
            <Navbar/>
            <Example/>
           
            {/* <Link to="/search">Go to Search Page</Link> */}
        </div>
    );
};

export default Home;
