// RegisterPage.js
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
    e.preventDefault();

    if (!username || !email || !password || !confirmPassword) {
      setError('Semua field harus diisi');
      return;
    }

    if (password !== confirmPassword) {
      setError('Password tidak cocok');
      return;
    }

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      });

      if (!response.ok) {
        throw new Error('Pendaftaran gagal');
      }

      toast.success('Akun baru berhasil dibuat! Silakan login.');
      navigate('/login');
    } catch (err) {
      console.error(err);
      setError('Terjadi kesalahan saat pendaftaran.');
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
      {/* Form */}
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg mx-auto my-auto">
        <h1 className="text-2xl font-semibold text-center text-gray-800 mb-4">DAFTAR AKUN BARU</h1>
        <p className="text-sm text-center text-gray-600 mb-4">Satu klik, ribuan pengalaman</p>

        <form onSubmit={handleRegister} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Nama Pengguna"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="p-3 border rounded-md"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-3 border rounded-md"
          />
          <input
            type="password"
            placeholder="Kata Sandi"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-3 border rounded-md"
          />
          <input
            type="password"
            placeholder="Ulangi Kata Sandi"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="p-3 border rounded-md"
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className="bg-[#00FFFF] text-black p-3 rounded-full hover:bg-[#00E0E0] focus:outline-none focus:ring-2 focus:ring-[#00FFFF]"
          >
            Buat Akun
          </button>

          <div className="mt-4 text-center">
            <p className="text-sm text-gray-800">
              Sudah punya akun?{' '}
              <a href="/login" className="text-[#ff3b3b] hover:underline">
                Login Sekarang
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;
