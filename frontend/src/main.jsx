import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.jsx';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/AdminHome';
import MainPage from "./pages/CustomerDashboard"

// Mendefinisikan router
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // Halaman utama
  },
  {
    path: "/login",
    element: <LoginPage />, // Halaman login
  },
  {
    path: "/HomeAdmin",
    element: <DashboardPage />, // Halaman login
  },
  {
    path: "/HomeCustomer",
    element: <MainPage />, // Halaman login
  },
]);

// Render aplikasi dengan router
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
