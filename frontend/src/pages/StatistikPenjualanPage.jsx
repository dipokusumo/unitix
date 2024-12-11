import React, { useState } from "react";
import { IoMdPeople, IoIosSearch } from "react-icons/io";
import { IoPeopleCircle } from "react-icons/io5";
import { ImLocation } from "react-icons/im";
import { FaClock } from "react-icons/fa";
import { FaCalendar } from "react-icons/fa";
import { BiSolidCalendarStar } from "react-icons/bi";
import Sidebar from "../layout/AdminSidebar";
import { useNavigate } from "react-router-dom";

function StatistikPenjualanPage() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  // Fungsi untuk mengarahkan ke halaman detail event
  const handleDetailClick = (statistikId) => {
    navigate(`/statistik-penjualan/${statistikId}`);
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col p-6">
        {/* Kotak informasi */}
        <div className="bg-[#00CCCC] p-6 rounded-lg shadow-md mb-6">
          <div className="grid grid-cols-3 gap-6 text-center">
            <div className="flex items-center justify-center space-x-4">
              <IoMdPeople className="text-6xl text-black" />
              <div>
                <h3 className="text-lg font-semibold">Total Customer</h3>
                <p className="text-3xl font-bold">200</p>
              </div>
            </div>
            <div className="flex items-center justify-center space-x-4">
              <IoPeopleCircle className="text-6xl text-black" />
              <div>
                <h3 className="text-lg font-semibold">Member</h3>
                <p className="text-3xl font-bold">80</p>
              </div>
            </div>
            <div className="flex items-center justify-center space-x-4">
              <BiSolidCalendarStar className="text-6xl text-black" />
              <div>
                <h3 className="text-lg font-semibold">Total Event</h3>
                <p className="text-3xl font-bold">7</p>
              </div>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative w-full mb-6">
          <IoIosSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-96 p-3 pl-10 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#00CCCC]"
          />
        </div>

        {/* List Event */}
        <div className="space-y-1">
          {[{
            id: "1", // Contoh ID untuk event
            title: "Ariel Music",
            location: "Alun-alun Kota Semarang",
            date: "18 Desember 2024",
            time: "09:00 WIB",
            image: "https://i.pinimg.com/736x/3d/56/85/3d56856eb8c1c21ed77900c9927ef26d.jpg",
          }, {
            id: "2", // Contoh ID untuk event
            title: "Seminar Nasional",
            location: "Universitas Indonesia",
            date: "17 Januari 2025",
            time: "09:00 WIB",
            image: "https://i.pinimg.com/736x/3d/56/85/3d56856eb8c1c21ed77900c9927ef26d.jpg",
          }, {
            id: "3", // Contoh ID untuk event
            title: "Seminar Nasional",
            location: "Universitas Negeri Semarang",
            date: "16 Desember 2024",
            time: "09:00 WIB",
            image: "https://i.pinimg.com/736x/3d/56/85/3d56856eb8c1c21ed77900c9927ef26d.jpg",
          }, {
            id: "4", // Contoh ID untuk event
            title: "Musik Spesial",
            location: "Halaman UIN Gusdur Pekalongan",
            date: "30 Desember 2024",
            time: "19:00 WIB",
            image: "https://i.pinimg.com/736x/3d/56/85/3d56856eb8c1c21ed77900c9927ef26d.jpg",
          }].map((event) => (
            <div key={event.id} className="flex items-center bg-white p-4 rounded-lg shadow-md">
              {event.image && (
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-36 h-36 rounded-lg object-cover"
                />
              )}
              <div className="ml-7 flex-1">
                <h3 className="text-lg font-semibold">{event.title}</h3>
                <div className="text-gray-500 flex items-center space-x-3 mb-7">
                  <ImLocation />
                  <span>{event.location}</span>
                </div>
                <div className="text-gray-500 flex items-center space-x-3">
                  <FaCalendar />
                  <span>{event.date}</span>
                </div>
                <div className="text-gray-500 flex items-center space-x-3">
                  <FaClock />
                  <span>{event.time}</span>
                </div>
              </div>
              <button
                onClick={() => handleDetailClick(event.id)}
                className="bg-[#00FFFF] text-black px-4 py-2 rounded-full"
              >
                Cek detail
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default StatistikPenjualanPage;
