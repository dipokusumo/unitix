import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/AdminHome"
import MainPage from "./pages/CustomerDashboard"
import EventPage from "./pages/AcaraPage";
import { ToastContainer } from 'react-toastify';
import DetailAcara from "./pages/DetailPage";
import RegisterPage from "./pages/RegisterPage";
import AdminHome from "./pages/AdminHome";
export default function App() {
  return (
    <div>
      <LoginPage/>
      <RegisterPage/>
      <ToastContainer />
      <DashboardPage/>
      <AdminHome/>
      <MainPage/>
      <EventPage/>
      <DetailAcara/>

     
      
    </div>
  );
}