import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaClock,
  FaArrowLeft,
} from "react-icons/fa";
import { eventApi } from "../api/eventApi";
import Navbar from "../layout/CustomerNavbar";
import { transactionApi } from "../api/transactionApi";
import { toast } from "react-toastify";

function EventDetailPage() {
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const { id } = useParams();
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEventDetail = async () => {
      try {
        setLoading(true);
        const eventDetail = await eventApi.getEventById(id);
        setEvent(eventDetail);
      } catch (err) {
        setError(err.message);
        setEvent(null);
      } finally {
        setLoading(false);
      }
    };

    fetchEventDetail();
  }, [id]);

  useEffect(() => {
    if (event && quantity) {
      const total = event.ticketPrice * quantity;
      setTotalPrice(total);
    }
  }, [event, quantity]);

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (value > 0 && value <= event.quota) {
      setQuantity(value);
    }
  };

  const handleBuyTicket = async () => {
    if (!token) {
      toast.warn("Anda harus login terlebih dahulu untuk membeli.", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
      });
      return;
    }
  
    try {
      const eventId = event._id;
      const response = await transactionApi.initiateTransaction(eventId, quantity);
  
      if (!response.success || !response.data || !response.data.transaction.paymentLink) {
        throw new Error("Failed to create transaction. Please try again.");
      }
  
      const paymentLink = response.data.transaction.paymentLink;
  
      // Buka tab baru ke URL pembayaran Midtrans
      window.open(paymentLink, "_blank");
  
      // Redirect ke halaman history setelah proses pembayaran dimulai
      navigate("/history");
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!event) return <p>Event not found</p>;

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
          className="absolute top-8 left-4 bg-[#00CCCC] text-white p-2 rounded-full shadow-lg flex items-center space-x-2 hover:bg-opacity-70"
          onClick={() => navigate(-1)}
        >
          <FaArrowLeft className="text-lg" />
        </button>

        {/* Struktur dengan Judul Acara di sebelah kiri dan Lokasi, Tanggal, dan Waktu */}
        <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black to-transparent text-white">
          <h1 className="text-3xl font-bold mb-4">{event.name}</h1>

          <div className="flex space-x-8">
            <div className="flex items-center space-x-2">
              <FaMapMarkerAlt className="text-xl" />
              <p className="text-lg font-semibold">{event.location}</p>
            </div>
            <div className="flex items-center space-x-2">
              <FaCalendarAlt className="text-xl" />
              <p className="text-sm">
                {new Date(event.dateTime).toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <FaClock className="text-xl" />
              <p className="text-sm">
                {new Date(event.dateTime).toLocaleTimeString("id-ID", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Detail Acara */}
      <div className="p-6 flex-1">
        {/* Tiket dan Penyelenggara */}
        <div className="flex mb-6 space-x-4 mt-4">
          <div className="flex bg-[#00cccc] rounded-md overflow-hidden shadow-lg text-sm">
            <div className="px-2 py-1 text-gray-700 font-semibold">
              Tiket Tersedia
            </div>
            <div className="px-2 py-1 bg-[#00ffff] text-black font-bold rounded-lg">
              {event.quota}
            </div>
          </div>

          <div className="flex bg-[#00cccc] rounded-md overflow-hidden shadow-lg text-sm">
            <div className="px-2 py-1 text-gray-700 font-semibold">
              Penyelenggara
            </div>
            <div className="px-2 py-1 bg-[#00ffff] text-gray-900 font-bold rounded-lg">
              {event.eventBy}
            </div>
          </div>
        </div>

        {/* Deskripsi Acara */}
        <div className="flex mt-4 space-x-6">
          <div className="flex-1">
            <p className="text-lg font-semibold mb-4">Deskripsi Acara</p>
            <p className="text-sm text-gray-700">{event.description}</p>
          </div>

          {/* Kolom Pembelian Tiket */}
          <div className="w-1/4 bg-white p-4 rounded-md shadow-lg ml-6 flex flex-col">
            <div className="flex justify-between mb-4">
              <p className="text-sm font-semibold text-gray-600">Harga</p>
              <p className="text-sm font-semibold text-gray-900">
                Rp {totalPrice}
              </p>
            </div>

            {/* Input untuk memilih jumlah tiket */}
            <div className="flex items-center justify-between mb-2">
              <label
                htmlFor="quantity"
                className="text-sm font-semibold text-gray-600 w-[30%]"
              >
                Jumlah Tiket
              </label>
              <input
                id="quantity"
                type="number"
                value={quantity}
                onChange={handleQuantityChange}
                min="1"
                max={event.quota}
                className="border rounded-md p-2 text-center"
              />
            </div>

            {/* Tombol Beli Tiket */}
            <button
              className="bg-[#00FFFF] text-black px-4 py-3 rounded-md shadow-lg hover:bg-teal-400 text-base font-semibold w-full"
              onClick={handleBuyTicket}
            >
              Beli Tiket
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventDetailPage;
