const UserModel = require("../models/UserModel");

module.exports = class UserController {
  static async addUser(req, res) {
    try {
      const { nama, tempatLahir, jenisKelamin, alamat } = req.body;
      const tanggalLahir = new Date(req.body.tanggalLahir);
      const kodePos = Number(req.body.kodePos);
      const newUser = {
        nama,
        tempatLahir,
        tanggalLahir,
        jenisKelamin,
        alamat,
        kodePos,
      };

      const result = await UserModel.addUser(newUser);
      res.status(201).json({
        message: "Berhasil menambahkan user",
      });
    } catch (err) {
      console.log("🚀 ~ addUser ~ err:", err);
      if (err.status === 400) {
        res.status(400).json({ error: err.message });
      } else {
        res.status(500).json({ error: "Internal Server Error" });
      }
    }
  }
};
