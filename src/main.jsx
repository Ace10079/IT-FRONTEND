import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./App";
import Project from "./Project";
import './index.css'
import HOD from "./HOD";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/projects" element={<Project />} />
      <Route path="/hod-dashboard" element={<HOD/>} />
    </Routes>
  </Router>
);
