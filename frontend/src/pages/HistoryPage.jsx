import React, { useEffect, useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import Navbar from "../layout/CustomerNavbar";
import { transactionApi } from "../api/transactionApi";

const HistoryPage = () => {
  const [visibleDetails, setVisibleDetails] = useState({});
  const [transactions, setTransactions] = useState([]);
  const [statusDetails, setStatusDetails] = useState({});
  const [loadingStatus, setLoadingStatus] = useState({});

  const toggleDetail = (id) => {
    setVisibleDetails((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const fetchTransactionHistory = async () => {
    try {
      const response = await transactionApi.getTransactionHistory();
      setTransactions(response.history);
    } catch (error) {
      console.error("Failed to fetch transaction history:", error);
    }
  };

  const fetchTransactionStatus = async (transactionId) => {
    try {
      setLoadingStatus((prev) => ({ ...prev, [transactionId]: true }));
      const statusResponse = await transactionApi.midtransStatusCallback(transactionId);
      setStatusDetails((prev) => ({
        ...prev,
        [transactionId]: statusResponse, // Simpan hasil callback di state
      }));
    } catch (error) {
      console.error("Failed to fetch transaction status:", error);
      setStatusDetails((prev) => ({
        ...prev,
        [transactionId]: "Error fetching status",
      }));
    } finally {
      setLoadingStatus((prev) => ({ ...prev, [transactionId]: false }));
    }
  };

  useEffect(() => {
    fetchTransactionHistory();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-5xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">Riwayat Transaksi Tiket</h1>

        <div className="space-y-8 overflow-y-auto max-h-[600px] scrollbar-hidden">
          {transactions.map((transaction) => (
            <div
              key={transaction.transactionId}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              {/* Header Section */}
              <div className="p-4 flex justify-between items-center bg-gray-50">
                <div>
                  <h2 className="text-lg font-semibold">{transaction.event.name}</h2>
                  <p className="text-sm text-gray-600">
                    {new Date(transaction.event.dateTime).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}{" "}
                    -{" "}
                    {new Date(transaction.event.dateTime).toLocaleTimeString("id-ID", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>

                <div className="flex items-center space-x-3">
                  {/* Tombol Detail */}
                  <button
                    className="text-gray-700 flex items-center text-sm hover:text-gray-500"
                    onClick={() => toggleDetail(transaction.transactionId)}
                  >
                    <span>Detail</span>
                    <FaChevronDown className="ml-1" />
                  </button>

                  {/* Tombol Status */}
                  <button
                    className="text-blue-500 text-sm hover:underline"
                    onClick={() => fetchTransactionStatus(transaction.transactionId)}
                  >
                    {loadingStatus[transaction.transactionId] ? "Memuat..." : "Cek Status"}
                  </button>
                </div>
              </div>

              {/* Main Content */}
              {visibleDetails[transaction.transactionId] && (
                <div className="p-4 bg-gray-50 border-t border-gray-200 transition-all duration-300">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm">
                        <span className="font-semibold text-gray-700">Jumlah Tiket:</span>{" "}
                        {transaction.quantity}
                      </p>
                      <p className="text-sm">
                        <span className="font-semibold text-gray-700">Metode Pembayaran:</span>{" "}
                        {transaction.paymentMethod}
                      </p>
                      <p className="text-sm">
                        <span className="font-semibold text-gray-700">Status:</span>{" "}
                        {transaction.paymentStatus}
                      </p>
                    </div>

                    {/* Kode Tiket */}
                    <div>
                      <p className="font-semibold text-gray-700 mb-2">Tiket:</p>
                      <div className="grid grid-cols-2 gap-2">
                        {transaction.ticketDetails.map((ticket, index) => (
                          <div
                            key={index}
                            className="p-2 bg-white shadow rounded border border-gray-200"
                          >
                            <p className="text-sm">
                              <span className="font-medium text-gray-700">Kode Tiket:</span>{" "}
                              {ticket.ticketCode}
                            </p>
                            <p className="text-sm">
                              <span className="font-medium text-gray-700">QR Code:</span>{" "}
                              {ticket.qrCode}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Status Pembayaran */}
                  {statusDetails[transaction.transactionId] && (
                    <div className="mt-4 p-3 bg-green-100 text-green-800 rounded">
                      <p className="text-sm">
                        <span className="font-semibold">Status Pembayaran:</span>{" "}
                        {statusDetails[transaction.transactionId]}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HistoryPage;