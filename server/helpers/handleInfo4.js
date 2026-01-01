module.exports = function handleInfo4(
  rekeningBank,
  saldo,
  trackRecordPembayaranAngsuran,
  slik,
  kepemilikanKartuKredit
) {
  let score = 0;
  let bobotB = 0.15;

  // bobot D
  let bobotDRekeningBank = 0.1;
  let bobotDSaldo = 0.15;
  let bobotDTrackRecordPembayaranAngsuran = 0.15;
  let bobotDSlik = 0.4;
  let bobotDKepemilikanKartuKredit = 0.2;

  // handle bobot F Rekening Bank
  let bobotFRekeningBank = 0;
  switch (rekeningBank) {
    case "Tidak Ada":
      bobotFRekeningBank = 25;
      break;
    case "Tabungan":
      bobotFRekeningBank = 50;
      break;
    case "Giro":
      bobotFRekeningBank = 75;
      break;
    case "Tabungan/Giro + Deposito":
      bobotFRekeningBank = 100;
      break;
  }

  // handle bobot F Saldo
  let bobotFSaldo = 0;
  switch (saldo) {
    case "< Rp 10 juta":
      bobotFSaldo = 25;
      break;
    case "Rp 10 - Rp 25 juta":
      bobotFSaldo = 50;
      break;
    case "Rp 25 - Rp 50 juta":
      bobotFSaldo = 75;
      break;
    case "> Rp 50 juta":
      bobotFSaldo = 100;
      break;
  }

  // handle bobot F Track Record Pembayaran Angsuran
  let bobotFTrackRecordPembayaranAngsuran = 0;
  switch (trackRecordPembayaranAngsuran) {
    case "Peminjam Baru":
      bobotFTrackRecordPembayaranAngsuran = 25;
      break;
    case "Angsuran Terlambat Tapi Lancar":
      bobotFTrackRecordPembayaranAngsuran = 50;
      break;
    case "Angsuran Tepat Waktu":
      bobotFTrackRecordPembayaranAngsuran = 100;
      break;
  }

  // handle bobot F Slik
  let bobotFSlik = 0;
  switch (slik) {
    case "Kolektibilitas 3 sd 5":
      bobotFSlik = 0;
      break;
    case "Ada tunggakan < 3 bulan":
      bobotFSlik = 50;
      break;
    case "Tidak Ada Fasilitas":
      bobotFSlik = 75;
      break;
    case "Lancar":
      bobotFSlik = 100;
      break;
  }

  // handle bobot F Kepemilikan Kartu Kredit
  let bobotFKepemilikanKartuKredit = 0;
  switch (kepemilikanKartuKredit) {
    case "Tidak Ada":
      bobotFKepemilikanKartuKredit = 25;
      break;
    case "Basic":
      bobotFKepemilikanKartuKredit = 50;
      break;
    case "Gold":
      bobotFKepemilikanKartuKredit = 75;
      break;
    case "Platinum atau di atasnya":
      bobotFKepemilikanKartuKredit = 100;
      break;
  }

  // bobot H
  const bobotHRekeningBank = bobotDRekeningBank * bobotFRekeningBank;
  const bobotHSaldo = bobotDSaldo * bobotFSaldo;
  const bobotHTrackRecordPembayaranAngsuran =
    bobotDTrackRecordPembayaranAngsuran * bobotFTrackRecordPembayaranAngsuran;
  const bobotHSlik = bobotDSlik * bobotFSlik;
  const bobotHKepemilikanKartuKredit =
    bobotDKepemilikanKartuKredit * bobotFKepemilikanKartuKredit;
  const summaryBobotH =
    bobotHRekeningBank +
    bobotHSaldo +
    bobotHTrackRecordPembayaranAngsuran +
    bobotHSlik +
    bobotHKepemilikanKartuKredit;

  score = summaryBobotH * bobotB;
  return score;
};
