import { useNavigate } from "react-router";
import { FiEdit2, FiTrash2, FiPlus, FiLogOut } from "react-icons/fi";
import { useEffect, useState } from "react";
import { apiClient } from "../helpers/api";

export default function HomePage() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await apiClient.get("/");
        const data = response.data.data;
        setUsers(data);
      } catch (err) {
        console.log("🚀 ~ fetchData ~ err:", err);
        setError("Gagal memuat data pengguna.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleEdit = (noAplikasi) => {
    // Navigate to score page with user id
    navigate(`/score/${noAplikasi}`);
  };

  const handleDelete = (noAplikasi) => {
    // Prototype - just show alert
    alert(`Delete user dengan ID: ${noAplikasi}`);
  };

  const handleLogout = () => {
    navigate("/login");
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
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-800">
                Manajemen Scoring
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">Admin</span>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <FiLogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header with Add Button */}
        <div className="flex justify-between items-center mb-6">
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
          <div className="text-center py-10 text-gray-600">Memuat data...</div>
        ) : error ? (
          <div className="text-center py-10 text-red-600">{error}</div>
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
                            {user.summaryScore}
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
