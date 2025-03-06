import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home.jsx";
import SearchPage from "./pages/searchpage.jsx";
import ExcelSheet from "./pages/excelsheet.jsx";
import Updateform from "./pages/updateform.jsx";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
               
                <Route path="/update-form" element={< Updateform/>} />
                <Route path="/search" element={<SearchPage />} />
                <Route path="/excel" element={<ExcelSheet />} />
            </Routes>
        </Router>
    );
}

export default App;
