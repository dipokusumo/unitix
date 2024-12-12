import React from "react";
import { Link } from "react-router-dom";
import { FaUserCircle, FaSearch } from "react-icons/fa"; // Impor ikon profil dan pencarian

const Navbar = () => {
  return (
    <header className="bg-white shadow-sm py-4 px-6 flex justify-between items-center">
      {/* Navigasi Kiri */}
      <div className="flex items-center space-x-8">
        <nav className="space-x-6 flex">
          {[{ name: "Dashboard", path: "/dashboard" },
            { name: "Acara", path: "/event" },
            { name: "Tiketku", path: "/tiketku" }].map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className="relative text-gray-600 hover:text-[#00FFFF] font-medium group"
            >
              {item.name}
              {/* Hover Bar */}
              <span className="absolute left-0 bottom-0 w-0 h-1 bg-[#00FFFF] transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
        </nav>
      </div>

      {/* Bagian Kanan */}
      <div className="flex items-center space-x-4">
        {/* Input Pencarian */}
        <div className="relative">
          <input
            type="text"
            path="/event"
            placeholder="Cari Acara..."
            className="pl-10 pr-4 py-1 h-8 w-64 border rounded-lg outline-none"
          />
          <FaSearch className="absolute left-3 top-2.5 text-gray-400" />
        </div>

        {/* Tombol Notifikasi */}
        <button className="text-gray-500">
          <i className="fas fa-bell"></i>
        </button>

        {/* Ikon Profil */}
        <Link to="/profile" className="text-[#00FFFF] hover:text-teal-400">
          <FaUserCircle className="text-2xl" />
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
