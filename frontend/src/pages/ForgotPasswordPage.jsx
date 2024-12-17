import React, { useState } from "react";
import { userApi } from "../api/userApi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import LoadingSpinner from "../component/loadingSpinner";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await userApi.forgotPassword(email);

      if (response?.success) {
        toast.success("Password baru telah dikirim ke email anda.", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
        });
        navigate("/login");
      } else {
        const message = response?.data?.message;
        toast.warn(message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
        });
      }
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
      className="h-screen w-full overflow-y-hidden"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        backgroundSize: "cover",
        backgroundPosition: "center center",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="h-full bg-black bg-opacity-50 flex items-center justify-center">
        <div className="w-full max-w-md bg-white p-6 md:p-8 rounded-xl shadow-lg mx-4 sm:mx-auto">
          <h1 className="text-2xl font-semibold text-center text-gray-800 mb-4">
            LUPA KATA SANDI
          </h1>
          <p className="text-sm text-center text-gray-600 mb-4">
            Masukkan email untuk mendapatkan kata sandi baru
          </p>

          <form
            className="w-full max-w-md mx-auto"
            onSubmit={handleSubmit}
          >
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Masukkan email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 mt-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#00FFFF] text-sm font-semibold text-black p-3 rounded-full hover:bg-[#00E0E0] focus:outline-none focus:ring-2 focus:ring-[#00FFFF] flex items-center justify-center"
              disabled={loading}
            >
              {loading ? <LoadingSpinner /> : "Dapatkan email"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
