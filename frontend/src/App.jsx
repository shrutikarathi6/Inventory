import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/home.jsx";
import SearchPage from "./pages/searchpage.jsx";
import ExcelSheet from "./pages/excelsheet.jsx";
import Register from "./pages/register.jsx";
import Login from "./pages/login.jsx";
import Navbar from "./components/Navbar/navbar.jsx";

const PrivateRoute = ({ element }) => {
  return localStorage.getItem("token") ? element : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<PrivateRoute element={<Home />} />} />
        <Route path="/search" element={<PrivateRoute element={<SearchPage />} />} />
        <Route path="/excel" element={<PrivateRoute element={<ExcelSheet />} />} />
        
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
