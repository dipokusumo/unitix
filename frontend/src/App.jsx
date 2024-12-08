import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/AdminHome"
import MainPage from "./pages/CustomerDashboard"
import EventPage from "./pages/AcaraPage";
import { ToastContainer } from 'react-toastify';
import DetailAcara from "./pages/DetailPage.jsx";
export default function App() {
  return (
    <div>
      <LoginPage/>
      <ToastContainer />
      <DashboardPage/>
      <MainPage/>
      <EventPage/>
      <DetailAcara/>

     
      
    </div>
  );
}