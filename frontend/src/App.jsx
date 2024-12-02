import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/AdminHome"
import MainPage from "./pages/CustomerDashboard"
import { ToastContainer } from 'react-toastify';
export default function App() {
  return (
    <div>
      <LoginPage/>
      <ToastContainer />
      <DashboardPage/>
      <MainPage/>

     
      
    </div>
  );
}