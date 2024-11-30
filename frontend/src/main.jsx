import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.jsx';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/Dashboard';

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
    path: "/main",
    element: <DashboardPage />, // Halaman login
  },
]);

// Render aplikasi dengan router
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
