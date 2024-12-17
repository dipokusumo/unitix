import React, { useState } from "react";
import { userApi } from "../api/userApi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingSpinner from "../component/loadingSpinner";

function LoginPage() {
  const [email, setInputEmail] = useState("");
  const [password, setInputPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await userApi.login(email, password);

      if (response.data.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }

      setInputEmail("");
      setInputPassword("");

      toast.success("Login Successful.", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
      });
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
      setIsLoading(false);
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
      {/* Desktop View */}
      <div className="md:flex h-full bg-black bg-opacity-50">
        <div className="flex items-center justify-center w-full h-full px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row w-[800px] max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden">
            {/* Form Section */}
            <div className="md:w-1/2 p-4 flex flex-col justify-center items-center">
              <h1 className="text-lg sm:text-xl font-semibold text-center text-gray-800 mb-2">
                SELAMAT DATANG DI UNITIX
              </h1>
              <p className="text-xs sm:text-sm text-center text-gray-600 mb-4">
                Satu klik, ribuan pengalaman
              </p>

              <form
                className="w-full max-w-md px-4 sm:px-12"
                onSubmit={handleLogin}
              >
                <div className="mb-4">
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
                    onChange={(e) => setInputEmail(e.target.value)}
                    className="w-full p-3 mt-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                  />
                </div>

                <div className="mb-4">
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
                    onChange={(e) => setInputPassword(e.target.value)}
                    className="w-full p-3 mt-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                  />
                </div>

                <div className="mb-4 text-right">
                  <a
                    href="/forgot-password"
                    className="text-xs text-blue-600 hover:underline"
                  >
                    Lupa Password?
                  </a>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#00FFFF] text-xs font-semibold text-black p-3 rounded-full hover:bg-[#00E0E0] focus:outline-none focus:ring-2 focus:ring-[#00FFFF]"
                  disabled={isLoading}
                >
                  {isLoading ? <LoadingSpinner /> : "Masuk"}
                </button>

                <div className="mt-4 text-center">
                  <p className="text-xs text-gray-800">
                    Belum punya akun?{" "}
                    <a
                      href="/register"
                      className="text-[#ff3b3b] hover:underline"
                    >
                      Daftar Sekarang
                    </a>
                  </p>
                </div>
              </form>
            </div>

            {/* Logo Section */}
            <div className="hidden md:flex md:w-1/2 bg-[#b3ffff] items-center justify-center">
              <img
                src="logo.svg"
                alt="Unitix Logo"
                className="h-48 w-48 object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
