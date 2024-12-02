import React from "react";
import { FaTicketSimple, FaHeart } from "react-icons/fa6";
import { MdDateRange } from "react-icons/md";
import Navbar from "../layout/CustomerNavbar"; // Import Navbar

function MainPage() {
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="p-6 space-y-8">
        {/* Stat Boxes */}
        <section className="grid grid-cols-4 gap-6">
          <div className="bg-[#00CCCC] p-4 rounded-lg shadow-md flex items-center">
            <FaTicketSimple className="text-black text-3xl mr-4" />
            <div>
              <h3 className="text-gray-600 text-sm">Total Tickets</h3>
              <p className="text-2xl font-semibold text-gray-800">150</p>
            </div>
          </div>
          <div className="bg-[#00CCCC] p-4 rounded-lg shadow-md flex items-center">
            <MdDateRange className="text-black text-3xl mr-4" />
            <div>
              <h3 className="text-gray-600 text-sm">Upcoming Events</h3>
              <p className="text-2xl font-semibold text-gray-800">5</p>
            </div>
          </div>
          <div className="bg-[#00CCCC] p-4 rounded-lg shadow-md flex items-center">
           
            <div>
              <h3 className="text-gray-600 text-sm">Amount Spent</h3>
              <p className="text-2xl font-semibold text-gray-800">$1200</p>
            </div>
          </div>
          <div className="bg-[#00CCCC] p-4 rounded-lg shadow-md flex items-center">
            <FaHeart className="text-black text-3xl mr-4" />
            <div>
              <h3 className="text-gray-600 text-sm">Saved Items</h3>
              <p className="text-2xl font-semibold text-gray-800">12</p>
            </div>
          </div>
        </section>

        {/* Upcoming Concert Section */}
        <section>
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Upcoming Concerts
          </h2>
          <div className="space-y-4">
            {[{ name: "Concert A", date: "2024-12-15", image: "concert-a.jpg" }, { name: "Concert B", date: "2024-12-20", image: "concert-b.jpg" }].map(
              (concert, index) => (
                <div
                  key={index}
                  className="bg-white p-4 rounded-lg shadow-md flex items-center space-x-4"
                >
                  <img
                    src={concert.image}
                    alt={concert.name}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="text-gray-700 font-semibold">
                      {concert.name}
                    </h3>
                    <p className="text-gray-500 text-sm">Date: {concert.date}</p>
                  </div>
                  <button className="bg-[#00CCCC] text-black px-4 py-2 rounded-lg hover:bg-[#00FFFF] transition">
                    Download Ticket
                  </button>
                </div>
              )
            )}
          </div>
        </section>

        {/* Recommended Events Section (Horizontal Scroll) */}
        <section>
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Recommended Events
          </h2>
          <div className="flex space-x-4 overflow-x-auto scrollbar-hide">
            {[{ name: "Event A", location: "Venue 1" }, { name: "Event B", location: "Venue 2" }, { name: "Event C", location: "Venue 3" }].map(
              (event, index) => (
                <div
                  key={index}
                  className="min-w-[200px] bg-white p-4 rounded-lg shadow-md flex-shrink-0"
                >
                  <h3 className="text-gray-700 font-semibold">{event.name}</h3>
                  <p className="text-gray-500 text-sm">Location: {event.location}</p>
                </div>
              )
            )}
          </div>
        </section>

        {/* Transaction History Section */}
        <section>
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Transaction History
          </h2>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-200">
                  <th className="p-2 text-left text-gray-600">Date</th>
                  <th className="p-2 text-left text-gray-600">Event</th>
                  <th className="p-2 text-left text-gray-600">Price</th>
                  <th className="p-2 text-left text-gray-600">Status</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { date: "2024-12-01", event: "Event A", price: "$100", status: "Paid" },
                  { date: "2024-11-28", event: "Event B", price: "$80", status: "Pending" },
                ].map((transaction, index) => (
                  <tr key={index} className="border-b">
                    <td className="p-2">{transaction.date}</td>
                    <td className="p-2">{transaction.event}</td>
                    <td className="p-2">{transaction.price}</td>
                    <td
                      className={`p-2 ${
                        transaction.status === "Paid"
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {transaction.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}

export default MainPage;
