import React, { useEffect, useState } from "react";
import { IoMdPeople } from "react-icons/io";
import { BiSolidCalendarStar } from "react-icons/bi";
import { BsTicket } from "react-icons/bs";
import { userApi } from "../api/userApi";

const EventInfoCard = () => {
  const [info, setInfo] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const adminBoxInfoResponse = await userApi.getAdminBoxInfo();
        setInfo(adminBoxInfoResponse);
      } catch (error) {
        console.error("Failed to fetch data for event info card:", error);
        setInfo(null);
      }
    };

    fetchData();
  }, []);

  return (
    info && (
      <div className="bg-[#00CCCC] p-6 rounded-lg shadow-md mb-6">
        <div className="grid grid-cols-3 gap-6 text-center">
          <div className="flex items-center justify-center space-x-4">
            <IoMdPeople className="text-6xl text-black" />
            <div>
              <h3 className="text-lg font-semibold">Total Customer</h3>
              <p className="text-3xl font-bold">{info.totalCustomers}</p>
            </div>
          </div>
          <div className="flex items-center justify-center space-x-4">
            <BsTicket className="text-6xl text-black" />
            <div>
              <h3 className="text-lg font-semibold">Ticket Sold</h3>
              <p className="text-3xl font-bold">{info.totalTickets}</p>
            </div>
          </div>
          <div className="flex items-center justify-center space-x-4">
            <BiSolidCalendarStar className="text-6xl text-black" />
            <div>
              <h3 className="text-lg font-semibold">Total Event</h3>
              <p className="text-3xl font-bold">{info.totalEvents}</p>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default EventInfoCard;
