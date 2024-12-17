import React from "react";
import { useNavigate } from "react-router-dom";

const ProfileSidebar = () => {
  const navigate = useNavigate(); // Hook untuk navigasi

  return (
    <div className="w-1/3 bg-gray-100 p-6 rounded-r-xl sm:border-none">
      <ul className="space-y-4">
        <li>
          <button
            className="w-full text-left px-4 py-2 bg-white text-gray-800 hover:bg-[#00cccc] font-medium rounded-lg"
            onClick={() => navigate("/profile")}
          >
            Edit Profil
          </button>
        </li>
        <li>
          <button
            className="w-full text-left px-4 py-2 bg-white text-gray-800 hover:bg-[#00cccc] font-medium rounded-lg"
            onClick={() => navigate("/profile/change-password")}
          >
            Ubah Kata Sandi
          </button>
        </li>
        <li>
          <button
            className="w-full text-left px-4 py-2 bg-white text-red-500 hover:bg-red-300 font-medium rounded-lg"
            onClick={() => {
              localStorage.clear();
              navigate("/");
            }}
          >
            Keluar
          </button>
        </li>
      </ul>
    </div>
  );
};

export default ProfileSidebar;