module.exports = function handleInfo1(
  umurPemohon,
  umurPemohonTenor,
  statusPerkawinan,
  pendidikan
) {
  let score = 0;
  let bobotB = 0.05;

  // bobot D
  let bobotDUmurPemohon = 0.3;
  let bobotDUmurPemohonTenor = 0.1;
  let bobotDStatusPerkawinan = 0.4;
  let bobotDPendidikan = 0.2;

  // handle bobot F Umur Pemohon
  let bobotFUmurPemohon = 0;
  switch (umurPemohon) {
    case "21 - 30 Tahun":
      bobotFUmurPemohon = 50;
      break;
    case "31 - 45 Tahun":
      bobotFUmurPemohon = 100;
      break;
    case "46 - 55 Tahun":
      bobotFUmurPemohon = 75;
      break;
    case "56 - 65 Tahun":
      bobotFUmurPemohon = 25;
      break;
  }

  // handle bobot F Umur Pemohon Tenor
  let bobotFUmurPemohonTenor = 0;
  switch (umurPemohonTenor) {
    case "Diatas Ketentuan":
      bobotFUmurPemohonTenor = 25;
      break;
    case "Dibawah Ketentuan":
      bobotFUmurPemohonTenor = 100;
      break;
  }

  // handle bobot F Status Perkawinan
  let bobotFStatusPerkawinan = 0;
  switch (statusPerkawinan) {
    case "Belum Kawin dengan > 2 tanggungan":
      bobotFStatusPerkawinan = 25;
      break;
    case "Belum Kawin dengan <= 2 tanggungan":
      bobotFStatusPerkawinan = 45;
      break;
    case "Belum Kawin dengan 0 tanggungan":
      bobotFStatusPerkawinan = 65;
      break;
    case "Kawin dengan > 2 tanggungan":
      bobotFStatusPerkawinan = 85;
      break;
    case "Kawin dengan <= 2 tanggungan":
      bobotFStatusPerkawinan = 100;
      break;
  }

  // handle bobot F Pendidikan
  let bobotFPendidikan = 0;
  switch (pendidikan) {
    case "SMA atau dibawahnya":
      bobotFPendidikan = 25;
      break;
    case "D1, D2, D3, D4":
      bobotFPendidikan = 50;
      break;
    case "S1":
      bobotFPendidikan = 75;
      break;
    case "Master atau diatasnya (S2, S3)":
      bobotFPendidikan = 100;
      break;
  }

  // bobot H
  const bobotHUmurPemohon = bobotDUmurPemohon * bobotFUmurPemohon;
  const bobotHUmurPemohonTenor =
    bobotDUmurPemohonTenor * bobotFUmurPemohonTenor;
  const bobotHStatusPerkawinan =
    bobotDStatusPerkawinan * bobotFStatusPerkawinan;
  const bobotHPendidikan = bobotDPendidikan * bobotFPendidikan;
  const summaryBobotH =
    bobotHUmurPemohon +
    bobotHUmurPemohonTenor +
    bobotHStatusPerkawinan +
    bobotHPendidikan;

  score = summaryBobotH * bobotB;
  return score;
};
