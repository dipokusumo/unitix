import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaTicketSimple } from "react-icons/fa6";
import { MdDateRange, MdMoney } from "react-icons/md";
import Navbar from "../layout/CustomerNavbar";
import { eventApi } from "../api/eventApi";
import { userApi } from "../api/userApi";
import LoadingSpinner from "../component/loadingSpinner";

function DashboardPage() {
  const [userInfo, setUserInfo] = useState(null);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [recommendedEvents, setRecommendedEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  const navigate = useNavigate();

  const handleEventDetail = (eventId) => {
    navigate(`/event-detail/${eventId}`);
  };

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);

        if (token) {
          try {
            const userBoxInfoResponse = await userApi.getUserBoxInfo(token);
            setUserInfo(userBoxInfoResponse);
          } catch (error) {
            console.error("Error fetching user box info:", error);
            setUserInfo(null);
          }
        }

        const upcomingResponse = await eventApi.getUpcomingEvents();
        setUpcomingEvents(upcomingResponse);

        const recommendedResponse = await eventApi.getRecommendedEvents();
        setRecommendedEvents(recommendedResponse);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [token]);

  return (
    <div className="bg-[#f0f0f0] min-h-screen">
      <Navbar />

      {/* Loading Spinner */}
      {loading && (
        <div className="flex justify-center items-center h-64">
          <LoadingSpinner />
        </div>
      )}

      {/* Content */}
      {!loading && (
        <main className="p-6">
          {token && userInfo && (
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-screen-xl mx-auto">
              <div className="bg-[#00CCCC] p-4 rounded-lg shadow-md flex items-center">
                <FaTicketSimple className="text-black text-3xl mr-4" />
                <div>
                  <h3 className="text-gray-600 text-sm">Total Tickets</h3>
                  <p className="text-2xl font-semibold text-gray-800">
                    {userInfo.totalTickets}
                  </p>
                </div>
              </div>
              <div className="bg-[#00CCCC] p-4 rounded-lg shadow-md flex items-center">
                <MdDateRange className="text-black text-3xl mr-4" />
                <div>
                  <h3 className="text-gray-600 text-sm">
                    Transaction Completed
                  </h3>
                  <p className="text-2xl font-semibold text-gray-800">
                    {userInfo.completedTransactions}
                  </p>
                </div>
              </div>
              <div className="bg-[#00CCCC] p-4 rounded-lg shadow-md flex items-center">
                <MdMoney className="text-black text-3xl mr-4" />
                <div>
                  <h3 className="text-gray-600 text-sm">Amount Spent</h3>
                  <p className="text-2xl font-semibold text-gray-800">
                    Rp {userInfo.totalAmount}.00
                  </p>
                </div>
              </div>
            </section>
          )}

          <section className="py-10 max-w-screen-xl mx-auto">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
              Upcoming Events
            </h2>
            <div className="space-y-6">
              {upcomingEvents?.length > 0 ? (
                upcomingEvents.map((event) => {
                  const eventDate = new Date(event.dateTime);
                  const formattedDate = eventDate.toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  });
                  const formattedTime = eventDate.toLocaleTimeString("id-ID", {
                    hour: "2-digit",
                    minute: "2-digit",
                    timeZoneName: "short",
                  });

                  return (
                    <div
                      key={event._id}
                      className="bg-white rounded-lg shadow-lg p-6 flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-6 hover:scale-105 hover:shadow-xl transform transition-all duration-300 ease-in-out"
                    >
                      <img
                        src={event.posterUrl}
                        alt={event.name}
                        className="w-24 h-24 rounded-lg object-cover"
                      />
                      <div className="flex-1 text-center md:text-left">
                        <h3 className="text-xl font-semibold text-gray-800">
                          {event.name}
                        </h3>
                        <p className="text-gray-600">{event.location}</p>
                        <p className="text-gray-600">{formattedDate}</p>
                        <p className="text-gray-600">{formattedTime}</p>
                      </div>
                      <button
                        onClick={() => handleEventDetail(event._id)}
                        className="px-5 py-3 bg-[#00CCCC] text-white font-semibold rounded-lg hover:bg-[#00FFFF] transition duration-300"
                      >
                        Lihat Detail Acara
                      </button>
                    </div>
                  );
                })
              ) : (
                <p className="text-gray-500 text-center">
                  No upcoming events found.
                </p>
              )}
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
              Rekomendasi Acara
            </h2>
            <div className="flex flex-wrap gap-6 justify-center">
              {recommendedEvents?.length > 0 ? (
                recommendedEvents.map((event) => (
                  <div
                    key={event._id}
                    className="w-full sm:w-80 bg-white rounded-lg shadow-lg hover:scale-105 transform transition-all duration-300 ease-in-out"
                  >
                    <img
                      src={event.posterUrl}
                      alt={event.name}
                      className="w-full h-52 object-cover rounded-t-lg"
                    />
                    <div className="p-4 space-y-3 text-center">
                      <h3 className="text-xl font-semibold text-gray-800">
                        {event.name}
                      </h3>
                      <p className="text-gray-600">{event.location}</p>
                      <div className="text-gray-600">
                        <p>
                          {new Date(event.dateTime).toLocaleDateString(
                            "id-ID",
                            {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            }
                          )}
                        </p>
                        <p>
                          {new Date(event.dateTime).toLocaleTimeString(
                            "id-ID",
                            {
                              hour: "2-digit",
                              minute: "2-digit",
                            }
                          )}{" "}
                          WIB
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleEventDetail(event._id)}
                      className="w-full py-3 text-center text-lg font-semibold bg-[#00CCCC] text-white rounded-b-lg hover:bg-[#00FFFF] transition duration-200 ease-in-out"
                    >
                      Lihat Detail Acara
                    </button>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center w-full">
                  Tidak ada rekomendasi acara.
                </p>
              )}
            </div>
          </section>
        </main>
      )}
    </div>
  );
}

export default DashboardPage;
