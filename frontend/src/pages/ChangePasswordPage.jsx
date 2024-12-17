import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../layout/CustomerNavbar";
import ProfileSidebar from "../layout/ProfileSidebar";
import { userApi } from "../api/userApi";
import { toast } from "react-toastify";

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const navigate = useNavigate();

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      await userApi.changePassword(
        oldPassword,
        newPassword,
        confirmNewPassword
      );

      toast.success("Password berhasil diperbarui!, silahkan login kembali.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
      });
      localStorage.clear();
      navigate("/login");
    } catch (err) {
      const errorMessage = err.response?.data?.message;

      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
      });
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleUpdate();
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="max-w-6xl mx-auto py-8 px-4">
        {/* Header */}
        <h1 className="text-xl font-semibold mb-6">Ubah Kata Sandi</h1>

        <div className="flex">
          {/* Form Ubah Kata Sandi */}
          <div className="flex-1 bg-white rounded-md shadow-lg p-6">
            {/* Form */}
            <form className="w-full">
              <label
                htmlFor="oldPassword"
                className="block text-gray-700 font-medium mb-2 text-sm"
              >
                Kata Sandi Lama
              </label>
              <input
                type="password"
                id="oldPassword"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00cccc] text-sm"
                placeholder="Masukkan kata sandi lama"
              />

              <label
                htmlFor="newPassword"
                className="block text-gray-700 font-medium mb-2 mt-4 text-sm"
              >
                Kata Sandi Baru
              </label>
              <input
                type="password"
                id="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00cccc] text-sm"
                placeholder="Masukkan kata sandi baru"
              />

              <label
                htmlFor="confirmNewPassword"
                className="block text-gray-700 font-medium mb-2 mt-4 text-sm"
              >
                Konfirmasi Kata Sandi Baru
              </label>
              <input
                type="password"
                id="confirmNewPassword"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00cccc] text-sm"
                placeholder="Masukkan ulang kata sandi baru"
              />

              <button
                type="button"
                onClick={handleUpdate}
                onKeyDown={handleKeyDown}
                className="w-full mt-4 bg-[#00ffff] text-gray-800 py-1 rounded-md text-sm hover:bg-teal-600 transition"
              >
                Perbarui
              </button>
            </form>
          </div>

          {/* Navigasi */}
          <ProfileSidebar />
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
