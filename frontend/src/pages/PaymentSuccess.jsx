import React from "react";
import { IoCheckmarkDoneSharp } from "react-icons/io5";

const PaymentSuccess = () => {

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      {/* Icon */}
      <div className="w-20 h-20 flex items-center justify-center bg-green-500 rounded-full mb-4">
        <IoCheckmarkDoneSharp className="text-white text-4xl" />
      </div>

      {/* Teks */}
      <p className="text-lg font-bold mb-2">Pembayaran Berhasil</p>
      <p className="text-sm text-gray-600 mb-6">
        Terima kasih telah menggunakan layanan Unitix
      </p>
    </div>
  );
};

export default PaymentSuccess;
