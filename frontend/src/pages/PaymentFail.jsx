import React from "react";
import { IoCloseSharp } from "react-icons/io5";

const PaymentFail = () => {

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      {/* Icon */}
      <div className="w-20 h-20 flex items-center justify-center bg-red-500 rounded-full mb-4">
        <IoCloseSharp className="text-white text-4xl" />
      </div>

      {/* Teks */}
      <p className="text-lg font-bold mb-2">Pembayaran Gagal</p>
      <p className="text-sm text-gray-600 mb-6">
        Mohon coba lagi
      </p>

      {/* Tombol Back */}
      <button
        className="px-6 py-2 border border-gray-400 text-gray-700 font-medium rounded-lg hover:bg-gray-100 transition"
      >
        Kembali ke Dashboard
      </button>
    </div>
  );
};

export default PaymentFail;
