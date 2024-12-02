import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function RegisterPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault(); // Prevent form default submission behavior

    if (!username || !email || !password || !confirmPassword) {
      setError('Semua field harus diisi');
      return;
    }

    if (password !== confirmPassword) {
      setError('Password tidak cocok');
      return;
    }

    // Api
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      });

      if (!response.ok) {
        throw new Error('Pendaftaran gagal');
      }

      // Pendaftaran berhasil, tampilkan pesan sukses dan arahkan ke halaman login
      toast.success('Akun baru berhasil dibuat! Silakan login.');
      navigate('/login');
    } catch (err) {
      console.error('Error during registration:', err);
      setError('Terjadi kesalahan saat pendaftaran. Silakan coba lagi.');
    }
  };

  return (
    <div className="h-screen w-full font-sans overflow-y-hidden">
      {/* Desktop View */}
      <div className="hidden md:block h-full bg-black bg-opacity-50">
        <div className="flex items-center justify-center h-full">
          <div className="flex w-[800px] h-[450px] bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="w-full p-8 flex flex-col justify-center items-center">
              <h1 className="text-2xl sm:text-3xl font-semibold text-center text-gray-800 mb-4">
                DAFTAR DI UNITIX
              </h1>
              <p className="text-sm sm:text-lg text-center text-gray-600 mb-6">
                Gabung bersama komunitas kami dan nikmati berbagai pengalaman!
              </p>

              <form className="w-full" onSubmit={handleRegister}>
                <div className="mb-4">
                  <label htmlFor="username" className="block text-sm font-semibold text-gray-700">
                    Username
                  </label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full p-3 mt-2 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-3 mt-2 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-700">
                    Konfirmasi Password
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder="Enter your confirm password"
                    value={confirmPassword}
                    // onChange={(e) => setConfirmPassword

                    //   (e) => setConfirmPassword(e.target.value)}
                    //   className="w-full p-3 mt-2 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
  
                  {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
  
                  <button
                    type="submit"
                    className="w-full bg-[#00FFFF] text-black p-3 rounded-full hover:bg-[#00E0E0] focus:outline-none focus:ring-2 focus:ring-[#00FFFF]"
                  >
                    Daftar
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
  
        {/* Mobile View */}
        <div className="block md:hidden h-full flex items-center justify-center bg-white">
          <div className="w-full sm:w-96 bg-white rounded-lg shadow-lg p-8">
            <h1 className="text-2xl font-semibold text-center text-gray-800 mb-4">
              DAFTAR DI UNITIX
            </h1>
            <p className="text-sm text-center text-gray-600 mb-6">
              Gabung bersama komunitas kami dan nikmati berbagai pengalaman!
            </p>
  
            <form className="w-full" onSubmit={handleRegister}>
              {/* Form elements yang sama seperti di tampilan desktop */}
            </form>
          </div>
        </div>
      </div>
    );
  }
  
  export default RegisterPage;