module.exports = function handleInfo2(alamat, kepemilikan, lamaMenempati) {
  let score = 0;
  let bobotB = 0.05;

  // bobot D
  let bobotDAlamat = 0.4;
  let bobotDKepemilikan = 0.3;
  let bobotDLamaMenempati = 0.3;

  // handle bobot F Alamat
  let bobotFAlamat = 0;
  switch (alamat) {
    case "Sesuai":
      bobotFAlamat = 100;
      break;
    case "Tidak Sesuai":
      bobotFAlamat = 25;
      break;
  }

  // handle bobot F Kepemilikan
  let bobotFKepemilikan = 0;
  switch (kepemilikan) {
    case "Lain-lain":
      bobotFKepemilikan = 25;
      break;
    case "Sewa / Kontrak":
      bobotFKepemilikan = 50;
      break;
    case "Milik Sendiri Masih Diangsur":
      bobotFKepemilikan = 75;
      break;
    case "Milik Sendiri":
      bobotFKepemilikan = 100;
      break;
  }

  // handle bobot F Lama Menempati
  let bobotFLamaMenempati = 0;
  switch (lamaMenempati) {
    case "<= 2 tahun":
      bobotFLamaMenempati = 25;
      break;
    case "> 2 - 5 tahun":
      bobotFLamaMenempati = 50;
      break;
    case "> 5 - 8 tahun":
      bobotFLamaMenempati = 75;
      break;
    case "> 8 tahun":
      bobotFLamaMenempati = 100;
      break;
  }

  // bobot H
  const bobotHAlamat = bobotDAlamat * bobotFAlamat;
  const bobotHKepemilikan = bobotDKepemilikan * bobotFKepemilikan;
  const bobotHLamaMenempati = bobotDLamaMenempati * bobotFLamaMenempati;
  const summaryBobotH = bobotHAlamat + bobotHKepemilikan + bobotHLamaMenempati;

  score = summaryBobotH * bobotB;
  return score;
};
