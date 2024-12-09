import React from "react";
import { FaArrowLeft, FaHeart } from "react-icons/fa"; // Ikon panah kembali dan hati
import { useNavigate } from "react-router-dom";

const ConfirmationPage = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-[#f0f0f0] min-h-screen flex flex-col">
      {/* Headbar */}
      <header className="bg-white shadow-md py-4 px-6 flex items-center space-x-4">
        <button
          className="bg-[#00FFFF] p-2 rounded-full hover:bg-teal-400 text-white"
        >
          <FaArrowLeft />
        </button>
        <div>
          <h1 className="text-2xl font-bold">Konfirmasi Pesanan</h1>
          <p className="text-sm text-gray-500 mt-1">
            Pastikan data yang diisi dibawah ini benar, karena e-ticket akan
            dikirim ke alamat email sesuai data yang anda masukkan.
          </p>
        </div>
      </header>

      {/* Section Ticket */}
      <section className="p-6">
        <div className="bg-[#f0f0f0] rounded-xl flex space-x-4">
          {/* Kotak Kiri */}
          <div className="w-1/3 bg-white h-28 rounded-xl shadow-lg flex">
            <div className="w-1/2 bg-gray-200 rounded-l-xl flex items-center justify-center">
              <img
                src="https://gudeg.net/cni-content/uploads/modules/agenda/20171220035445.jpg" // Gambar placeholder
                alt="Foto Acara"
                className="w-full h-full object-cover rounded-l-xl"
              />
            </div>
            <div className="w-1/2 p-3 flex flex-col justify-center">
              <p className="text-sm font-bold whitespace-pre-wrap">
                10 Desember 2024
              </p>
              <p className="text-xs font-medium text-gray-600">
                19:00 WIB
              </p>
            </div>
          </div>

          {/* Kotak Kanan */}
          <div className="w-2/3 bg-white h-28 rounded-xl shadow-lg flex">
            <div className="p-3 w-3/4">
              <p className="text-lg font-bold">Konser Musik 2024</p>
              <p className="text-sm text-gray-700 mb-2">Jakarta Convention Center</p>
              <p className="text-sm font-semibold text-[#00FFFF]">
                Rp 150.000
              </p>
            </div>
          </div>
        </div>
      </section>

      <hr className="border-t-2 border-gray-300 mx-6" /> {/* Pembatas Garis Horizontal */}

      {/* Section Formulir */}
      <section className="p-6">
        <div className="bg-[#f0f0f0] p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-4">Formulir</h2>
          <form className="flex flex-col space-y-4">
            {/* Nama Lengkap */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Nama Lengkap
              </label>
              <input
                id="name"
                type="text"
                placeholder="Masukkan nama lengkap"
                className="w-full border px-4 py-2 rounded-lg outline-none focus:ring-2 focus:ring-[#00FFFF]"
              />
            </div>
            {/* Alamat Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Alamat Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="Masukkan alamat email"
                className="w-full border px-4 py-2 rounded-lg outline-none focus:ring-2 focus:ring-[#00FFFF]"
              />
            </div>
          </form>
        </div>
      </section>

      <hr className="border-t-2 border-gray-300 mx-6" /> {/* Pembatas Garis Horizontal */}

      {/* Section Ringkasan Tiketmu */}
      <section className="p-6">
        <div className="bg-white p-4 rounded-lg shadow-md space-y-2">
          <h2 className="text-lg font-semibold">Ringkasan Tiketmu</h2>
          <div className="text-sm text-gray-700">
            <p>Nama Tiket: Konser Musik 2024</p>
            <p>Harga Tiket: Rp 150.000</p>
            <p>Nama Lengkap: John Doe</p>
            <p>Alamat Email: john.doe@example.com</p>
          </div>
        </div>
      </section>

      <hr className="border-t-2 border-gray-300 mx-6" /> {/* Pembatas Garis Horizontal */}

      {/* Tombol Beli Tiket */}
      <section className="p-6">
        <button
          className="bg-[#00FFFF] text-black w-full py-3 rounded-lg font-semibold hover:bg-teal-400"
        >
          Lanjutkan Pembayaran
        </button>
      </section>
    </div>
  );
};

export default ConfirmationPage;
