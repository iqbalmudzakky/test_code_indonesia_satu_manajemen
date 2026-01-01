module.exports = function handleInfo3(
  kategoriPerusahaan,
  jabatan,
  lamaBekerja,
  pendapatan
) {
  let score = 0;
  let bobotB = 0.2;

  // bobot D
  let bobotDKategoriPerusahaan = 0.2;
  let bobotDJabatan = 0.2;
  let bobotDLamaBekerja = 0.2;
  let bobotDPendapatan = 0.4;

  // handle bobot F Kategori Perusahaan
  let bobotFKategoriPerusahaan = 0;
  switch (kategoriPerusahaan) {
    case "Lembaga Departemen":
      bobotFKategoriPerusahaan = 100;
      break;
    case "BUMD":
      bobotFKategoriPerusahaan = 25;
      break;
    case "SWASTA Tidak Punya Rating":
      bobotFKategoriPerusahaan = 100;
      break;
    case "SWASTA Dengan Rating":
      bobotFKategoriPerusahaan = 25;
      break;
    case "SWASTA Kategori I":
      bobotFKategoriPerusahaan = 75;
      break;
    case "SWASTA Kategori II":
      bobotFKategoriPerusahaan = 50;
      break;
    case "SWASTA Kategori III":
      bobotFKategoriPerusahaan = 0;
      break;
  }

  // handle bobot F Jabatan
  let bobotFJabatan = 0;
  switch (jabatan) {
    case "Staff":
      bobotFJabatan = 25;
      break;
    case "Direktur":
      bobotFJabatan = 75;
      break;
    case "Komisaris":
      bobotFJabatan = 100;
      break;
  }

  // handle bobot F Lama Bekerja
  let bobotFLamaBekerja = 0;
  switch (lamaBekerja) {
    case "<= 2 Tahun":
      bobotFLamaBekerja = 0;
      break;
    case "> 2 - 5 Tahun":
      bobotFLamaBekerja = 25;
      break;
    case "> 5 - 10 Tahun":
      bobotFLamaBekerja = 75;
      break;
    case "> 10 Tahun":
      bobotFLamaBekerja = 100;
      break;
  }

  // handle bobot F Pendapatan
  let bobotFPendapatan = 0;
  switch (pendapatan) {
    case "<= Rp 10 juta":
      bobotFPendapatan = 25;
      break;
    case "> Rp 10 - Rp 25 juta":
      bobotFPendapatan = 50;
      break;
    case "> Rp 25 - Rp 50 juta":
      bobotFPendapatan = 75;
      break;
    case "> Rp 50 juta":
      bobotFPendapatan = 100;
      break;
  }

  // bobot H
  const bobotHKategoriPerusahaan =
    bobotDKategoriPerusahaan * bobotFKategoriPerusahaan;
  const bobotHJabatan = bobotDJabatan * bobotFJabatan;
  const bobotHLamaBekerja = bobotDLamaBekerja * bobotFLamaBekerja;
  const bobotHPendapatan = bobotDPendapatan * bobotFPendapatan;
  const summaryBobotH =
    bobotHKategoriPerusahaan +
    bobotHJabatan +
    bobotHLamaBekerja +
    bobotHPendapatan;

  score = summaryBobotH * bobotB;
  return score;
};
