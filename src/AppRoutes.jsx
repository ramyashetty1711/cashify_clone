import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Common/Navbar";
import Home from "./assets/Components/Home/Home";
import AboutUs from "./assets/Components/AboutUs/AboutUs";
import ContactUs from "./assets/Components/ContactUs/ContactUs";
import Services from "./assets/Components/Services/Services";

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        {/* Layout route */}
        <Route path="/" element={<Navbar />}>
          {/* Default route */}
          <Route index element={<Home />} /> 

          {/* Other routes */}
          <Route path="about-us" element={<AboutUs />} />
          <Route path="contact-us" element={<ContactUs />} />
          <Route path="services" element={<Services />} />

          {/* Example: Nested routes under Navbar */}
          {/* <Route path="workorder" element={<WorkOrderManagement />} /> */}
          {/* <Route path="sc-management" element={<SCManagement />} /> */}
        </Route>
      </Routes>
    </Router>
  );
}