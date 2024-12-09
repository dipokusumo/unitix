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
    <div className="RegisterPage w-full h-screen flex flex-col items-center justify-center bg-gray-100">
      {/* Gambar Background */}
      <img
        className="NainoaShizuruNcdg9mk3pbyUnsplash12 w-96 h-96 absolute opacity-70"
        src="https://via.placeholder.com/1440x1020"
        alt="background"
      />

      {/* Form Register */}
      <div className="w-96 bg-white p-8 rounded-xl shadow-lg relative">
        <h1 className="text-2xl font-bold text-center mb-4">Register</h1>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <form onSubmit={handleRegister} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Nama Pengguna"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="p-2 border rounded-md"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-2 border rounded-md"
          />
          <input
            type="password"
            placeholder="Kata Sandi"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-2 border rounded-md"
          />
          <input
            type="password"
            placeholder="Ulangi Kata Sandi"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="p-2 border rounded-md"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
          >
            Buat Akun
          </button>
        </form>
      </div>

      {/* Notifikasi Berhasil */}
      <div className="NotifRegister w-96 h-96 absolute top-[200px] left-[300px] bg-white shadow-lg rounded-2xl">
        <div className="Rectangle337 w-96 h-96 left-0 top-0 absolute bg-zinc-100 rounded-3xl" />
        <div className="EmojioneBallotBoxWithCheck w-20 h-20 left-[263px] top-[38px] absolute" />
        <div className="AkunBaruBerhasilDibuat w-60 h-5 left-[188px] top-[145px] absolute text-center text-neutral-900 text-base font-medium font-['Montserrat'] tracking-wide">
          Akun baru berhasil dibuat
        </div>
        <div className="Group19 w-56 h-10 left-[195px] top-[270px] absolute">
          <div className="Rectangle338 w-56 h-10 left-0 top-0 absolute bg-cyan-400 rounded-xl shadow" />
          <div className="KembaliKeLogIn left-[35px] top-[15px] absolute text-center text-neutral-900 text-base font-semibold font-['Montserrat'] tracking-wide">
            Kembali ke log in
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
