import { useState } from "react";

export default function AddPage() {
  const [formData, setFormData] = useState({
    // No Aplikasi handle di server
    kodePos: "",
    tanggalLahir: "",
    nama: "",
    jenisKelamin: "",
    tempatLahir: "",
    alamat: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    // TODO: Implement backend integration
  };

  // const handleLanjutScoring = () => {
  //   console.log("Lanjut ke Scoring");
  //   // TODO: Navigate to scoring page
  // };

  return (
    <div className="min-h-screen bg-linear-to-br from-cyan-400 via-cyan-500 to-cyan-600 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative Stars */}
      <div className="absolute top-10 left-20 text-yellow-400 text-6xl">⭐</div>
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
              type="text"
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
            <button
              type="submit"
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 shadow-md hover:shadow-lg"
            >
              Simpan
            </button>

            {/* <button
              type="button"
              onClick={handleLanjutScoring}
              className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 shadow-md hover:shadow-lg whitespace-nowrap"
            >
              Lanjut ke Scoring
            </button> */}
          </div>
        </form>
      </div>

      {/* Decorative Clipboard Illustration */}
      <div className="absolute bottom-10 left-10 hidden lg:block">
        <div className="text-8xl opacity-50">📋</div>
      </div>
    </div>
  );
}
