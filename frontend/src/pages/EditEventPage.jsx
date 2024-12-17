import React, { useState, useEffect } from "react";
import { FiCheckSquare } from "react-icons/fi";
import { useParams } from "react-router-dom";
import { LuImagePlus } from "react-icons/lu";
import Sidebar from "../layout/AdminSidebar";
import EventInfoCard from "../layout/AdminBoxInfo";
import { eventApi } from "../api/eventApi";
import Swal from "sweetalert2";
import LoadingSpinner from "../component/loadingSpinner";

function EditEventPage() {
  const { eventId } = useParams();
  const [eventData, setEventData] = useState({
    name: "",
    dateTime: "",
    location: "",
    description: "",
    quota: "",
    ticketPrice: "",
    eventBy: "",
    posterUrl: "",
  });
  const [imagePreview, setImagePreview] = useState("");
  const [posterUrl, setPosterUrl] = useState(null);
  const [editLoading, setEditLoading] = useState(false);
  const [loading, setLoading] = useState(false);

  const formatDateTime = (date) => {
    const localDate = new Date(date);
    const year = localDate.getFullYear();
    const month = String(localDate.getMonth() + 1).padStart(2, "0");
    const day = String(localDate.getDate()).padStart(2, "0");
    const hours = String(localDate.getHours()).padStart(2, "0");
    const minutes = String(localDate.getMinutes()).padStart(2, "0");
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  useEffect(() => {
    const fetchEventDetail = async () => {
      setLoading(true);
      try {
        const eventDetail = await eventApi.getEventById(eventId);
        setEventData(eventDetail);
        if (eventDetail.posterUrl) {
          setImagePreview(eventDetail.posterUrl);
        }
      } catch (error) {
        console.error("Error fetching event data: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEventDetail();
  }, [eventId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPosterUrl(file);
      const previewURL = URL.createObjectURL(file);
      setImagePreview(previewURL);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setEditLoading(true);

    try {
      await eventApi.updateEvent(eventId, {
        ...eventData,
        posterUrl: posterUrl ? posterUrl : eventData.posterUrl,
      });

      Swal.fire({
        title: "Sukses!",
        text: "Acara berhasil diperbarui.",
        icon: "success",
        confirmButtonText: "OK",
        confirmButtonColor: "#3085d6",
      });
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: error.response.data.message,
        icon: "error",
        confirmButtonText: "OK",
        confirmButtonColor: "#3085d6",
      });
    } finally {
      setEditLoading(false);
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar />

      <div className="flex-1 flex flex-col p-6 bg-gray-50">
        <EventInfoCard />

        <div className="bg-white p-4 rounded-lg shadow-md flex-1 flex flex-col items-center space-y-6 overflow-y-auto">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <LoadingSpinner />
            </div>
          ) : (
            <form className="w-full max-w-lg space-y-4" onSubmit={handleSubmit}>
              <div className="flex flex-col items-center space-y-2">
                <label
                  htmlFor="posterUrl"
                  className="cursor-pointer w-64 h-64 flex items-center justify-center bg-gray-200 rounded-lg border border-gray-300 relative"
                >
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Preview Gambar"
                      className="absolute inset-0 object-cover w-full h-full rounded-lg"
                    />
                  ) : (
                    <LuImagePlus className="w-32 h-32 text-gray-500" />
                  )}
                </label>
                <input
                  type="file"
                  id="posterUrl"
                  accept="image/*"
                  className="hidden"
                  onChange={handlePhotoUpload}
                />
              </div>

              <div>
                <label className="block text-sm font-medium">Nama Acara</label>
                <input
                  name="name"
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  value={eventData.name}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="block text-sm font-medium">
                  Hari dan Tanggal
                </label>
                <input
                  type="datetime-local"
                  name="dateTime"
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  value={formatDateTime(eventData.dateTime)}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="block text-sm font-medium">Lokasi</label>
                <input
                  type="text"
                  name="location"
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  value={eventData.location}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="block text-sm font-medium">Deskripsi</label>
                <textarea
                  name="description"
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  value={eventData.description}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="block text-sm font-medium">
                  Kuota Peserta
                </label>
                <input
                  type="number"
                  name="quota"
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  value={eventData.quota}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="block text-sm font-medium">Harga Tiket</label>
                <input
                  type="number"
                  name="ticketPrice"
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  value={eventData.ticketPrice}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="block text-sm font-medium">
                  Nama Penyelenggara
                </label>
                <input
                  type="text"
                  name="eventBy"
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  value={eventData.eventBy}
                  onChange={handleChange}
                />
              </div>

              <button
                type="submit"
                className="bg-[#00FFFF] text-black px-4 py-2 rounded-lg flex items-center space-x-2 shadow-md hover:bg-[#00E6E6]"
                disabled={editLoading}
              >
                {editLoading ? (
                  <LoadingSpinner />
                ) : (
                  <>
                    <FiCheckSquare className="text-xl" />
                    <span className="font-semibold">OK</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default EditEventPage;
