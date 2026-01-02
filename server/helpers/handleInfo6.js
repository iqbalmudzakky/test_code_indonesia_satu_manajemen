module.exports = function handleInfo6(
  appraisal,
  tujuanPembiayaan,
  ltv,
  luasBangunan
) {
  let score = 0;
  let bobotB = 0.25;

  // bobot D
  let bobotDAppraisal = 0.1;
  let bobotDTujuanPembiayaan = 0.1;
  let bobotDLTV = 0.6;
  let bobotDLuasBangunan = 0.2;

  // handle bobot F Appraisal
  let bobotFAppraisal = 0;
  switch (appraisal) {
    case "Tidak Direkomendasikan":
      bobotFAppraisal = 0;
      break;
    case "Marketable":
      bobotFAppraisal = 100;
      break;
  }

  // handle bobot F Tujuan Pembiayaan
  let bobotFTujuanPembiayaan = 0;
  switch (tujuanPembiayaan) {
    case "Lain-lain":
      bobotFTujuanPembiayaan = 25;
      break;
    case "Disewakan / Investasi":
      bobotFTujuanPembiayaan = 50;
      break;
    case "Renovasi":
      bobotFTujuanPembiayaan = 75;
      break;
    case "Pertama & Ditempati Sendiri":
      bobotFTujuanPembiayaan = 100;
      break;
  }

  // handle bobot F LTV
  let bobotFLTV = 0;
  switch (ltv) {
    case "LTV > 100%":
      bobotFLTV = 0;
      break;
    case "LTV > 90%":
      bobotFLTV = 25;
      break;
    case "LTV > 80%":
      bobotFLTV = 50;
      break;
    case "LTV > 70%":
      bobotFLTV = 75;
      break;
    case "LTV <= 70%":
      bobotFLTV = 100;
      break;
  }

  // handle bobot F Luas Bangunan
  let bobotFLuasBangunan = 0;
  switch (luasBangunan) {
    case "> 200 m2":
      bobotFLuasBangunan = 25;
      break;
    case "> 100 - 200 m2":
      bobotFLuasBangunan = 50;
      break;
    case "> 45 - 100 m2":
      bobotFLuasBangunan = 75;
      break;
    case "<= 45 m2":
      bobotFLuasBangunan = 100;
      break;
  }

  // bobot H
  const bobotHAppraisal = bobotDAppraisal * bobotFAppraisal;
  const bobotHTujuanPembiayaan =
    bobotDTujuanPembiayaan * bobotFTujuanPembiayaan;
  const bobotHLTV = bobotDLTV * bobotFLTV;
  const bobotHLuasBangunan = bobotDLuasBangunan * bobotFLuasBangunan;
  const summaryBobotH =
    bobotHAppraisal + bobotHTujuanPembiayaan + bobotHLTV + bobotHLuasBangunan;

  score = summaryBobotH * bobotB;
  return score;
};
