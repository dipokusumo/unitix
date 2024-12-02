import React, { useState } from 'react';
import { IoMdPeople } from 'react-icons/io';
import { BiSolidCalendarStar } from 'react-icons/bi';
import { FaPlus } from 'react-icons/fa';
import { IoPeopleCircle } from "react-icons/io5";
import Sidebar from '../layout/AdminSidebar';

function DashboardPage() {
  const [search, setSearch] = useState('');

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
          {/* Form Kosong */}
          <input
            type="text"
            placeholder="Form Kosong"
            className="w-1/4 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Tombol "Buat Acara Baru" */}
          <button className="flex items-center bg-[#00CCCC] text-black p-3 rounded-lg hover:bg-[#00FFFF] space-x-2">
            <FaPlus />
            <span>Buat Acara Baru</span>
          </button>

          {/* Form Pencarian di Ujung Kanan */}
          <input
            type="text"
            placeholder="Cari sesuatu..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-1/4 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ml-auto"
          />
        </div>

        {/* Kotak besar yang bisa discroll */}
        <div className="bg-white p-4 rounded-lg shadow-md flex-1 overflow-y-auto">
          <h2 className="text-lg font-semibold mb-4">Konten List</h2>
          <div className="space-y-6">
            <div className="bg-gray-100 p-8 rounded-lg min-h-[150px]">
              <h3 className="text-xl">Item 1</h3>
              <p>Deskripsi item 1...</p>
            </div>
            <div className="bg-gray-100 p-8 rounded-lg min-h-[150px]">
              <h3 className="text-xl">Item 2</h3>
              <p>Deskripsi item 2...</p>
            </div>
            <div className="bg-gray-100 p-8 rounded-lg min-h-[150px]">
              <h3 className="text-xl">Item 3</h3>
              <p>Deskripsi item 3...</p>
            </div>
            <div className="bg-gray-100 p-8 rounded-lg min-h-[150px]">
              <h3 className="text-xl">Item 4</h3>
              <p>Deskripsi item 4...</p>
            </div>
            <div className="bg-gray-100 p-8 rounded-lg min-h-[150px]">
              <h3 className="text-xl">Item 5</h3>
              <p>Deskripsi item 5...</p>
            </div>
            {/* Tambahkan item lainnya sesuai kebutuhan */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
