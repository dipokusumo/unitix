import React, { useState, useEffect } from "react";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import { transactionApi } from "../api/transactionApi";
import LoadingSpinner from "../component/loadingSpinner";

const PaymentSuccess = () => {
  const { transactionId } = useParams();
  const navigate = useNavigate();

  const [transactionDetails, setTransactionDetails] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTransactionDetails = async () => {
      try {
        setLoading(true);
        const statusResponse = await transactionApi.midtransStatusCallback(transactionId);
        setTransactionDetails(statusResponse.transaction);
      } catch (error) {
        console.error("Error fetching transaction details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactionDetails();
  }, [transactionId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner />
      </div>
    );
  }

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

      {/* Info Transaksi */}
      {transactionDetails && (
        <div className="text-sm text-gray-600 mb-6">
          <p>Total: Rp {transactionDetails.amount}.00</p>
        </div>
      )}

      {/* Tombol Back */}
      <button
        onClick={() => navigate("/")}
        className="px-6 py-2 border border-gray-400 text-gray-700 font-medium rounded-lg hover:bg-gray-100 transition"
      >
        Kembali ke Dashboard
      </button>
    </div>
  );
};

export default PaymentSuccess;
