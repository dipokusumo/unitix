import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.jsx';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/AdminHome';
import MainPage from './pages/CustomerDashboard';
import EventPage from './pages/AcaraPage';
import DetailAcara from './pages/DetailPage';
import CustomerHome from './pages/CustomerHome';
import ConfirmationPage from './pages/ConfirmationPage';
import EventPage from './pages/AcaraPage';
import RegisterPage from './pages/RegisterPage.jsx'

// Mendefinisikan router
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // Halaman utama
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/login",
    element: <LoginPage />, // Halaman login
  },
  {
    path: "/homeadmin",
    element: <DashboardPage />, // Halaman Home Admin
  },
  {
    path: "/homecustomer",
    element: <CustomerHome />, // Halaman Home Customer
  },
  {
    path: "/acara",
    element: <EventPage />, // Halaman Acara
  },
  {
    path: "/detail/:eventId",
    element: <DetailAcara />, // Halaman Acara
  },
  {
    path: "/konfirmasi",
    element: <ConfirmationPage />, // Halaman Acara
  },
]);

// Render aplikasi dengan router
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
