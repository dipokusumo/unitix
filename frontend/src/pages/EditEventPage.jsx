import React, { useState } from "react";
import { IoMdPeople } from "react-icons/io";
import { IoPeopleCircle } from "react-icons/io5";
import { BiSolidCalendarStar } from "react-icons/bi";
import { FiCheckSquare } from "react-icons/fi";
import { LuImagePlus } from "react-icons/lu";
import Sidebar from "../layout/AdminSidebar";

function EditEventPage() {
  const [showPopup, setShowPopup] = useState(false); // State untuk mengontrol pop-up

  const handleSubmit = (e) => {
    e.preventDefault(); // Mencegah reload halaman
    setShowPopup(true); // Tampilkan pop-up
  };

  const closePopup = () => {
    setShowPopup(false); // Sembunyikan pop-up
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

        <div className="bg-white p-4 rounded-lg shadow-md flex-1 flex flex-col items-center justify-center space-y-6">
          <form className="w-full max-w-max space-y-4" onSubmit={handleSubmit}>
            <div className="flex items-start ">
              <label className="cursor-pointer w-64 h-64 flex items-center justify-center bg-gray-200 rounded-lg border border-gray-300">
                <LuImagePlus className="w-32 h-32" />
              </label>
              <input />

              {/* Tombol OK Simpan Acara */}
              <button
                type="submit"
                className="bg-[#00FFFF] text-black px-4 py-2 rounded-lg flex items-center space-x-2 shadow-md hover:bg-[#00E6E6]"
              >
                <FiCheckSquare className="text-xl" />
                <span className="font-semibold">OK</span>
              </button>
            </div>

            <div>
              <label className="block text-sm font-medium">Nama Acara</label>
              <input className="w-full p-3 border border-gray-300 rounded-lg" />
            </div>

            <div>
              <label className="block text-sm font-medium">
                Hari dan Tanggal
              </label>
              <input
                type="date"
                name="date"
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Lokasi</label>
              <input
                type="text"
                name="location"
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Deskripsi</label>
              <textarea
                name="description"
                className="w-full p-3 border border-gray-300 rounded-lg"
              ></textarea>
            </div>

            <div>
              <label className="block text-sm font-medium">Kuota Peserta</label>
              <input
                type="number"
                name="quota"
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Harga Tiket</label>
              <input
                type="number"
                name="price"
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">
                Nama Penyelenggara
              </label>
              <input
                type="text"
                name="eventBy"
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
            </div>
          </form>
        </div>
        {showPopup && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center space-y-4">
              <FiCheckSquare className="text-4xl text-green-500 mx-auto" />
              <p className="text-lg font-semibold">
                Acara telah berhasil diperbarui!
              </p>
              <button
                onClick={closePopup}
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
              >
                Lanjut
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default EditEventPage;
