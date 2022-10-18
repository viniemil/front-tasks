import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import Transactions from "./pages/Tasks";
import CssBaseline from "@mui/material/CssBaseline";

export const Router = () => {
  return (
    <BrowserRouter>
      <CssBaseline />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/tasks" element={<Transactions />} />
        <Route path="*" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};
