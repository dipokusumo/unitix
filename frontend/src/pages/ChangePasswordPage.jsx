import React, { useState } from "react";
import Navbar from "../layout/CustomerNavbar";
import ProfileSidebar from "../layout/ProfileSidebar";

const ChangePassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleUpdate = () => {
    if (newPassword !== confirmPassword) {
      alert("Kata sandi baru dan konfirmasi kata sandi tidak cocok!");
    } else {
      alert(`Kata sandi berhasil diperbarui untuk email: ${email}`);
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
              <label htmlFor="email" className="block text-gray-700 font-medium mb-2 text-sm">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00cccc] text-sm"
                placeholder="Masukkan email"
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
                htmlFor="confirmPassword"
                className="block text-gray-700 font-medium mb-2 mt-4 text-sm"
              >
                Konfirmasi Kata Sandi Baru
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00cccc] text-sm"
                placeholder="Masukkan ulang kata sandi baru"
              />

              <button
                type="button"
                onClick={handleUpdate}
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
