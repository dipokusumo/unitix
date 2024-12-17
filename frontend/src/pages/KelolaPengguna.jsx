import React, { useState, useEffect } from "react";
import Sidebar from "../layout/AdminSidebar";
import EventInfoCard from "../layout/AdminBoxInfo";
import { MdDelete } from "react-icons/md";
import { userApi } from "../api/userApi";
import Swal from "sweetalert2";
import LoadingSpinner from "../component/loadingSpinner";

function KelolaPenggunaPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      try {
        const allUser = await userApi.getAllUsers();
        setUsers(allUser);
      } catch (error) {
        console.error("Error fetching data: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleDeleteClick = (user) => {
    Swal.fire({
      title: `Hapus ${user.name} dari pengguna?`,
      text: "Tindakan ini tidak dapat diurungkan.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Ya, Hapus!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        setDeleting(user._id);
        try {
          await userApi.deleteUser(user._id);
          Swal.fire({
            title: "Terhapus!",
            text: `${user.name} telah dihapus.`,
            icon: "success",
            confirmButtonText: "OK",
            confirmButtonColor: "#3085d6",
          }).then(() => {
            window.location.reload();
          });
        } catch (error) {
          Swal.fire({
            title: "Gagal",
            text: error.response.data.message,
            icon: "error",
            confirmButtonText: "OK",
            confirmButtonColor: "#3085d6",
          });
        } finally {
          setDeleting(null);
        }
      }
    });
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col p-6 bg-gray-50">
        {/* Kotak Informasi */}
        <EventInfoCard />

        {/* Tabel Pengguna */}
        <div className="bg-white p-4 rounded-lg shadow-md flex-1 overflow-y-auto">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <LoadingSpinner />
            </div>
          ) : (
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 text-gray-600">
                    Nama Pengguna
                  </th>
                  <th className="text-left py-3 px-4 text-gray-600">Email</th>
                  <th className="text-center py-3 px-4 text-gray-600">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id} className="border-b hover:bg-gray-100">
                    <td className="py-3 px-4">{user.name}</td>
                    <td className="py-3 px-4">{user.email}</td>
                    <td className="py-3 px-4 text-red-500 cursor-pointer hover:underline flex justify-center items-center">
                      <button
                        onClick={() => handleDeleteClick(user)}
                        disabled={deleting}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 flex items-center"
                      >
                        {deleting === user._id ? (
                          <LoadingSpinner />
                        ) : (
                          <>
                            <MdDelete className="mr-2" />
                            Hapus
                          </>
                        )}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default KelolaPenggunaPage;
