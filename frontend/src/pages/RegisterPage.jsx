// RegisterPage.js
import React, { useState } from "react";
import { userApi } from "../api/userApi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import LoadingSpinner from "../component/loadingSpinner";

function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await userApi.register(name, email, password, confirmPassword);

      toast.success("Akun baru berhasil dibuat! Silakan login.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
      });
      navigate("/login");
    } catch (error) {
      const errorMessage = error.response?.data?.message;

      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="h-screen w-full"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        backgroundSize: "cover",
        backgroundPosition: "center center",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="h-full bg-black bg-opacity-50 flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-white p-6 md:p-8 rounded-xl shadow-lg">
          <h1 className="text-2xl font-semibold text-center text-gray-800 mb-4">
            DAFTAR AKUN BARU
          </h1>
          <p className="text-xs sm:text-sm text-center text-gray-600 mb-4">
            Satu klik, ribuan pengalaman
          </p>

          <form onSubmit={handleRegister} className="space-y-4">
            {/* Input Nama */}
            <div>
              <label
                htmlFor="name"
                className="block text-xs font-semibold text-gray-700"
              >
                Nama
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Masukkan nama"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 mt-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
              />
            </div>

            {/* Input Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-semibold text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Masukan email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 mt-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
              />
            </div>

            {/* Input Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-xs font-semibold text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Masukan password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 mt-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
              />
            </div>

            {/* Input Konfirmasi Password */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-xs font-semibold text-gray-700"
              >
                Ulangi Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Ulangi password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full p-3 mt-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
              />
            </div>

            {/* Tombol Submit */}
            <button
              type="submit"
              className="w-full bg-[#00FFFF] text-xs font-semibold text-black p-3 rounded-full hover:bg-[#00E0E0] focus:outline-none focus:ring-2 focus:ring-[#00FFFF] flex justify-center"
              disabled={loading}
            >
              {loading ? <LoadingSpinner /> : "Buat Akun"}
            </button>
          </form>

          {/* Teks Sudah Punya Akun */}
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-800">
              Sudah punya akun?{" "}
              <a href="/login" className="text-[#ff3b3b] hover:underline">
                Login Sekarang
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
