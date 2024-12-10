import React, { useState, useEffect } from 'react';
import { FaSortDown, FaHeart } from 'react-icons/fa';
import Navbar from '../layout/CustomerNavbar'; // Pastikan path file ini sesuai
import axios from 'axios'; // Impor axios untuk HTTP requests
import { useNavigate } from 'react-router-dom'; // Import useNavigate untuk navigasi

function EventPage() {
  const [showSortOptions, setShowSortOptions] = useState(false);
  const [selectedOption, setSelectedOption] = useState('Pilih');
  const [events, setEvents] = useState([]);
  const [sortedEvents, setSortedEvents] = useState([]);
  const [likedEvents, setLikedEvents] = useState({});
  const navigate = useNavigate(); // Inisialisasi navigate

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setShowSortOptions(false);

    let sortedData = [...events];
    if (option === 'Lokasi') {
      sortedData.sort((a, b) => a.location.localeCompare(b.location));
    } else if (option === 'Tanggal') {
      sortedData.sort((a, b) => new Date(a.dateTime) - new Date(b.dateTime));
    }

    setSortedEvents(sortedData);
  };

  const toggleLike = (eventId) => {
    setLikedEvents((prev) => ({
      ...prev,
      [eventId]: !prev[eventId],
    }));
  };

  const handleBuyTicket = (event) => {
    // Arahkan ke halaman detail dengan data acara
    console.log(event);
    navigate(`/detail/${event._id}`, { state: event });
  };

  useEffect(() => {
    axios
      .get('http://localhost:8080/api/events')
      .then((response) => {
        console.log(response.data);
        if (response.data.success) {
          setEvents(response.data.data);
          setSortedEvents(response.data.data); // Inisialisasi sortedEvents dengan data asli
        }
      })
      .catch((error) => {
        console.error('Error fetching events:', error);
      });
  }, []);

  return (
    <div className="bg-[#f0f0f0] min-h-screen">
      {/* Navbar */}
      <Navbar />

      <div className="p-6">
        {/* Heading */}
        <div className="mb-6 ml-8">
          <h1 className="text-2xl font-semibold">Jelajahi berbagai konser dan</h1>
          <h1 className="text-2xl font-semibold">acara menarik disini</h1>
        </div>

        
        <div className="bg-[#00CCCC] p-6 rounded-xl max-h-[500px] overflow-y-auto scrollbar-hidden">
          
          <div className="relative mb-4 flex justify-center">
            <button
              className="flex items-center bg-white text-black px-3 py-1.5 rounded-xl shadow hover:bg-gray-200"
              onClick={() => setShowSortOptions(!showSortOptions)}
            >
              <span className="font-semibold mr-2 text-sm">Urutkan: {selectedOption}</span>
              <FaSortDown />
            </button>
            {showSortOptions && (
              <div className="absolute top-full mt-2 bg-white shadow-lg rounded-md w-32">
                <button
                  className="block px-3 py-1 w-full text-left text-sm hover:bg-gray-100"
                  onClick={() => handleOptionClick('Lokasi')}
                >
                  Lokasi
                </button>
                <button
                  className="block px-3 py-1 w-full text-left text-sm hover:bg-gray-100"
                  onClick={() => handleOptionClick('Tanggal')}
                >
                  Tanggal
                </button>
              </div>
            )}
          </div>

          {/* Daftar Acara */}
          {sortedEvents.map((event) => (
            <div key={event._id} className="flex space-x-4 mb-4">
              {/* Kotak kiri */}
              <div className="w-1/3 bg-white h-28 rounded-xl shadow-lg flex">
                <div className="w-1/2 bg-gray-200 rounded-l-xl flex items-center justify-center">
                  <img
                    src={event.posterUrl}
                    alt="Foto Acara"
                    className="w-full h-full object-cover rounded-l-xl"
                  />
                </div>
                <div className="w-1/2 p-3 flex flex-col justify-center">
                  <p className="text-sm font-bold whitespace-pre-wrap">
                    {new Date(event.dateTime)
                      .toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })
                      .replace(/ /g, '\n')}
                  </p>
                  <p className="text-xs font-medium text-gray-600">
                    {new Date(event.dateTime).toLocaleTimeString('id-ID', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
              </div>

              {/* Kotak kanan */}
              <div className="w-2/3 bg-white h-28 rounded-xl shadow-lg flex">
                <div className="p-3 w-3/4">
                  <p className="text-lg font-bold">{event.name}</p>
                  <p className="text-sm text-gray-700 mb-2">{event.location}</p>
                  <p className="text-sm font-semibold text-[#00FFFF]">
                    Rp {event.ticketPrice.toLocaleString()}
                  </p>
                  <FaHeart
                    className={`cursor-pointer ml-[520px] ${
                      likedEvents[event._id] ? 'text-red-500' : 'text-gray-400'
                    }`}
                    onClick={() => toggleLike(event._id)}
                  />
                </div>
                <button
                  className="bg-[#00FFFF] text-black w-1/4 h-full rounded-r-xl hover:bg-teal-400 text-sm"
                  onClick={() => handleBuyTicket(event)}
                >
                  Beli Tiket
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default EventPage;
