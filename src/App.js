import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SubmitFormPage from "./pages/SubmitFormPage";
import EmployeeListPage from "./pages/EmployeeListPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SubmitFormPage />} />
        <Route path="/employees" element={<EmployeeListPage />} />
      </Routes>
    </Router>
  );
}

export default App;
