import { useState } from "react";
import { useNavigate } from "react-router";
import { FiUser, FiLock, FiLogIn } from "react-icons/fi";
import { apiClient } from "../helpers/api";

export default function LoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      // validasi semua field terisi
      for (const key in formData) {
        if (formData[key].trim() === "") {
          throw { status: 400, message: `Semua field harus diisi.` };
        }
      }

      const response = await apiClient.post("/login", formData);
      const { token } = response.data;

      // simpan token ke localStorage dan redirect ke halaman home
      localStorage.setItem("authToken", token);
      navigate("/");
    } catch (err) {
      console.log("🚀 ~ handleSubmit ~ err:", err);
      if (err.status === 400) {
        // handle error 400 dari server
        if (err.response && err.response.data && err.response.data.error) {
          setError(err.response.data.error);
          return;
        } else {
          // error dari validasi client
          setError(err.message);
          return;
        }
      } else {
        setError("Terjadi kesalahan pada server. Silakan coba lagi.");
      }
    } finally {
      setLoading(false);
    }
  };

  if (localStorage.getItem("authToken")) {
    navigate("/");
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-cyan-400 via-cyan-500 to-cyan-600 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative Stars */}
      <div className="absolute top-10 left-20 text-yellow-400 text-6xl animate-pulse">
        ⭐
      </div>
      <div className="absolute top-20 left-1/3 text-yellow-400 text-5xl animate-pulse delay-75">
        ⭐
      </div>
      <div className="absolute top-16 right-1/4 text-yellow-400 text-6xl animate-pulse delay-150">
        ⭐
      </div>
      <div className="absolute bottom-20 left-1/4 text-yellow-400 text-4xl animate-pulse">
        ⭐
      </div>
      <div className="absolute bottom-32 right-20 text-yellow-400 text-5xl animate-pulse delay-75">
        ⭐
      </div>

      {/* Decorative Circles */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-300 rounded-full opacity-30 -mr-48 -mt-48"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-cyan-300 rounded-full opacity-20 -ml-40 -mb-40"></div>

      {/* Login Container */}
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md relative z-10">
        {/* Logo/Title Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-linear-to-br from-cyan-400 to-cyan-600 rounded-full mb-4">
            <FiUser className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Selamat Datang
          </h1>
          <p className="text-gray-600">Silakan login untuk melanjutkan</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 border border-red-400 rounded">
            {error}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Username Field */}
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Username
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiUser className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors"
                placeholder="Masukkan username"
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiLock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors"
                placeholder="Masukkan password"
              />
            </div>
          </div>

          {/* Login Button */}
          {loading ? (
            <div className="text-center text-gray-500">Memproses login...</div>
          ) : (
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-linear-to-r from-cyan-500 to-cyan-600 text-white py-3 px-4 rounded-lg hover:from-cyan-600 hover:to-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 transition-all transform hover:scale-[1.02] font-semibold shadow-lg"
            >
              <FiLogIn className="w-5 h-5" />
              Login
            </button>
          )}
        </form>

        {/* Footer Info */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            Sistem Manajemen Scoring - Admin Panel
          </p>
        </div>
      </div>
    </div>
  );
}
