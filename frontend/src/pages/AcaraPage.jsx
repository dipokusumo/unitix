import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../layout/CustomerNavbar";
import { eventApi } from "../api/eventApi";
import LoadingSpinner from "../component/loadingSpinner";

function EventPage() {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [filters, setFilters] = useState({ location: "", date: "" });
  const [availableLocations, setAvailableLocations] = useState([]);
  const [availableDates, setAvailableDates] = useState([]);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [loading, setLoading] = useState(true);

  const { state } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allEvents = await eventApi.getAll();

        setEvents(allEvents);
        if (state?.searchResults) {
          setFilteredEvents(state.searchResults);
          setIsSearchActive(true);
        } else {
          setFilteredEvents(allEvents);
        }

        const locations = [
          ...new Set(allEvents.map((event) => event.location)),
        ];
        setAvailableLocations(locations);

        const dates = [
          ...new Set(
            allEvents.map(
              (event) => new Date(event.dateTime).toISOString().split("T")[0]
            )
          ),
        ];
        setAvailableDates(dates);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [state]);

  useEffect(() => {
    const applyFilters = () => {
      let filtered = state?.searchResults || events;

      if (filters.location) {
        filtered = filtered.filter(
          (event) => event.location === filters.location
        );
      }

      if (filters.date) {
        filtered = filtered.filter((event) => {
          const eventDate = new Date(event.dateTime)
            .toISOString()
            .split("T")[0];
          return eventDate === filters.date;
        });
      }

      setFilteredEvents(filtered);
    };

    applyFilters();
  }, [filters, events, state]);

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleResetSearch = () => {
    setFilteredEvents(events);
    setIsSearchActive(false);
  };

  const handleResetFilters = () => {
    setFilters({ location: "", date: "" });
    setFilteredEvents(events);
  };

  const handleEventDetail = (eventId) => {
    navigate(`/event-detail/${eventId}`);
  };

  return (
    <div className="bg-[#f0f0f0] min-h-screen">
      <Navbar />
      <div className="p-6">
        {/* Filters Section */}
        <div className="mb-6 flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h1 className="text-xl md:text-2xl font-semibold text-center md:text-left">
              Jelajahi berbagai konser dan acara menarik disini
            </h1>
          </div>

          <div className="relative w-full md:w-96">
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-lg font-semibold mb-4">Filter Event</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label
                    className="block text-sm font-medium text-gray-700"
                    htmlFor="location"
                  >
                    Lokasi
                  </label>
                  <select
                    id="location"
                    name="location"
                    value={filters.location}
                    onChange={handleFilterChange}
                    className="block w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                  >
                    <option value="">Semua Lokasi</option>
                    {availableLocations.map((location, index) => (
                      <option key={index} value={location}>
                        {location}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    className="block text-sm font-medium text-gray-700"
                    htmlFor="date"
                  >
                    Tanggal
                  </label>
                  <select
                    id="date"
                    name="date"
                    value={filters.date}
                    onChange={handleFilterChange}
                    className="block w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                  >
                    <option value="">Semua Tanggal</option>
                    {availableDates.map((date, index) => (
                      <option key={index} value={date}>
                        {new Date(date).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="absolute top-5 right-6 flex space-x-2">
                <button
                  onClick={handleResetFilters}
                  className="px-4 py-2 bg-gray-300 rounded-md text-sm hover:bg-gray-400"
                >
                  Reset Filter
                </button>
                {isSearchActive ? (
                  <button
                    onClick={handleResetSearch}
                    className="px-4 py-2 bg-gray-300 rounded-md text-sm hover:bg-gray-400"
                  >
                    Reset Search
                  </button>
                ) : null}
              </div>
            </div>
          </div>
        </div>

        {/* Event List Section */}
        <div className="bg-[#00CCCC] p-6 rounded-xl max-h-[600px] overflow-y-auto scrollbar-hidden">
          {/* Loading Spinner */}
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <LoadingSpinner />
            </div>
          ) : filteredEvents.length > 0 ? (
            filteredEvents.map((event) => (
              <div
                key={event._id}
                className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-4"
              >
                {/* Left Box */}
                <div className="w-full sm:w-1/3 bg-white h-40 sm:h-28 rounded-xl shadow-lg flex mb-4 sm:mb-0">
                  <div className="w-full sm:w-1/2 bg-gray-200 rounded-l-xl flex items-center justify-center">
                    <img
                      src={event.posterUrl}
                      alt="Foto Acara"
                      className="w-full h-full object-cover rounded-l-xl"
                    />
                  </div>
                  <div className="w-full sm:w-1/2 p-3 flex flex-col justify-center">
                    <p className="text-sm font-bold whitespace-pre-wrap">
                      {new Date(event.dateTime)
                        .toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })
                        .replace(/ /g, "\n")}
                    </p>
                    <p className="text-xs font-medium text-gray-600">
                      {new Date(event.dateTime).toLocaleTimeString("id-ID", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>

                {/* Right Box */}
                <div className="w-full sm:w-2/3 bg-white h-40 sm:h-28 rounded-xl shadow-lg flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-0">
                  <div className="p-3 w-full sm:w-3/4">
                    <p className="text-lg font-bold text-center sm:text-left">
                      {event.name}
                    </p>
                    <p className="text-sm text-gray-700 mb-2 text-center sm:text-left">
                      {event.location}
                    </p>
                    <p className="text-sm font-semibold text-[#00CCCC] text-center sm:text-left">
                      Rp {event.ticketPrice}.00
                    </p>
                  </div>
                  <button
                    className="bg-[#00DDDD] text-white font-semibold w-full sm:w-1/4 h-full rounded-r-xl hover:bg-[#00FFFF] transition duration-300 mt-4 sm:mt-0"
                    onClick={() => handleEventDetail(event._id)}
                  >
                    Lihat Detail Acara
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-600">Tidak ada acara ditemukan.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default EventPage;
