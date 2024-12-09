import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/AdminHome";
import AdminHome from "./pages/AdminHome";
import MainPage from "./pages/CustomerDashboard";
import EventPage from "./pages/AcaraPage";
import DetailAcara from "./pages/DetailPage";
import ConfirmationPage from "./pages/ConfirmationPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/admin-dashboard" element={<DashboardPage />} />
        <Route path="/admin-home" element={<AdminHome />} />
        <Route path="/dashboard" element={<MainPage />} />
        <Route path="/event" element={<EventPage />} />
        <Route path="/event-detail" element={<DetailAcara />} />
        <Route path="/confirmation" element={<ConfirmationPage />} />
      </Routes>
      <ToastContainer />
    </Router>
  );
};

export default App;