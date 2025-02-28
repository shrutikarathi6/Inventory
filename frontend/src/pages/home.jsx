import React from "react";
import Form from "../components/form.jsx";
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div>
            <Form />
            <Link to="/search">Go to Search Page</Link>
        </div>
    );
};

export default Home;
