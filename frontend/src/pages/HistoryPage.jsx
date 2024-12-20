import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaChevronDown, FaRedoAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import Navbar from "../layout/CustomerNavbar";
import { transactionApi } from "../api/transactionApi";
import LoadingSpinner from "../component/loadingSpinner";
import Footer from "../layout/Footer";

const HistoryPage = () => {
  const [visibleDetails, setVisibleDetails] = useState({});
  const [transactions, setTransactions] = useState([]);
  const [loadingStatus, setLoadingStatus] = useState({});
  const [loading, setLoading] = useState(false);

  const toggleDetail = (id) => {
    setVisibleDetails((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const fetchTransactionHistory = async () => {
    setLoading(true);
    try {
      const response = await transactionApi.getTransactionHistory();
      setTransactions(response.history);
    } catch (error) {
      console.error("Failed to fetch transaction history:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchTransactionStatus = async (transactionId) => {
    setLoadingStatus((prev) => ({ ...prev, [transactionId]: true }));
    try {
      const response = await transactionApi.midtransStatusCallback(
        transactionId
      );
      const updatedTransactions = transactions.map((t) =>
        t.transactionId === transactionId
          ? { ...t, status: response.transaction.paymentStatus }
          : t
      );
      setTransactions(updatedTransactions);

      toast.success(
        `Status sekarang: ${response.transaction.paymentStatus.toUpperCase()}`,
        {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
        }
      );
      window.location.reload();
    } catch (error) {
      const errorMessage = error.response?.data?.message;

      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
      });
    } finally {
      setLoadingStatus((prev) => ({ ...prev, [transactionId]: false }));
    }
  };

  useEffect(() => {
    fetchTransactionHistory();
  }, []);

  const renderStatus = (status, transactionId) => {
    let colorClass = "bg-gray-300 text-gray-700";
    if (status === "completed") colorClass = "bg-green-200 text-green-700";
    if (status === "failed") colorClass = "bg-red-200 text-red-700";
    if (status === "waiting pay")
      colorClass = "bg-gray-300 text-gray-700 font-semibold";

    return (
      <div className="space-y-2">
        <div
          className={`px-4 py-1 rounded-full ${colorClass} inline-flex items-center`}
        >
          {status.toUpperCase()}
          {status === "waiting pay" && (
            <button
              onClick={() => fetchTransactionStatus(transactionId)}
              className="ml-3 text-blue-500 hover:text-blue-700 flex items-center"
              disabled={loadingStatus[transactionId]}
            >
              {loadingStatus[transactionId] ? (
                <LoadingSpinner />
              ) : (
                <FaRedoAlt size={14} />
              )}
            </button>
          )}
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="flex flex-col bg-[#f0f0f0] min-h-screen">
      <Navbar />
      <div className="max-w-5xl mx-auto p-4 md:p-6">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Riwayat Transaksi Tiket
        </h1>

        {/* Transaksi */}
        {transactions.length === 0 ? (
          // Menampilkan pesan jika tidak ada transaksi
          <div className="flex flex-col items-center justify-center bg-white p-8 rounded-lg shadow-md text-center">
            <h2 className="text-lg font-bold text-gray-800 mb-2">
              Tidak ada riwayat transaksi
            </h2>
            <p className="text-sm text-gray-600 mb-6">
              Anda belum melakukan transaksi apa pun. Silakan lakukan pembelian
              tiket terlebih dahulu.
            </p>
            <Link
              to="/event"
              className="px-6 py-2 bg-[#00CCCC] text-white rounded-lg hover:bg-[#00FFFF]"
            >
              Jelajahi Acara
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {transactions.map((transaction) => (
              <div
                key={transaction.transactionId}
                className="bg-white rounded-lg shadow-md"
              >
                {/* Header Section */}
                <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                  {/* Gambar Acara */}
                  <div className="h-32 md:h-40">
                    <img
                      src={transaction.event.posterUrl}
                      alt={transaction.event.name}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>

                  {/* Detail Acara */}
                  <div className="space-y-2 text-center md:text-left">
                    <h2 className="text-lg font-bold text-gray-800">
                      {transaction.event.name}
                    </h2>
                    <p className="text-sm text-gray-600">
                      {transaction.event.location}
                    </p>
                    <p className="text-sm text-gray-600">
                      {new Date(transaction.event.dateTime).toLocaleDateString(
                        "id-ID",
                        { day: "numeric", month: "long", year: "numeric" }
                      )}
                    </p>
                  </div>

                  {/* Status */}
                  <div className="text-center space-y-2">
                    {renderStatus(
                      transaction.paymentStatus,
                      transaction.transactionId,
                      transaction.paymentLink
                    )}
                    <button
                      className="flex items-center justify-center text-sm text-blue-500 hover:underline mx-auto"
                      onClick={() => toggleDetail(transaction.transactionId)}
                    >
                      <span>Lihat Detail</span>
                      <FaChevronDown className="ml-1" />
                    </button>
                  </div>
                </div>

                {/* Detail Section */}
                {visibleDetails[transaction.transactionId] && (
                  <div className="p-4 bg-gray-50 border-t">
                    <div className="space-y-2">
                      {/* Jumlah Tiket & Total Bayar */}
                      <p>
                        <span className="font-semibold text-gray-700">
                          Jumlah Tiket:
                        </span>{" "}
                        {transaction.quantity}
                      </p>
                      <p>
                        <span className="font-semibold text-gray-700">
                          Total Bayar:
                        </span>{" "}
                        Rp {transaction.amount}.00
                      </p>

                      {/* Metode Pembayaran / Button Bayar */}
                      <p>
                        {transaction.paymentStatus === "waiting pay" ? (
                          <a
                            href={transaction.paymentLink}
                            className="block text-center bg-[#00CCCC] hover:bg-[#009999] text-white font-bold py-2 px-4 rounded"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Bayar Sekarang
                          </a>
                        ) : (
                          <span className="font-semibold text-gray-700">
                            Metode Pembayaran:{" "}
                            {transaction.paymentMethod.toUpperCase()}
                          </span>
                        )}
                      </p>

                      {/* Detail Tiket (Hanya jika status completed) */}
                      {transaction.paymentStatus === "completed" &&
                      transaction.ticketDetails
                        ? transaction.ticketDetails.map((ticket, index) => (
                            <div
                              key={index}
                              className="p-3 bg-white shadow rounded flex justify-between items-center"
                            >
                              <p className="text-sm font-medium">
                                Kode Tiket: {ticket.ticketCode}
                              </p>
                              <img
                                src={ticket.qrCode}
                                alt={`QR Code for ${ticket.ticketCode}`}
                                className="w-16 h-16 object-contain"
                              />
                            </div>
                          ))
                        : null}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default HistoryPage;
