import React, { useState, useEffect } from "react";
import { ImLocation } from "react-icons/im";
import { FaCalendar } from "react-icons/fa";
import { useParams } from "react-router-dom";
import Sidebar from "../layout/AdminSidebar";
import EventInfoCard from "../layout/AdminBoxInfo";
import { eventApi } from "../api/eventApi";
import LoadingSpinner from "../component/loadingSpinner";

function DetailStatistik() {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEventDetail = async () => {
      try {
        setLoading(true);
        const eventDetail = await eventApi.getEventById(eventId);
        setEvent(eventDetail);

        const summaryDetail = await eventApi.summary(eventId);
        setSummary(summaryDetail);
      } catch (error) {
        console.error("Error fetching event data: ", error);
        setSummary(null);
      } finally {
        setLoading(false);
      }
    };

    fetchEventDetail();
  }, [eventId]);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col p-6 bg-gray-50">
        {/* Kotak informasi */}
        <EventInfoCard />

        {/* Detail Event */}
        <div className="bg-white p-4 rounded-lg shadow-md flex-1">
          {loading || !event ? (
            <div className="flex justify-center items-center h-64">
              <LoadingSpinner />
            </div>
          ) : (
            <div className="flex items-center bg-gray-100 p-4 rounded-lg shadow-md">
              {/* Gambar dan Informasi Acara */}
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
            </div>
          )}
        </div>

        {/* Statistik */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          {loading || !summary ? (
            <div className="grid grid-cols-2 gap-4">
              <div className="p-8">
                <h3 className="text-lg">Pesanan</h3>
                <p className="text-2xl font-bold">0</p>
              </div>
              <div className="p-8">
                <h3 className="text-lg">Pendapatan</h3>
                <p className="text-2xl font-bold">Rp 0.00</p>
              </div>
              <div className="p-8">
                <h3 className="text-lg">Tiket Terjual</h3>
                <p className="text-2xl font-bold">0</p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              <div className="p-8">
                <h3 className="text-lg">Pesanan</h3>
                <p className="text-2xl font-bold">{summary[0]?.totalTransactions || 0}</p>
              </div>
              <div className="p-8">
                <h3 className="text-lg">Pendapatan</h3>
                <p className="text-2xl font-bold">Rp {summary[0]?.totalRevenue || 0}.00</p>
              </div>
              <div className="p-8">
                <h3 className="text-lg">Tiket Terjual</h3>
                <p className="text-2xl font-bold">{summary[0]?.totalTickets || 0}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DetailStatistik;