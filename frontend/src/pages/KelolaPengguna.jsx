import React, { useState } from "react";
import { IoMdPeople, IoIosSearch } from "react-icons/io";
import { IoPeopleCircle } from "react-icons/io5";
import { BiSolidCalendarStar } from "react-icons/bi";
import Sidebar from "../layout/AdminSidebar";

function KelolaPenggunaPage() {
  const [search, setSearch] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [selectedPengguna, setSelectedPengguna] = useState(null);

  const handleDeleteClick = (pengguna) => {
    setSelectedPengguna(pengguna);
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
    setSelectedPengguna(null);
  };

  const handleConfirmDelete = () => {
    console.log(`Pengguna "${selectedPengguna?.name}" dihapus`);
    closePopup();
  };

  const users = [
    { name: "Muhammad Syahrul Akrom", email: "syahrulcbp@gmail.com" },
    { name: "Vella Puspitasari Wijayanti", email: "vellapuspita@gmail.com" },
    { name: "Aryo Yonatan", email: "99aryoyonatan@gmail.com" },
    { name: "Dimas Syahputra", email: "adisq87@gmail.com" },
    { name: "M Dipo Kusumo", email: "dipokusumo99@gmail.com" },
  ];

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col p-6 bg-gray-50">
        {/* Kotak Informasi */}
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
        <div className="relative w-1/3 mb-6">
          <IoIosSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full p-3 pl-10 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#00CCCC]"
          />
        </div>

        {/* Tabel Pengguna */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4 text-gray-600">
                  Nama Pengguna
                </th>
                <th className="text-left py-3 px-4 text-gray-600">Email</th>
                <th className="text-left py-3 px-4 text-gray-600">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={index} className="border-b hover:bg-gray-100">
                  <td className="py-3 px-4">{user.name}</td>
                  <td className="py-3 px-4">{user.email}</td>
                  <td className="py-3 px-4 text-red-500 cursor-pointer hover:underline">
                    <button
                      onClick={() => handleDeleteClick(user)}
                      className="text-red-500 hover:underline"
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Popup Konfirmasi */}
        {showPopup && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center space-y-4">
              <p className="text-lg font-semibold">
                Anda mau menghapus pengguna ini?
              </p>
              <div className="flex justify-center space-x-4">
                <button
                  onClick={handleConfirmDelete}
                  className="bg-cyan-300 text-black px-4 py-2 rounded-lg hover:bg-cyan-400"
                >
                  Iya
                </button>
                <button
                  onClick={closePopup}
                  className="bg-red-500 text-black px-4 py-2 rounded-lg hover:bg-red-600"
                >
                  Tidak
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default KelolaPenggunaPage;
