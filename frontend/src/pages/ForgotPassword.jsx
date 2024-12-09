import React, { useState } from 'react';

const ForgotPassword = () => {
  // State untuk menyimpan email, kata sandi baru, dan ulangi kata sandi
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [success, setSuccess] = useState(false); // Menyimpan status apakah berhasil atau gagal

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validasi apakah password baru dan konfirmasi password cocok
    if (newPassword === confirmPassword) {
      setSuccess(true); // Jika berhasil, tampilkan halaman sukses
    } else {
      setSuccess(false); // Jika gagal, tampilkan halaman gagal
    }
  };

  return (
    <div
      className="h-screen w-full font-sans overflow-y-hidden"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        backgroundAttachment: 'fixed',
      }}
    >
      {/* Desktop View */}
      <div className="hidden md:block h-full bg-black bg-opacity-50">
        <div className="flex items-center justify-center h-full">
          <div className="flex w-[800px] h-[450px] bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="w-1/2 p-4 flex flex-col justify-center items-center mt-6 mb-6 mx-auto">
              <h1 className="text-lg sm:text-xl font-semibold text-center text-gray-800 mb-2">
                LUPA KATA SANDI
              </h1>
              <p className="text-xs sm:text-sm text-center text-gray-600 mb-4">
                Masukkan email untuk mengubah kata sandi Anda
              </p>

              <form className="w-full max-w-md mx-auto px-12" onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-xs font-semibold text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Masukkan email"
                    value={email}
                    onChange={handleEmailChange}
                    className="w-full p-3 mt-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-lg"
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="newPassword" className="block text-xs font-semibold text-gray-700">
                    Kata sandi baru
                  </label>
                  <input
                    type="password"
                    id="newPassword"
                    name="newPassword"
                    placeholder="Masukkan kata sandi baru"
                    value={newPassword}
                    onChange={handleNewPasswordChange}
                    className="w-full p-3 mt-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-lg"
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="confirmPassword" className="block text-xs font-semibold text-gray-700">
                    Ulangi kata sandi baru
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder="Masukkan ulang kata sandi baru"
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                    className="w-full p-3 mt-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-lg"
                  />
                </div>

                {success === false && (
                  <p className="text-red-500 text-xs mb-3">Kata sandi baru tidak cocok</p>
                )}

                <button
                  type="submit"
                  className="w-full bg-[#00FFFF] text-xs font-semibold text-black p-3 rounded-full hover:bg-[#00E0E0] focus:outline-none focus:ring-2 focus:ring-[#00FFFF]"
                >
                  Ubah Kata Sandi
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
            LUPA KATA SANDI
          </h1>
          <p className="text-sm text-center text-gray-600 mb-6">
            Masukkan email untuk mengubah kata sandi Anda
          </p>

          <form className="w-full" onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Masukkan email"
                value={email}
                onChange={handleEmailChange}
                className="w-full p-3 mt-2 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-lg"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="newPassword" className="block text-sm font-semibold text-gray-700">
                Kata sandi baru
              </label>
              <input
                type="password"
                id="newPassword"
                name="newPassword"
                placeholder="Masukkan kata sandi baru"
                value={newPassword}
                onChange={handleNewPasswordChange}
                className="w-full p-3 mt-2 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-lg"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-700">
                Ulangi kata sandi baru
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Masukkan ulang kata sandi baru"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                className="w-full p-3 mt-2 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-lg"
              />
            </div>

            {success === false && (
              <p className="text-red-500 text-sm mb-4">Kata sandi baru tidak cocok</p>
            )}

            <button
              type="submit"
              className="w-full bg-[#00FFFF] text-black p-3 rounded-full hover:bg-[#00E0E0] focus:outline-none focus:ring-2 focus:ring-[#00FFFF]"
            >
              Ubah Kata Sandi
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
