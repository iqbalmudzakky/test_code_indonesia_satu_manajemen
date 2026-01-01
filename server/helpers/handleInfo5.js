module.exports = function handleInfo5(tenor, dsr) {
  let score = 0;
  let bobotB = 0.3;

  // bobot D
  let bobotDTenor = 0.25;
  let bobotDDSR = 0.75;

  // handle bobot F Tenor
  let bobotFTenor = 0;
  switch (tenor) {
    case "> 15 Tahun":
      bobotFTenor = 25;
      break;
    case "> 10 - 15 Tahun":
      bobotFTenor = 50;
      break;
    case "> 5 - 10 Tahun":
      bobotFTenor = 75;
      break;
    case "<= 5 Tahun":
      bobotFTenor = 100;
      break;
  }

  // handle bobot F DSR
  let bobotFDSR = 0;
  switch (dsr) {
    case "> 50%":
      bobotFDSR = 0;
      break;
    case "> 40 - 50%":
      bobotFDSR = 50;
      break;
    case "> 30 - 40%":
      bobotFDSR = 75;
      break;
    case "<= 30%":
      bobotFDSR = 100;
      break;
  }

  // bobot H
  const bobotHTenor = bobotFTenor * bobotDTenor;
  const bobotHDSR = bobotFDSR * bobotDDSR;
  const summaryBobotH = bobotHTenor + bobotHDSR;

  score = summaryBobotH * bobotB;
  return score;
};
