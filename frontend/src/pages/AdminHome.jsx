import React, { useState } from "react";
import { IoMdPeople } from "react-icons/io";
import { BiSolidCalendarStar } from "react-icons/bi";
import { FaPlus } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { MdDateRange } from "react-icons/md";
import { BsTicketPerforatedFill } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import { IoPeopleCircle } from "react-icons/io5";
import { FiCheckSquare } from "react-icons/fi";
import Sidebar from "../layout/AdminSidebar";
import { useNavigate } from "react-router-dom";

function DashboardPage() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const handleDeleteClick = (event) => {
    setSelectedEvent(event);
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
    setSelectedEvent(null);
  };

  const handleConfirmDelete = () => {
    console.log(`Acara "${selectedEvent?.name}" dihapus`);
    closePopup();
    setShowSuccessPopup(true);
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

        {/* Form Pencarian, Form Kosong dan Tombol */}
        <div className="flex w-full mb-6 items-center justify-between">
          {/* Tombol "Buat Acara Baru" */}
          <button
            onClick={() => navigate("/create-event")}
            className="flex items-center bg-[#00CCCC] text-black p-3 rounded-lg hover:bg-[#00FFFF] space-x-2"
          >
            <FaPlus />
            <span>Buat Acara Baru</span>
          </button>

          {/* Form Pencarian di Ujung Kanan */}
          <div className="relative w-1/4 ml-auto">
            {/* Ikon Search */}
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />

            {/* Input */}
            <input
              type="text"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Kotak besar yang bisa discroll */}
        <div className="bg-white p-4 rounded-lg shadow-md flex-1 overflow-y-auto">
          <div className="space-y-6">
            <div className="flex items-center bg-gray-100 p-4 rounded-lg shadow-md">
              <img
                src="https://i.pinimg.com/736x/3d/56/85/3d56856eb8c1c21ed77900c9927ef26d.jpg"
                alt="Event"
                className="w-32 h-32 rounded-lg object-cover"
              />
              <div className="ml-4 flex-1">
                <h3 className="text-lg font-semibold">Ariel Musik</h3>
                <div className="flex items-center text-gray-600">
                  <MdDateRange className="mr-2" />
                  <span>25 Des 2024</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <BsTicketPerforatedFill className="mr-2" />
                  <span>70 Ticket Tersedia</span>
                </div>
                <p className="text-green-600 font-semibold flex items-center">
                  Rp 50.000
                </p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => navigate("/edit-event/:eventId")}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center"
                >
                  <FaEdit className="mr-2" />
                  Edit
                </button>
                <button
                  onClick={() =>
                    handleDeleteClick({ id: 1, name: "Ariel Musik" })
                  }
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 flex items-center"
                >
                  <MdDelete className="mr-2" />
                  Hapus Acara
                </button>
              </div>
            </div>

            <div className="flex items-center bg-gray-100 p-4 rounded-lg shadow-md">
              <img
                src="https://i.pinimg.com/736x/18/14/ed/1814ed542120118f8e52b09f0fec9343.jpg"
                alt="Event"
                className="w-32 h-32 rounded-lg object-cover"
              />
              <div className="ml-4 flex-1">
                <h3 className="text-lg font-semibold">Bruno Mars</h3>
                <div className="flex items-center text-gray-600">
                  <MdDateRange className="mr-2" />
                  <span>12 Sept 2024</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <BsTicketPerforatedFill className="mr-2" />
                  <span>100 Ticket Tersedia</span>
                </div>
                <p className="text-green-600 font-semibold flex items-center">
                  Rp 1.000.000
                </p>
              </div>
              <div className="flex space-x-2">
                <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center">
                  <FaEdit className="mr-2" />
                  Edit
                </button>
                <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 flex items-center">
                  <MdDelete className="mr-2" />
                  Hapus Acara
                </button>
              </div>
            </div>

            <div className="flex items-center bg-gray-100 p-4 rounded-lg shadow-md">
              <img
                src="https://i.pinimg.com/736x/7c/5c/94/7c5c941a44e16d60d360c4f79d41f474.jpg"
                alt="Event"
                className="w-32 h-32 rounded-lg object-cover"
              />
              <div className="ml-4 flex-1">
                <h3 className="text-lg font-semibold">Seminar Nasional</h3>
                <div className="flex items-center text-gray-600">
                  <MdDateRange className="mr-2" />
                  <span>16 Des 2024</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <BsTicketPerforatedFill className="mr-2" />
                  <span>30 Ticket Tersedia</span>
                </div>
                <p className="text-green-600 font-semibold flex items-center">
                  Rp 30.000
                </p>
              </div>
              <div className="flex space-x-2">
                <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center">
                  <FaEdit className="mr-2" />
                  Edit
                </button>
                <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 flex items-center">
                  <MdDelete className="mr-2" />
                  Hapus Acara
                </button>
              </div>
            </div>
            {/* Tambahkan item lainnya sesuai kebutuhan */}
          </div>
        </div>
        {showPopup && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center space-y-4">
              <p className="text-lg font-semibold">
                Apakah Anda yakin ingin menghapus acara {selectedEvent?.name}?
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
        {showSuccessPopup && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center space-y-4">
              <FiCheckSquare className="text-4xl text-green-500 mx-auto" />
              <p className="text-lg font-semibold">
                Acara telah berhasil dihapus
              </p>
              <button
                onClick={() => setShowSuccessPopup(false)}
                className="bg-green-500 text-black px-4 py-2 rounded-lg hover:bg-green-600"
              >
                Oke
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default DashboardPage;
