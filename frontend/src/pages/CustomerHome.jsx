import React from 'react';
import { Tailwind } from 'tailwindcss-react';
import { FaTicketSimple, FaHeart } from "react-icons/fa6";
import { MdDateRange } from "react-icons/md";
import Navbar from "../layout/CustomerNavbar"; // Import Navbar

const CustomerHome = () => {
  return (
    <div className="container mx-auto bg-gray-100">
      <div className="flex justify-between items-center py-4 px-6">
        <h1 className="text-3xl font-bold text-blue-700">Dashboard</h1>
        <div className="flex space-x-4">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Cari Acara
          </button>
          <div className="relative">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-700 hover:text-blue-500 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11H.oss931375661496063L9 17l6-6z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a2 2 0 0 1-2-2h-1a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1V11z" />
            </svg>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 mt-8">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-blue-700">Total Tiket</h2>
          <p className="text-gray-700">3</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-blue-700">Acara Mendatang</h2>
          <p className="text-gray-700">4</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-blue-700">Jumlah yang Dibelanjakan</h2>
          <p className="text-gray-700">Rp. 350.000,00</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-blue-700">Acara Tersimpan</h2>
          <p className="text-gray-700">1</p>
        </div>
      </div>

      <h2 className="text-2xl font-bold mt-8 text-blue-700">Acara Mendatang</h2>
      <div className="grid grid-cols-2 gap-4 mt-4">
        
        <div className="bg-white p-4 rounded-lg shadow-md">
          <img src="https://via.placeholder.com/150" alt="Ariel Music" className="w-full h-40 object-cover rounded-lg" />
          <h3 className="text-xl font-bold mt-2 text-blue-700">Ariel Music</h3>
          <p className="text-gray-700">Alun-alun Kota Semarang</p>
          <p className="text-gray-700">10 Desember 2024</p>
          <p className="text-gray-700">09.00 WIB</p>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2">
            Beli Tiket
          </button>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md">
          <img src="https://via.placeholder.com/150" alt="Music Event" className="w-full h-40 object-cover rounded-lg" />
          <h3 className="text-xl font-bold mt-2 text-blue-700">Music Event</h3>
          <p className="text-gray-700">Tenis Indor Senayan</p>
          <p className="text-gray-700">20 Oktober 2024</p>
          <p className="text-gray-700">09.00 WIB</p>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2">
            Beli Tiket
          </button>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md">
          <img src="https://via.placeholder.com/150" alt="Hellocalize" className="w-full h-40 object-cover rounded-lg" />
          <h3 className="text-xl font-bold mt-2 text-blue-700">Hellocalize</h3>
          <p className="text-gray-700">Gor PGRI Semarang</p>
          <p className="text-gray-700">19 Desember 2024</p>
          <p className="text-gray-700">09.00 WIB</p>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2">
            Beli Tiket
          </button>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md">
          <img src="https://via.placeholder.com/150" alt="Seminar Nasional" className="w-full h-40 object-cover rounded-lg" />
          <h3 className="text-xl font-bold mt-2 text-blue-700">Seminar Nasional</h3>
          <p className="text-gray-700">Universitas Indonesia</p>
          <p className="text-gray-700">19 Desember 2024</p>
          <p className="text-gray-700">09.00 WIB</p>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2">
            Beli Tiket
          </button>
        </div>
        
    </div>

        <h2 className="text-2xl font-bold mt-8 text-blue-700">Rekomendasi Acara</h2>
        <div className="grid grid-cols-3 gap-4 mt-4">
            {/* Card rekomendasi acara pertama */}
            <div className="bg-white p-4 rounded-lg shadow-md">
            <img src="https://via.placeholder.com/150" alt="Denny Caknan" className="w-full h-40 object-cover rounded-lg" />
            <h3 className="text-xl font-bold mt-2 text-blue-700">Denny Caknan</h3>
            <p className="text-gray-700">Universitas Brawijaya</p>
            <p className="text-gray-700">24 Januari 2025</p>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2">
                Beli Tiket
            </button>
            </div>
            {/* Card rekomendasi acara kedua */}
            <div className="bg-white p-4 rounded-lg shadow-md">
            <img src="https://via.placeholder.com/150" alt="Bruno Mars" className="w-full h-40 object-cover rounded-lg" />
            <h3 className="text-xl font-bold mt-2 text-blue-700">Bruno Mars</h3>
            <p className="text-gray-700">Gelora Bung Karno</p>
            <p className="text-gray-700">16 Januari 2025</p>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2">
                Beli Tiket
            </button>
            </div>
            {/* Card rekomendasi acara ketiga */}
            <div className="bg-white p-4 rounded-lg shadow-md">
            <img src="https://via.placeholder.com/150" alt="Freedom of Nggamoleh" className="w-full h-40 object-cover rounded-lg" />
            <h3 className="text-xl font-bold mt-2 text-blue-700">Freedom of Nggamoleh</h3>
            <p className="text-gray-700">Lapangan Triad</p>
            <p className="text-gray-700">13 Maret 2025</p>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2">
                Beli Tiket
            </button>
            </div>
        </div>

    </div>
  );
};

export default CustomerHome;