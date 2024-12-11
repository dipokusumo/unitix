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
import HistoryPage from './pages/HistoryPage';
import EditProfilePage from './pages/ProfilePage';
import ChangePassword from './pages/ChangePasswordPage';
import PaymentSuccess from './pages/PaymentSucces';
import PaymentFail from './pages/PaymentFail';
import CreateEventPage from './pages/CreateEventPage';
import EditEventPage from './pages/EditEventPage';
import DetailStatistik from './pages/DetailStatistik';
import KelolaPenggunaPage from './pages/KelolaPengguna';
import StatistikPenjualanPage from './pages/StatistikPenjualanPage';
import AktivitasPage from './pages/AktivitasPage';

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
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/edit-profile" element={<EditProfilePage />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/succes" element={<PaymentSuccess />} />
        <Route path="/fail" element={<PaymentFail />} />
        <Route path="/create-event" element={<CreateEventPage />} />
        <Route path="/edit-event/:eventId" element={<EditEventPage />} />
        <Route path="/statistik-penjualan" element={<StatistikPenjualanPage />} />
        <Route path="/statistik-penjualan/:statistikId" element={<DetailStatistik />} />
        <Route path="/statistik-penjualan/:statistikId/aktivitas" element={<AktivitasPage />} />
        <Route path="/kelola-pengguna" element={<KelolaPenggunaPage />} />
      </Routes>
      <ToastContainer />
    </Router>
  );
};

export default App;