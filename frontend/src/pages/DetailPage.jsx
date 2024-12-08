import React from 'react';
import { FaMapMarkerAlt, FaCalendarAlt, FaClock, FaArrowLeft } from 'react-icons/fa';
import Navbar from '../layout/CustomerNavbar'; // Pastikan path file ini sesuai
import { useLocation } from 'react-router-dom'; // Import useLocation

function DetailAcara() {
  const location = useLocation();
  const event = location.state || {}; // Ambil data acara dari state

  return (
    <div className="bg-[#f0f0f0] min-h-screen flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Poster Acara */}
      <div className="relative w-full h-[50vh]">
        <img
          src={event.posterUrl}
          alt="Poster Acara"
          className="w-full h-full object-cover rounded-b-xl"
        />

        {/* Tombol Back */}
        <button
          className="absolute top-[4.5rem] left-4 bg-[#00CCCC] text-white p-2 rounded-full shadow-lg flex items-center space-x-2 hover:bg-opacity-70"
          onClick={() => window.history.back()}
        >
          <FaArrowLeft className="text-lg"  />
        </button>

        {/* Struktur dengan Judul Acara di sebelah kiri dan Lokasi, Tanggal, dan Waktu */}
        <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black to-transparent text-white">
          {/* Judul Acara di kiri */}
          <div className="text-left mb-4">
            <h1 className="text-3xl font-bold">{event.name}</h1>
          </div>

          {/* Lokasi, Tanggal, Waktu */}
          <div className="flex space-x-6">
            {/* Lokasi */}
            <div className="flex items-center space-x-2">
              <FaMapMarkerAlt className="text-xl" />
              <div>
                <p className="text-lg font-semibold">{event.location}</p>
              </div>
            </div>
            {/* Tanggal */}
            <div className="flex items-center space-x-2">
              <FaCalendarAlt className="text-xl" />
              <p className="text-sm">
                {new Date(event.dateTime).toLocaleDateString('id-ID', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </p>
            </div>
            {/* Waktu */}
            <div className="flex items-center space-x-2">
              <FaClock className="text-xl" />
              <p className="text-sm">
                {new Date(event.dateTime).toLocaleTimeString('id-ID', {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Detail Acara */}
      <div className="p-6 flex-1">
        {/* Kotak Tiket dan Penyelenggara di sebelah kiri */}
        <div className="flex mb-6 space-x-4">
          {/* Tiket Tersedia */}
          <div className="flex bg-[#00cccc] rounded-md overflow-hidden shadow-lg text-sm">
            <div className="px-2 py-1 text-gray-700 font-semibold">Tiket Tersedia</div>
            <div className="px-2 py-1 bg-[#00ffff] text-black font-bold rounded-lg">
              {event.quota}
            </div>
          </div>

          {/* Penyelenggara */}
          <div className="flex bg-[#00cccc] rounded-md overflow-hidden shadow-lg text-sm">
            <div className="px-2 py-1 text-gray-700 font-semibold">Penyelenggara</div>
            <div className="px-2 py-1 bg-[#00ffff] text-gray-900 font-bold rounded-lg">
              {event.eventBy}
            </div>
          </div>
        </div>

        {/* Deskripsi Acara */}
        <div className="flex mb-6">
          <div className="flex-1">
            <p className="text-lg font-semibold">Deskripsi Acara</p>
            <p className="text-sm text-gray-700">{event.description}</p>
          </div>

          {/* Harga Tiket dan Tombol Beli */}
          <div className="w-1/3 bg-white p-4 rounded-md shadow-lg ml-4 flex flex-col">
            <div className="flex justify-between w-full">
              <p className="text-sm font-semibold text-gray-600">Mulai dari</p>
              <p className="text-sm font-semibold text-gray-900">
                Rp {event.ticketPrice.toLocaleString()}
              </p>
            </div>
            <button className="bg-[#00FFFF] text-black px-4 py-2 rounded-md shadow-lg hover:bg-teal-400 text-sm font-semibold w-full mt-4">
              Beli Tiket
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailAcara;
