import React, { useState, useEffect } from "react";
import { ImLocation } from "react-icons/im";
import { FaCalendar } from "react-icons/fa";
import Sidebar from "../layout/AdminSidebar";
import EventInfoCard from "../layout/AdminBoxInfo";
import { useNavigate } from "react-router-dom";
import { eventApi } from "../api/eventApi";

function StatistikPenjualanPage() {
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

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col p-6 bg-gray-50">
        {/* Kotak informasi */}
        <EventInfoCard />

        {/* List Event */}
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
                  <ImLocation className="mr-2" />
                  <span>{event.location}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <FaCalendar className="mr-2" />
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
              </div>
              <button
                onClick={() => navigate(`/admin/statistik-penjualan/${event._id}`)}
                className="bg-[#00FFFF] text-black px-4 py-2 rounded-full"
              >
                Cek Detail
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default StatistikPenjualanPage;
