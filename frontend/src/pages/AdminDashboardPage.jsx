import React, { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import Sidebar from "../layout/AdminSidebar";
import EventInfoCard from "../layout/AdminBoxInfo";
import { eventApi } from "../api/eventApi";
import { MdDelete, MdDateRange } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { BsTicketPerforatedFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const AdminDashboardPage = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const eventsAdminResponse = await eventApi.getAllAdmin();
        setEvents(eventsAdminResponse);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  const handleDeleteClick = (event) => {
    Swal.fire({
      title: `Hapus acara ${event.name}?`,
      text: "Tindakan ini tidak dapat diurungkan.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Ya, Hapus!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await eventApi.deleteEvent(event._id);
          Swal.fire({
            title: "Terhapus!",
            text: `Acara ${event.name} telah dihapus.`,
            icon: "success",
            confirmButtonText: "OK",
            confirmButtonColor: "#3085d6",
          }).then(() => {
            window.location.reload();
          });
        } catch (error) {
          Swal.fire({
            title: "Gagal",
            text: error.response.data.message,
            icon: "error",
            confirmButtonText: "OK",
            confirmButtonColor: "#3085d6",
          });
        }
      }
    });
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col p-6 bg-gray-50">
        {/* Kotak informasi */}
        <EventInfoCard />

        {/* Tombol dan daftar acara */}
        <div className="flex w-full mb-6 items-center justify-between">
          <button
            onClick={() => navigate("/admin/create-event")}
            className="flex items-center bg-[#00CCCC] text-black p-3 rounded-lg hover:bg-[#00FFFF] space-x-2"
          >
            <FaPlus />
            <span>Buat Acara Baru</span>
          </button>
        </div>

        {/* Daftar acara */}
        <div className="bg-white p-4 rounded-lg shadow-md flex-1 overflow-y-auto">
          {events.map((event) => (
            <div
              key={event._id}
              className="flex items-center bg-gray-100 p-4 rounded-lg shadow-md mb-4"
            >
              <img
                src={event.posterUrl}
                alt={event.name}
                className="w-32 h-32 rounded-lg object-cover"
              />
              <div className="ml-4 flex-1">
                <h3 className="text-lg font-semibold">{event.name}</h3>
                <div className="flex items-center text-gray-600">
                  <MdDateRange className="mr-2" />
                  <span>
                    {new Date(event.dateTime)
                      .toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })
                      .replace(/ /g, "\n")}
                    {" - "}
                    {new Date(event.dateTime).toLocaleTimeString("id-ID", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                    {" WIB"}
                  </span>
                </div>
                <div className="flex items-center text-gray-600">
                  <BsTicketPerforatedFill className="mr-2" />
                  {event.quota === 0 ? (
                    <span className="text-red-500 font-semibold">
                      Tiket Habis Terjual
                    </span>
                  ) : (
                    <span>{event.quota} Tiket Tersedia</span>
                  )}
                </div>
                <p className="text-green-600 font-semibold flex items-center">
                  Rp {event.ticketPrice}
                </p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => navigate(`/admin/edit-event/${event._id}`)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center"
                >
                  <FaEdit className="mr-2" />
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteClick(event)} // Kirim seluruh objek event
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 flex items-center"
                >
                  <MdDelete className="mr-2" />
                  Hapus
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
