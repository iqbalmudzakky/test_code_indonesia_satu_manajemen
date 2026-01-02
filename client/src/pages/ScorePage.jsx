import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { apiClient } from "../helpers/api";
import Navbar from "../components/Navbar";

export default function ScorePage() {
  const { noAplikasi } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    // Informasi 1
    umurPemohon: "",
    umurPemohonTenor: "",
    statusPerkawinan: "",
    pendidikan: "",

    // Informasi 2
    alamat: "",
    kepemilikan: "",
    lamaMenempati: "",

    // Informasi 3
    kategoriPerusahaan: "",
    jabatan: "",
    lamaBekerja: "",
    pendapatan: "",

    // Informasi 4
    rekeningBank: "",
    saldo: "",
    trackRecordPembayaranAngsuran: "",
    slik: "",
    kepemilikanKartuKredit: "",

    // Informasi 5
    tenor: "",
    dsr: "",

    // Informasi 6
    appraisal: "",
    luasBangunan: "",
    tujuanPembiayaan: "",
    ltv: "",
  });
  const [loading, setLoading] = useState(false);
  const [loadingScore, setLoadingScore] = useState(false);
  const [error, setError] = useState(null);
  const [errorForm, setErrorForm] = useState(null);

  useEffect(() => {
    const fetchUserData = async (noAplikasi) => {
      setLoading(true);
      setError(null);
      try {
        const response = await apiClient.get(`/user/${noAplikasi}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });
        setFormData(response.data.data);
      } catch (err) {
        console.log("🚀 ~ fetchUserData ~ err:", err);
        if (err.response && err.response.status === 404) {
          setError("Data user tidak ditemukan.");
        } else {
          setError("Gagal memuat data user.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserData(noAplikasi);
  }, [noAplikasi]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleHitungSkor = async () => {
    setLoadingScore(true);
    setErrorForm(null);
    try {
      // validasi form, tidak boleh ada yang kosong
      for (const key in formData) {
        if (
          formData[key] === "" &&
          key !== "scoringResult" &&
          key !== "noAplikasi"
        ) {
          throw {
            status: 400,
            message: "Semua field harus diisi sebelum menghitung skor.",
          };
        }
      }

      // update ke database
      await apiClient.put(`/update-user/${noAplikasi}`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });

      // refetch data user setelah update
      const response = await apiClient.get(`/user/${noAplikasi}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      setFormData(response.data.data);
    } catch (err) {
      console.log("🚀 ~ handleHitungSkor ~ err:", err);
      if (err.status === 400) {
        if (err.response && err.response.data && err.response.data.error) {
          setErrorForm(err.response.data.error);
          return;
        }

        // set error validasi client
        setErrorForm(err.message);
      } else {
        setErrorForm(
          err.response.data.error ||
            "Terjadi kesalahan pada server. Silakan coba lagi."
        );
      }
    } finally {
      setLoadingScore(false);
    }
  };

  const handleKembali = () => {
    navigate("/");
  };

  const getRiskLevelColorBg = (riskLevel) => {
    if (!riskLevel) return "";
    switch (riskLevel) {
      case "Low Risk":
        return "bg-green-50 border-green-200";
      case "Medium Risk":
        return "bg-yellow-50 border-yellow-200";
      case "High Risk":
        return "bg-red-50 border-red-200";
    }
  };

  const getRiskLevelColorText = (riskLevel) => {
    if (!riskLevel) return "";
    switch (riskLevel) {
      case "Low Risk":
        return "text-green-600";
      case "Medium Risk":
        return "text-yellow-600";
      case "High Risk":
        return "text-red-600";
      default:
        return "";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center py-10 text-gray-600">Memuat data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center py-10 text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h1 className="text-3xl font-bold text-blue-600 mb-2">
            Scoring (DataRating)
          </h1>
          <p className="text-gray-600">
            Informasi Aplikasi Id: {formData.noAplikasi}
          </p>
        </div>

        {/* Error Form */}
        {errorForm && (
          <div className="bg-red-100 text-red-700 p-4 rounded mb-6">
            {errorForm}
          </div>
        )}

        {/* Main Form Container */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          {/* INFORMASI 1 */}
          <div className="mb-8">
            <h2 className="text-lg font-bold text-blue-600 border-b-2 border-blue-600 pb-2 mb-4">
              INFORMASI 1
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Umur Pemohon (Tahun)
                </label>
                <select
                  name="umurPemohon"
                  value={formData.umurPemohon}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                >
                  <option disabled value="">
                    Pilih
                  </option>
                  <option value="21 - 30 Tahun">21 - 30 Tahun</option>
                  <option value="31 - 45 Tahun">31 - 45 Tahun</option>
                  <option value="46 - 55 Tahun">46 - 55 Tahun</option>
                  <option value="56 - 65 Tahun">56 - 65 Tahun</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Umur Pemohon + Tenor
                </label>
                <select
                  name="umurPemohonTenor"
                  value={formData.umurPemohonTenor}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                >
                  <option disabled value="">
                    Pilih
                  </option>
                  <option value="Dibawah Ketentuan">Dibawah Ketentuan</option>
                  <option value="Diatas Ketentuan">Diatas Ketentuan</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status Perkawinan
                </label>
                <select
                  name="statusPerkawinan"
                  value={formData.statusPerkawinan}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                >
                  <option disabled value="">
                    Pilih
                  </option>
                  <option value="Belum Kawin dengan > 2 tanggungan">
                    Belum Kawin dengan lebih dari 2 tanggungan
                  </option>
                  <option value="Belum Kawin dengan <= 2 tanggungan">
                    Belum Kawin dengan 2 tanggungan atau kurang
                  </option>
                  <option value="Belum Kawin dengan 0 tanggungan">
                    Belum Kawin dan tidak ada tanggungan
                  </option>
                  <option value="Kawin dengan > 2 tanggungan">
                    Kawin dengan lebih dari 2 tanggungan
                  </option>
                  <option value="Kawin dengan <= 2 tanggungan">
                    Kawin dengan 2 tanggungan atau kurang
                  </option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Pendidikan
                </label>
                <select
                  name="pendidikan"
                  value={formData.pendidikan}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                >
                  <option disabled value="">
                    Pilih
                  </option>
                  <option value="SMA atau dibawahnya">
                    SMA atau dibawahnya
                  </option>
                  <option value="D1, D2, D3, D4">D1, D2, D3, D4</option>
                  <option value="S1">S1</option>
                  <option value="Master atau diatasnya (S2, S3)">
                    Master atau diatasnya (S2, S3)
                  </option>
                </select>
              </div>
            </div>
          </div>

          {/* INFORMASI 2 */}
          <div className="mb-8">
            <h2 className="text-lg font-bold text-blue-600 border-b-2 border-blue-600 pb-2 mb-4">
              INFORMASI 2
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Alamat Tempat Tinggal
                </label>
                <select
                  name="alamat"
                  value={formData.alamat}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                >
                  <option value="">Pilih</option>
                  <option value="Sesuai">Sesuai</option>
                  <option value="Tidak Sesuai">Tidak Sesuai</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Kepemilikan Tempat Tinggal
                </label>
                <select
                  name="kepemilikan"
                  value={formData.kepemilikan}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                >
                  <option disabled value="">
                    Pilih
                  </option>
                  <option value="Lain-lain">Lain-lain</option>
                  <option value="Sewa / Kontrak">Sewa / Kontrak</option>
                  <option value="Milik Sendiri Masih Diangsur">
                    Milik Sendiri Masih Diangsur
                  </option>
                  <option value="Milik Sendiri">Milik Sendiri</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Lama Menempati
                </label>
                <select
                  name="lamaMenempati"
                  value={formData.lamaMenempati}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                >
                  <option disabled value="">
                    Pilih
                  </option>
                  <option value="<= 2 tahun">2 tahun atau kurang</option>
                  <option value="> 2 - 5 tahun">
                    lebih dari 2 tahun sampai 5 tahun
                  </option>
                  <option value="> 5 - 8 tahun">
                    lebih dari 5 tahun sampai 8 tahun
                  </option>
                  <option value="> 8 tahun">lebih dari 8 tahun</option>
                </select>
              </div>
            </div>
          </div>

          {/* INFORMASI 3 */}
          <div className="mb-8">
            <h2 className="text-lg font-bold text-blue-600 border-b-2 border-blue-600 pb-2 mb-4">
              INFORMASI 3
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Kategori Perusahaan
                </label>
                <select
                  name="kategoriPerusahaan"
                  value={formData.kategoriPerusahaan}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                >
                  <option disabled value="">
                    Pilih
                  </option>
                  <option value="Lembaga Departemen">Lembaga Departemen</option>
                  <option value="BUMD">BUMD</option>
                  <option value="SWASTA Tidak Punya Rating">
                    SWASTA Tidak Punya Rating
                  </option>
                  <option value="SWASTA Dengan Rating">
                    SWASTA Dengan Rating
                  </option>
                  <option value="SWASTA Kategori I">SWASTA Kategori I</option>
                  <option value="SWASTA Kategori II">SWASTA Kategori II</option>
                  <option value="SWASTA Kategori III">
                    SWASTA Kategori III
                  </option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Jabatan
                </label>
                <select
                  name="jabatan"
                  value={formData.jabatan}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                >
                  <option disabled value="">
                    Pilih
                  </option>
                  <option value="Staff">Staff</option>
                  <option value="Direktur">Direktur</option>
                  <option value="Komisaris">Komisaris</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Lama Bekerja
                </label>
                <select
                  name="lamaBekerja"
                  value={formData.lamaBekerja}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                >
                  <option disabled value="">
                    Pilih
                  </option>
                  <option value="<= 2 Tahun">2 Tahun atau kurang</option>
                  <option value="> 2 - 5 Tahun">
                    Lebih dari 2 Tahun sampai 5 Tahun
                  </option>
                  <option value="> 5 - 10 Tahun">
                    Lebih dari 5 Tahun sampai 10 Tahun
                  </option>
                  <option value="> 10 Tahun">Lebih dari 10 Tahun</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Pendapatan THP
                </label>
                <select
                  name="pendapatan"
                  value={formData.pendapatan}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                >
                  <option disabled value="">
                    Pilih
                  </option>
                  <option value="<= Rp 10 juta">Rp 10 juta atau kurang</option>
                  <option value="> Rp 10 - Rp 25 juta">
                    Lebih dari Rp 10 juta sampai Rp 25 juta
                  </option>
                  <option value="> Rp 25 - Rp 50 juta">
                    Lebih dari Rp 25 juta sampai Rp 50 juta
                  </option>
                  <option value="> Rp 50 juta">Lebih dari Rp 50 juta</option>
                </select>
              </div>
            </div>
          </div>

          {/* INFORMASI 4 */}
          <div className="mb-8">
            <h2 className="text-lg font-bold text-blue-600 border-b-2 border-blue-600 pb-2 mb-4">
              INFORMASI 4
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rekening Bank
                </label>
                <select
                  name="rekeningBank"
                  value={formData.rekeningBank}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                >
                  <option disabled value="">
                    Pilih
                  </option>
                  <option value="Tidak Ada">Tidak Ada</option>
                  <option value="Tabungan">Tabungan</option>
                  <option value="Giro">Giro</option>
                  <option value="Tabungan/Giro + Deposito">
                    Tabungan/Giro + Deposito
                  </option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rata-Rata Saldo
                </label>
                <select
                  name="saldo"
                  value={formData.saldo}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                >
                  <option disabled value="">
                    Pilih
                  </option>
                  <option value="< Rp 10 juta">Kurang dari Rp 10 juta</option>
                  <option value="Rp 10 - Rp 25 juta">Rp 10 - Rp 25 juta</option>
                  <option value="Rp 25 - Rp 50 juta">Rp 25 - Rp 50 juta</option>
                  <option value="> Rp 50 juta">Lebih dari Rp 50 juta</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Track Record Angsuran
                </label>
                <select
                  name="trackRecordPembayaranAngsuran"
                  value={formData.trackRecordPembayaranAngsuran}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                >
                  <option disabled value="">
                    Pilih
                  </option>
                  <option value="Peminjam Baru">Peminjam Baru</option>
                  <option value="Angsuran Terlambat Tapi Lancar">
                    Angsuran Terlambat Tapi Lancar
                  </option>
                  <option value="Angsuran Tepat Waktu">
                    Angsuran Tepat Waktu
                  </option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  SLIK
                </label>
                <select
                  name="slik"
                  value={formData.slik}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                >
                  <option disabled value="">
                    Pilih
                  </option>
                  <option value="Kolektibilitas 3 sd 5">
                    Kolektibilitas 3 sd 5
                  </option>
                  <option value="Ada tunggakan < 3 bulan">
                    Ada tunggakan kurang dari 3 bulan
                  </option>
                  <option value="Tidak Ada Fasilitas">
                    Tidak Ada Fasilitas
                  </option>
                  <option value="Lancar">Lancar</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Kepemilikan Kartu Kredit
                </label>
                <select
                  name="kepemilikanKartuKredit"
                  value={formData.kepemilikanKartuKredit}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                >
                  <option disabled value="">
                    Pilih
                  </option>
                  <option value="Tidak Ada">Tidak Ada</option>
                  <option value="Basic">Basic</option>
                  <option value="Gold">Gold</option>
                  <option value="Platinum atau di atasnya">
                    Platinum atau di atasnya
                  </option>
                </select>
              </div>
            </div>
          </div>

          {/* INFORMASI 5 */}
          <div className="mb-8">
            <h2 className="text-lg font-bold text-blue-600 border-b-2 border-blue-600 pb-2 mb-4">
              INFORMASI 5
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tenor
                </label>
                <select
                  name="tenor"
                  value={formData.tenor}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                >
                  <option disabled value="">
                    Pilih
                  </option>
                  <option value="> 15 Tahun">Lebih dari 15 Tahun</option>
                  <option value="> 10 - 15 Tahun">
                    Lebih dari 10 Tahun sampai 15 Tahun
                  </option>
                  <option value="> 5 - 10 Tahun">
                    Lebih dari 5 Tahun sampai 10 Tahun
                  </option>
                  <option value="<= 5 Tahun">5 Tahun atau kurang</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Debt Service Ratio (DSR)
                </label>
                <select
                  name="dsr"
                  value={formData.dsr}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                >
                  <option disabled value="">
                    Pilih
                  </option>
                  <option value="> 50%">Lebih dari 50%</option>
                  <option value="> 40 - 50%">Lebih dari 40% sampai 50%</option>
                  <option value="> 30 - 40%">Lebih dari 30% sampai 40%</option>
                  <option value="<= 30%">30% atau kurang</option>
                </select>
              </div>
            </div>
          </div>

          {/* INFORMASI 6 */}
          <div className="mb-8">
            <h2 className="text-lg font-bold text-blue-600 border-b-2 border-blue-600 pb-2 mb-4">
              INFORMASI 6
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Appraisal
                </label>
                <select
                  name="appraisal"
                  value={formData.appraisal}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                >
                  <option disabled value="">
                    Pilih
                  </option>
                  <option value="Tidak Direkomendasikan">
                    Tidak Direkomendasikan
                  </option>
                  <option value="Marketable">Marketable</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Luas Bangunan
                </label>
                <select
                  name="luasBangunan"
                  value={formData.luasBangunan}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                >
                  <option disabled value="">
                    Pilih
                  </option>
                  <option value="> 200 m2">Lebih dari 200 m2</option>
                  <option value="> 100 - 200 m2">
                    Lebih dari 100 m2 sampai 200 m2
                  </option>
                  <option value="> 45 - 100 m2">
                    Lebih dari 45 m2 sampai 100 m2
                  </option>
                  <option value="<= 45 m2">45 m2 atau kurang</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tujuan Pembiayaan
                </label>
                <select
                  name="tujuanPembiayaan"
                  value={formData.tujuanPembiayaan}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                >
                  <option disabled value="">
                    Pilih
                  </option>
                  <option value="Lain-lain">Lain-lain</option>
                  <option value="Disewakan / Investasi">
                    Disewakan / Investasi
                  </option>
                  <option value="Renovasi">Renovasi</option>
                  <option value="Pertama & Ditempati Sendiri">
                    Pertama & Ditempati Sendiri
                  </option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  LTV
                </label>
                <select
                  name="ltv"
                  value={formData.ltv}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                >
                  <option disabled value="">
                    Pilih
                  </option>
                  <option value="LTV > 100%">LTV lebih dari 100%</option>
                  <option value="LTV > 90%">LTV lebih dari 90%</option>
                  <option value="LTV > 80%">LTV lebih dari 80%</option>
                  <option value="LTV > 70%">LTV lebih dari 70%</option>
                  <option value="LTV <= 70%">LTV 70% atau kurang</option>
                </select>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 mb-6">
            {loadingScore ? (
              <button
                type="button"
                disabled
                className="bg-blue-400 text-white font-semibold py-3 px-8 rounded-lg transition duration-200 shadow-md cursor-not-allowed"
              >
                Memproses...
              </button>
            ) : (
              <button
                type="button"
                onClick={handleHitungSkor}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition duration-200 shadow-md hover:shadow-lg"
              >
                Hitung Skor
              </button>
            )}

            <button
              type="button"
              onClick={handleKembali}
              className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-3 px-8 rounded-lg transition duration-200 shadow-md hover:shadow-lg"
            >
              Kembali
            </button>
          </div>

          {/* Scoring Result */}
          {formData.scoringResult &&
            formData.scoringResult.summaryScore &&
            formData.scoringResult.riskLevel && (
              <div className="border-t-2 border-gray-200 pt-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">
                  Hasil Scoring
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Total Score
                    </label>
                    <div className="bg-gray-100 px-4 py-3 rounded-md">
                      <span className="text-2xl font-bold text-gray-800">
                        {formData.scoringResult.summaryScore.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Risk Level
                    </label>
                    <div
                      className={`${getRiskLevelColorBg(
                        formData.scoringResult.riskLevel
                      )} px-4 py-3 rounded-md`}
                    >
                      <span
                        className={`text-xl font-bold ${getRiskLevelColorText(
                          formData.scoringResult.riskLevel
                        )}`}
                      >
                        {formData.scoringResult.riskLevel}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
        </div>
      </div>
    </div>
  );
}
