import React, { useState } from "react";
import Navbar from "../layout/CustomerNavbar";
import ProfileSidebar from "../layout/ProfileSidebar";

const EditProfilePage = () => {
  const [username, setUsername] = useState("");

  const handleUpdate = () => {
    alert(`Nama pengguna diperbarui menjadi: ${username}`);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="max-w-6xl mx-auto py-8 px-4">
        {/* Header */}
        <h1 className="text-xl font-semibold mb-6">Edit Profil</h1>

        <div className="flex">
          {/* Form Edit Profil */}
          <div className="flex-1 bg-white rounded-md shadow-lg p-6">
            {/* Avatar */}
            <div className="w-20 h-20 rounded-full bg-gray-200 mb-4 overflow-hidden mx-auto">
              <img
                src="https://tse1.mm.bing.net/th?id=OIP.q0vC3o4GLpNUNU2msVuj9gHaFj&pid=Api"
                alt="Avatar"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Form */}
            <form className="w-full">
              <label htmlFor="username" className="block text-gray-700 font-medium mb-2 text-sm">
                Nama Pengguna
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00cccc] text-sm"
                placeholder="Masukkan nama pengguna"
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

export default EditProfilePage;
