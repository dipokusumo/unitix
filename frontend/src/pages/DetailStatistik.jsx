import React from "react";
import { useNavigate } from "react-router-dom";
import { IoMdPeople } from "react-icons/io";
import { IoPeopleCircle } from "react-icons/io5";
import { BiSolidCalendarStar } from "react-icons/bi";
import { ImLocation } from "react-icons/im";
import { FaClock, FaCalendar } from "react-icons/fa";
import Sidebar from "../layout/AdminSidebar";

function DetailStatistik() {

  const navigate = useNavigate();  
  
  const handleViewActivity = () => {
    navigate("/statistik-penjualan/${statistikId}/aktivitas");
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col p-6 space-y-6">
        {/* Kotak informasi */}
        <div className="bg-[#00CCCC] p-6 rounded-lg shadow-md">
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

        {/* Detail Event */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-4">
          <div className="flex justify-between items-center">
            {/* Gambar dan Informasi Acara */}
            <div className="flex space-x-6">
              <img
                src="https://i.pinimg.com/736x/3d/56/85/3d56856eb8c1c21ed77900c9927ef26d.jpg"
                alt="Ariel Music"
                className="w-40 h-40 rounded-lg object-cover"
              />
              <div>
                <h2 className="text-xl font-bold">Ariel Music</h2>
                <div className="text-gray-500 space-y-2 mt-3">
                  <div className="flex items-center space-x-2">
                    <ImLocation />
                    <span>Alun-alun Kota Semarang</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <FaCalendar />
                    <span>18 Desember 2024</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <FaClock />
                    <span>09:00 WIB</span>
                  </div>
                </div>
              </div>
            </div>
            {/* Tombol */}
            <button className="bg-[#00FFFF] text-black px-6 py-2 rounded-full" onClick={handleViewActivity}>
              lihat aktivitas
            </button>
          </div>
        </div>

        {/* Statistik */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="grid grid-cols-2 gap-4 mt-1">
            <div className="p-8">
              <h3 className="text-lg">Pesanan</h3>
              <p className="text-2xl font-bold">108</p>
            </div>
            <div className="p-8">
              <h3 className="text-lg">Pendapatan</h3>
              <p className="text-2xl font-bold">Rp 2.000.000</p>
            </div>
            <div className="p-8">
              <h3 className="text-lg">Total Pengunjung</h3>
              <p className="text-2xl font-bold">160</p>
            </div>
          </div>
        </div>

        {/* Grafik Penjualan Tiket */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold">Grafik Penjualan Tiket</h3>
          <div className="mt-6">
            {/* Placeholder untuk Grafik */}
            <img
              src="https://via.placeholder.com/500x200?text=Grafik+Penjualan+Tiket"
              alt="Grafik Penjualan"
              className="w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailStatistik;
