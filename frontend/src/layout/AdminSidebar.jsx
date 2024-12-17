import React from "react";
import { FaHome, FaChartBar, FaUsers, FaQrcode } from "react-icons/fa";
import { IoIosSpeedometer } from "react-icons/io";
import { useNavigate } from "react-router-dom";

function Sidebar() {
  const user = JSON.parse(localStorage.getItem("user"));

  const navigate = useNavigate();

  const handleAdminHome = () => {
    navigate("/admin");
  };
  const handleStatistikPenjualan = () => {
    navigate("/admin/statistik-penjualan");
  };
  const handleKelolaPengguna = () => {
    navigate("/admin/kelola-pengguna");
  };

  const handleCheckinQRCode = () => {
    navigate("/admin/checkin-qrcode");
  };

  return (
    <div className="w-64 bg-white text-black p-5 flex flex-col justify-between h-screen">
      {/* Bagian atas - Menu */}
      <div>
        {/* Header dengan ikon */}
        <div className="flex items-center space-x-3 mb-6">
          <IoIosSpeedometer className="text-2xl" />
          <h1 className="text-2xl font-bold">Dashboard</h1>
        </div>

        {/* Menu */}
        <ul className="space-y-4">
          <li>
            <button
              className="flex items-center space-x-2 w-full text-left p-3 bg-gray-200 rounded-md hover:bg-[#00CCCC]"
              onClick={handleAdminHome}
            >
              <FaHome />
              <span>Home</span>
            </button>
          </li>
          <li>
            <button
              className="flex items-center space-x-2 w-full text-left p-3 bg-gray-200 rounded-md hover:bg-[#00CCCC]"
              onClick={handleStatistikPenjualan}
            >
              <FaChartBar />
              <span>Statistik Penjualan</span>
            </button>
          </li>
          <li>
            <button
              className="flex items-center space-x-2 w-full text-left p-3 bg-gray-200 rounded-md hover:bg-[#00CCCC]"
              onClick={handleKelolaPengguna}
            >
              <FaUsers />
              <span>Kelola Pengguna</span>
            </button>
          </li>
          <li>
            <button
              className="flex items-center space-x-2 w-full text-left p-3 bg-gray-200 rounded-md hover:bg-[#00CCCC]"
              onClick={handleCheckinQRCode}
            >
              <FaQrcode />
              <span>Check-in QR Code</span>
            </button>
          </li>
        </ul>
      </div>

      {/* Bagian bawah - Profil Admin */}
      <div className="bg-gray-200 p-4 rounded-md transition w-full text-left">
        <div className="flex flex-col items-center">
          {/* Avatar */}
          <img
            src={
              user.photo_url ||
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcbrL19wroNpkTBQp0pwlbB88EVa0EjOk61g&s"
            }
            className="w-16 h-16 rounded-full bg-gray-300 flex items-center justify-center text-xl font-bold text-white mb-2"
          />
          {/* Nama Admin */}
          <p className="font-semibold text-lg mb-2">{user.name}</p>
          {/* Tombol Logout */}
          <button
            className="w-full py-2 bg-[#00CCCC] text-black rounded-full hover:bg-[#00FFFF]"
            onClick={() => {
              localStorage.clear();
              navigate("/login");
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
