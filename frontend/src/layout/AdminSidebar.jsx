import React from 'react';
import { FaHome, FaChartBar, FaUsers } from 'react-icons/fa';
import { IoIosSpeedometer } from "react-icons/io";

function Sidebar() {
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
            <button className="flex items-center space-x-2 w-full text-left p-3 bg-gray-200 rounded-md hover:bg-[#00CCCC]">
              <FaHome />
              <span>Home</span>
            </button>
          </li>
          <li>
            <button className="flex items-center space-x-2 w-full text-left p-3 bg-gray-200 rounded-md hover:bg-[#00CCCC]">
              <FaChartBar />
              <span>Statistik Penjualan</span>
            </button>
          </li>
          <li>
            <button className="flex items-center space-x-2 w-full text-left p-3 bg-gray-200 rounded-md hover:bg-[#00CCCC]">
              <FaUsers />
              <span>Kelola Pengguna</span>
            </button>
          </li>
        </ul>
      </div>

      {/* Bagian bawah - Profil Admin */}
      <button
        className="bg-gray-200 p-4 rounded-md hover:bg-[#00CCCC] transition w-full text-left"
        onClick={() => alert('Admin Profile Clicked!')} 
      >
        <div className="flex flex-col items-center">
          {/* Avatar */}
          <div className="w-16 h-16 rounded-full bg-gray-300 flex items-center justify-center text-xl font-bold text-white mb-2">
            A
          </div>
          {/* Nama Admin */}
          <p className="font-semibold text-lg mb-2">Admin</p>
          {/* Tombol Logout */}
          <button
            className="w-full py-2 bg-[#00CCCC] text-black rounded-full hover:bg-[#00FFFF]"
            onClick={(e) => {
              e.stopPropagation(); // Mencegah trigger klik kotak admin
              alert('Logged out!');
            }}
          >
            Logout
          </button>
        </div>
      </button>
    </div>
  );
}

export default Sidebar;
