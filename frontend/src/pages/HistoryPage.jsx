import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import Navbar from "../layout/CustomerNavbar";

const HistoryPage = () => {
  const [visibleDetails, setVisibleDetails] = useState({});

  const toggleDetail = (id) => {
    setVisibleDetails((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const events = [
    {
        id: 1,
        name: "Konser Musik 2024",
        location: "Jakarta Convention Center",
        dateTime: "2024-12-10T19:00:00",
        price: "Rp 150.000",
        userName: "John Doe",
        email: "johndoe@example.com",
        ticketId: "TK123456",
        paymentDate: "2024-12-01",
        paymentStatus: "Berhasil",
        paymentId: "PM987654",
    },
    {
        id: 2,
        name: "Festival Film",
        location: "Cinema XXI",
        dateTime: "2024-11-15T18:30:00",
        price: "Rp 75.000",
        userName: "Jane Smith",
        email: "janesmith@example.com",
        ticketId: "TK654321",
        paymentDate: "2024-11-10",
        paymentStatus: "Berhasil",
        paymentId: "PM876543",
    },
    {
        id: 3,
        name: "Pameran Teknologi",
        location: "Expo Center",
        dateTime: "2024-09-20T10:00:00",
        price: "Rp 50.000",
        userName: "Alice Johnson",
        email: "alicejohnson@example.com",
        ticketId: "TK789012",
        paymentDate: "2024-09-18",
        paymentStatus: "Berhasil",
        paymentId: "PM345678",
    },
    {
        id: 4,
        name: "Turnamen Esports",
        location: "Gaming Arena",
        dateTime: "2024-10-05T15:00:00",
        price: "Rp 100.000",
        userName: "Bob Brown",
        email: "bobbrown@example.com",
        ticketId: "TK012345",
        paymentDate: "2024-10-03",
        paymentStatus: "Berhasil",
        paymentId: "PM567890",
    },
    {
        id: 5,
        name: "Konser Jazz",
        location: "Outdoor Stage",
        dateTime: "2024-12-25T20:00:00",
        price: "Rp 200.000",
        userName: "Eve Davis",
        email: "evedavis@example.com",
        ticketId: "TK567890",
        paymentDate: "2024-12-20",
        paymentStatus: "Berhasil",
        paymentId: "PM234567",
    },
  ];

  const isEventEnded = (dateTime) => {
    const now = new Date();
    return new Date(dateTime) < now;
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <Navbar />

      {/* Content */}
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Daftar Tiket</h1>

        {/* Scrollable Tickets */}
        <div className="space-y-16 overflow-y-auto max-h-[600px] scrollbar-hidden">
          {events.map((event) => (
            <div key={event.id} className="bg-gray-100 rounded-xl flex space-x-4 relative pb-10">
              {/* Kotak Kiri */}
              <div className="w-1/3 bg-white h-36 rounded-xl shadow-lg flex">
                <div className="w-1/2 bg-gray-200 rounded-l-xl flex items-center justify-center">
                  <img
                    src="https://gudeg.net/cni-content/uploads/modules/agenda/20171220035445.jpg"
                    alt="Foto Acara"
                    className="w-full h-full object-cover rounded-l-xl"
                  />
                </div>
                <div className="w-1/2 p-3 flex flex-col justify-center">
                  <p className="text-sm font-bold whitespace-pre-wrap">
                    {new Date(event.dateTime).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                  <p className="text-xs font-medium text-gray-600">
                    {new Date(event.dateTime).toLocaleTimeString("id-ID", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>

              {/* Kotak Kanan */}
              <div className="w-2/3 bg-white h-36 rounded-xl shadow-lg flex flex-col relative">
                <div className="p-3 flex flex-col justify-between">
                  <p className="text-lg font-bold">{event.name}</p>
                  <p className="text-sm text-gray-700 mb-2">{event.location}</p>
                  <p className="text-sm font-semibold text-[#00FFFF]">{event.price}</p>
                </div>

                {/* Detail & Status */}
                <div className="absolute bottom-3 right-3 flex items-center space-x-2">
                  <button
                    className="flex items-center text-gray-700 font-medium hover:text-gray-500"
                    onClick={() => toggleDetail(event.id)}
                  >
                    <span>Detail</span>
                    <FaChevronDown />
                  </button>
                  <span
                    className={`text-white text-xs font-medium px-2 py-1 rounded ${
                      isEventEnded(event.dateTime) ? "bg-red-500" : "bg-green-500"
                    }`}
                  >
                    {isEventEnded(event.dateTime) ? "Berakhir" : "Berlangsung"}
                  </span>
                </div>

                {/* Kotak Detail */}
                {visibleDetails[event.id] && (
                  <div className="transition-all duration-300 ease-in-out absolute w-full bg-gray-50 border-t border-gray-200 p-3 left-0 top-full shadow-lg rounded-xl">
                    <div className="grid grid-cols-2 gap-4">
                      {/* Kolom Kiri */}
                      <div className="text-xs space-y-1">
                        <div className="flex">
                          <span className="w-28 text-gray-700">Nama</span>
                          <span className="text-gray-700">: {event.userName}</span>
                        </div>
                        <div className="flex">
                          <span className="w-28 text-gray-700">Email</span>
                          <span className="text-gray-700">: {event.email}</span>
                        </div>
                        <div className="flex">
                          <span className="w-28 text-gray-700">ID Ticket</span>
                          <span className="text-gray-700">: {event.ticketId}</span>
                        </div>
                      </div>
                      {/* Kolom Kanan */}
                      <div className="text-xs space-y-1">
                        <div className="flex">
                          <span className="w-28 text-gray-700">Tanggal Pembayaran</span>
                          <span className="text-gray-700">
                            :{" "}
                            {new Date(event.paymentDate).toLocaleDateString("id-ID", {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            })}
                          </span>
                        </div>
                        <div className="flex">
                          <span className="w-28 text-gray-700">Status Pembayaran</span>
                          <span className="text-gray-700">: {event.paymentStatus}</span>
                        </div>
                        <div className="flex">
                          <span className="w-28 text-gray-700">ID Pembayaran</span>
                          <span className="text-gray-700">: {event.paymentId}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HistoryPage;
