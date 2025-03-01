import React from "react";
import ExampleForm from "../components/exampleForm.jsx";
// import Form from "../components/form.jsx";
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div>
            <ExampleForm />
            {/* <Link to="/search">Go to Search Page</Link> */}
            
        </div>
    );
};

export default Home;
