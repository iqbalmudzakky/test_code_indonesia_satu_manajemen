import { useNavigate } from "react-router";
import { FiEdit2, FiTrash2, FiPlus, FiLogOut } from "react-icons/fi";
import { useEffect, useState } from "react";
import { apiClient } from "../helpers/api";
import Navbar from "../components/Navbar";
import Swal from "sweetalert2";
import Decorative from "../components/Decorative";

export default function HomePage() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async (page = 1, limit = 5) => {
      setLoading(true);
      setError(null);

      try {
        const response = await apiClient.get(`/`, {
          params: { page, limit },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });
        const data = response.data.data;
        setUsers(data);
        setTotalPages(response.data.totalPages);
      } catch (err) {
        console.log("🚀 ~ fetchData ~ err:", err);
        setError("Gagal memuat data pengguna.");
      } finally {
        setLoading(false);
      }
    };

    fetchData(page, 5);
  }, [page]);

  const handleEdit = (noAplikasi) => {
    // Navigate to score page with user id
    navigate(`/score/${noAplikasi}`);
  };

  const handleDelete = async (noAplikasi) => {
    const result = await Swal.fire({
      title: "Apakah Anda yakin?",
      text: "Data pengguna akan dihapus secara permanen.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batal",
    });

    if (result.isConfirmed) {
      try {
        setLoading(true);
        await apiClient.delete(`/delete-user/${noAplikasi}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });
        // Refresh user list setelah dihapus
        setUsers((prev) =>
          prev.filter((user) => user.noAplikasi !== noAplikasi)
        );
        Swal.fire("Dihapus!", "Data pengguna telah dihapus.", "success");
      } catch (err) {
        console.log("🚀 ~ handleDelete ~ err:", err);
        if (err.response && err.response.status === 404) {
          Swal.fire("Gagal!", err.response.data.error, "error");
        } else {
          Swal.fire(
            "Gagal!",
            "Terjadi kesalahan pada server. Silakan coba lagi.",
            "error"
          );
        }
      } finally {
        setLoading(false);
      }
    }
  };

  const getRiskLevelColor = (riskLevel) => {
    if (!riskLevel) return "";
    switch (riskLevel) {
      case "Low Risk":
        return "text-green-600 bg-green-50 border-green-200";
      case "Medium Risk":
        return "text-yellow-600 bg-yellow-50 border-yellow-200";
      case "High Risk":
        return "text-red-600 bg-red-50 border-red-200";
      default:
        return "";
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-cyan-400 via-cyan-500 to-cyan-600 relative overflow-hidden">
      {/* Decorative Elements */}
      <Decorative />
      {/* Navbar */}
      <Navbar />
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        {/* Header with Add Button */}
        {/* buat container ini agar memiliki bg putih */}
        <div className="flex justify-between items-center mb-6 bg-white rounded-lg shadow-sm p-3">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Daftar Pengguna
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Kelola data scoring pengguna
            </p>
          </div>
          <button
            onClick={() => navigate("/add")}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
          >
            <FiPlus className="w-5 h-5" />
            Tambah Pengguna
          </button>
        </div>

        {/* Table */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-4"></div>
            <p className="text-gray-600 font-medium">Memuat data...</p>
            <p className="text-gray-400 text-sm mt-1">Mohon tunggu sebentar</p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-16 bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
              <svg
                className="w-8 h-8 text-red-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <p className="text-red-600 font-semibold text-lg mb-1">
              Terjadi Kesalahan
            </p>
            <p className="text-gray-500 text-sm mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
            >
              Coba Lagi
            </button>
          </div>
        ) : users.length === 0 ? (
          <div className="text-center py-10 text-gray-600">
            Tidak ada data pengguna.
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      No
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Nama
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Summary Score
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Risk Level
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {users.map((user, index) => (
                    <tr key={user._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {user.nama}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {user.summaryScore || user.summaryScore === 0 ? (
                          <div className="text-sm font-semibold text-gray-900">
                            {/* dibulatkan jadi 1 angka dibelakang koma */}
                            {user.summaryScore.toFixed(2)}
                          </div>
                        ) : (
                          <div className="text-sm text-gray-400">-</div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {user.riskLevel ? (
                          <span
                            className={`inline-flex px-3 py-1 text-xs font-medium rounded-full border ${getRiskLevelColor(
                              user.riskLevel
                            )}`}
                          >
                            {user.riskLevel}
                          </span>
                        ) : (
                          <span className="inline-flex px-3 py-1 text-xs font-medium text-gray-500 bg-gray-50 rounded-full border border-gray-200">
                            Belum dihitung
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => handleEdit(user.noAplikasi)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Edit"
                          >
                            <FiEdit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(user.noAplikasi)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete"
                          >
                            <FiTrash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-6 bg-white rounded-lg shadow-sm border border-gray-200 px-6 py-4">
            <p className="text-sm text-gray-600">
              Menampilkan halaman{" "}
              <span className="font-semibold text-gray-900">{page}</span> dari{" "}
              <span className="font-semibold text-gray-900">{totalPages}</span>
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                disabled={page === 1}
                className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:border-gray-300 transition-all"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                Sebelumnya
              </button>
              <div className="hidden sm:flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (pageNum) => (
                    <button
                      key={pageNum}
                      onClick={() => setPage(pageNum)}
                      className={`w-10 h-10 text-sm font-medium rounded-lg transition-all ${
                        page === pageNum
                          ? "bg-blue-600 text-white shadow-md"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      {pageNum}
                    </button>
                  )
                )}
              </div>
              <button
                onClick={() =>
                  setPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={page === totalPages}
                className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:border-gray-300 transition-all"
              >
                Selanjutnya
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* Info Section */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-800">
            <span className="font-semibold">Catatan:</span> User dengan status
            "Belum dihitung" perlu dilakukan scoring terlebih dahulu. Klik
            tombol edit untuk melakukan scoring.
          </p>
        </div>
      </div>
    </div>
  );
}
