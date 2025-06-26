import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Navbar from "./components/Common/Navbar";
import WorkOrderManagement from "./components/WorkOrderManagement/WorkOrderManagement";

export default function AppRoutes() {
  const AppRoutes = [
    { path: "/home", component: <Home /> },
    { path: "/workorder", component: <WorkOrderManagement /> },
  ];
  return (
    <Router>
      <Routes>
        <Route element={<Login />} path="/" />
        <Route element={<Navbar />}>
          {AppRoutes.map((item) => (
            <Route path={item.path} element={item.component} />
          ))}
        </Route>
      </Routes>
    </Router>
  );
}
