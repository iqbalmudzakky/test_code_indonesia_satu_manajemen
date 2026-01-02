import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { apiClient } from "../helpers/api";
import Navbar from "../components/Navbar";

export default function AddPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    kodePos: "",
    tanggalLahir: "",
    nama: "",
    jenisKelamin: "",
    tempatLahir: "",
    alamat: "",
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
      // validasi untuk memastikan semua field terisi
      for (const key in formData) {
        if (formData[key].trim() === "") {
          throw { status: 400, message: `Semua field harus diisi.` };
        }
      }

      await apiClient.post("/add-user", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      navigate("/");
    } catch (err) {
      console.log("🚀 ~ handleSubmit ~ err:", err);
      if (err.status === 400) {
        // handle error 400 dari server
        if (err.response && err.response.data && err.response.data.error) {
          setError(err.response.data.error);
          return;
        }

        // error custom dari validasi client
        setError(err.message);
      } else {
        setError("Terjadi kesalahan pada server. Silakan coba lagi.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-linear-to-br from-cyan-400 via-cyan-500 to-cyan-600 flex items-center justify-center p-4 relative overflow-hidden">
        {/* Decorative Stars */}
        <div className="absolute top-10 left-20 text-yellow-400 text-6xl">
          ⭐
        </div>
        <div className="absolute top-20 left-1/3 text-yellow-400 text-5xl">
          ⭐
        </div>
        <div className="absolute top-16 right-1/4 text-yellow-400 text-6xl">
          ⭐
        </div>

        {/* Decorative Circle */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-300 rounded-full opacity-30 -mr-48 -mt-48"></div>

        {/* Form Container */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-2xl relative z-10">
          <h1 className="text-2xl font-bold text-center text-blue-600 mb-8">
            Formulir Informasi Aplikasi
          </h1>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
              <div className="shrink-0 w-5 h-5 mt-0.5">
                <svg
                  className="w-5 h-5 text-red-500"
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
              <div>
                <p className="text-red-700 font-medium">Terjadi Kesalahan</p>
                <p className="text-red-600 text-sm mt-1">{error}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Row 1: Nama and Jenis Kelamin */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nama
                </label>
                <input
                  type="text"
                  name="nama"
                  value={formData.nama}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                  placeholder=""
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Jenis Kelamin
                </label>
                <select
                  name="jenisKelamin"
                  value={formData.jenisKelamin}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition bg-white"
                >
                  <option value="">-- Pilih --</option>
                  <option value="Laki-laki">Laki-laki</option>
                  <option value="Perempuan">Perempuan</option>
                </select>
              </div>
            </div>

            {/* Row 2: Tempat Lahir and Tanggal Lahir */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tempat Lahir
                </label>
                <input
                  type="text"
                  name="tempatLahir"
                  value={formData.tempatLahir}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                  placeholder=""
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tanggal Lahir
                </label>
                <input
                  type="date"
                  name="tanggalLahir"
                  value={formData.tanggalLahir}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                />
              </div>
            </div>

            {/* Row 3: Kode Pos */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Kode Pos
              </label>
              <input
                type="number"
                name="kodePos"
                value={formData.kodePos}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                placeholder=""
              />
            </div>

            {/* Row 4: Alamat */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Alamat
              </label>
              <textarea
                name="alamat"
                value={formData.alamat}
                onChange={handleChange}
                rows="4"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition resize-none"
                placeholder=""
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-4 pt-2">
              {loading ? (
                <button
                  type="button"
                  className="flex-1 bg-blue-400 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 shadow-md cursor-not-allowed flex items-center justify-center gap-2"
                  disabled
                >
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Memproses...
                </button>
              ) : (
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 shadow-md hover:shadow-lg"
                >
                  Simpan
                </button>
              )}
              <div className="flex-1">
                <Link
                  to="/"
                  className="block text-center bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-6 rounded-lg transition duration-200 shadow-md hover:shadow-lg"
                >
                  Batal
                </Link>
              </div>
            </div>
          </form>
        </div>

        {/* Decorative Clipboard Illustration */}
        <div className="absolute bottom-10 left-10 hidden lg:block">
          <div className="text-8xl opacity-50">📋</div>
        </div>
      </div>
    </div>
  );
}
