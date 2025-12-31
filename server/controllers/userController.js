const UserModel = require("../models/UserModel");

module.exports = class UserController {
  static async addUser(req, res) {
    await run().catch(console.dir);
    try {
      const { nama, tempatLahir, jenisKelamin, alamat } = req.body;

      // handle noAplikasi
      const userCount = await UserModel.countUsers();
      let noAplikasi = "";
      if (userCount === 0) {
        noAplikasi = 1;
      } else {
        noAplikasi = userCount + 1;
      }

      const summaryScore = 0;
      const riskLevel = "";
      const tanggalLahir = new Date(req.body.tanggalLahir);
      const kodePos = Number(req.body.kodePos);
      const newUser = {
        noAplikasi,
        nama,
        tempatLahir,
        tanggalLahir,
        jenisKelamin,
        alamat,
        kodePos,
        summaryScore,
        riskLevel,
      };
    } catch (err) {
      console.log("🚀 ~ addUser ~ err:", err);
    }
  }
};
