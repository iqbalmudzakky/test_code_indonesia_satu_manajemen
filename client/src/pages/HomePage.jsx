import { useNavigate } from "react-router";
import { FiEdit2, FiTrash2, FiPlus, FiLogOut } from "react-icons/fi";

export default function HomePage() {
  const navigate = useNavigate();

  // Dummy data dengan beberapa user yang sudah dan belum ada scoring
  const dummyData = [
    {
      id: 1,
      nama: "Ahmad Syahputra",
      summaryScore: 85,
      riskLevel: "Low Risk",
      hasScoring: true,
    },
    {
      id: 2,
      nama: "Siti Nurhaliza",
      summaryScore: 65,
      riskLevel: "Medium Risk",
      hasScoring: true,
    },
    {
      id: 3,
      nama: "Budi Santoso",
      summaryScore: 35,
      riskLevel: "High Risk",
      hasScoring: true,
    },
    {
      id: 4,
      nama: "Dewi Lestari",
      summaryScore: null,
      riskLevel: null,
      hasScoring: false,
    },
    {
      id: 5,
      nama: "Eko Prasetyo",
      summaryScore: 78,
      riskLevel: "Low Risk",
      hasScoring: true,
    },
    {
      id: 6,
      nama: "Rina Wijaya",
      summaryScore: null,
      riskLevel: null,
      hasScoring: false,
    },
  ];

  const handleEdit = (id) => {
    // Navigate to score page with user id
    navigate(`/score?id=${id}`);
  };

  const handleDelete = (id) => {
    // Prototype - just show alert
    alert(`Delete user dengan ID: ${id}`);
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
                {dummyData.map((user, index) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {user.nama}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {user.hasScoring ? (
                        <div className="text-sm font-semibold text-gray-900">
                          {user.summaryScore}
                        </div>
                      ) : (
                        <div className="text-sm text-gray-400">-</div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {user.hasScoring ? (
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
                          onClick={() => handleEdit(user.id)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <FiEdit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(user.id)}
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
