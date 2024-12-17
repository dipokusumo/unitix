import React, { useState } from "react";
import { FiCheckSquare } from "react-icons/fi";
import { LuImagePlus } from "react-icons/lu";
import Swal from "sweetalert2";
import Sidebar from "../layout/AdminSidebar";
import { eventApi } from "../api/eventApi";
import EventInfoCard from "../layout/AdminBoxInfo";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../component/loadingSpinner";

function CreateEventPage() {
  const [eventData, setEventData] = useState({
    name: "",
    dateTime: "",
    location: "",
    description: "",
    quota: "",
    ticketPrice: "",
    eventBy: "",
  });
  const [imagePreview, setImagePreview] = useState("");
  const [posterUrl, setposterUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setposterUrl(file);
      const previewURL = URL.createObjectURL(file);
      setImagePreview(previewURL);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!posterUrl) {
      return Swal.fire({
        title: "Error!",
        text: "Harap unggah gambar untuk acara.",
        icon: "error",
        confirmButtonText: "OK",
        confirmButtonColor: "#3085d6",
      });
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("posterUrl", posterUrl);
      formData.append("name", eventData.name);
      formData.append("dateTime", new Date(eventData.dateTime).toISOString());
      formData.append("location", eventData.location);
      formData.append("description", eventData.description);
      formData.append("quota", eventData.quota);
      formData.append("ticketPrice", eventData.ticketPrice);
      formData.append("eventBy", eventData.eventBy);

      await eventApi.createEvent(formData);

      Swal.fire({
        title: "Sukses!",
        text: "Acara baru telah berhasil dibuat.",
        icon: "success",
        confirmButtonText: "OK",
        confirmButtonColor: "#3085d6",
      }).then(() => {
        navigate("/admin");
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
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar />

      <div className="flex-1 flex flex-col p-6 bg-gray-50">
        <EventInfoCard />

        <div className="bg-white p-4 rounded-lg shadow-md flex-1 flex flex-col items-center space-y-6 overflow-y-auto">
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
                value={eventData.dateTime}
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
              <label className="block text-sm font-medium">Kuota Peserta</label>
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
            >
              {loading ? (
                <LoadingSpinner />
              ) : (
                <>
                  <FiCheckSquare className="text-xl" />
                  <span className="font-semibold">OK</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateEventPage;
