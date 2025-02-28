import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home.jsx";
import SearchPage from "./pages/searchpage.jsx";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/search" element={<SearchPage />} />
            </Routes>
        </Router>
    );
}

export default App;
