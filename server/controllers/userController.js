const handleInfo1 = require("../helpers/handleInfo1");
const handleInfo2 = require("../helpers/handleInfo2");
const handleInfo3 = require("../helpers/handleInfo3");
const UserDetailModel = require("../models/UserDetailModel");
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

      // handle default data user detail
      const userId = result.id;
      const noAplikasi = result.noAplikasi;
      const resultDetail = await UserDetailModel.addUserDetailById(
        userId,
        noAplikasi
      );

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

  static async updateUserDetail(req, res) {
    const {
      umurPemohon,
      umurPemohonTenor,
      statusPerkawinan,
      pendidikan,
      alamat,
      appraisal,
      dsr,
      jabatan,
      kategoriPerusahaan,
      kepemilikan,
      kepemilikanKartuKredit,
      lamaBekerja,
      lamaMenempati,
      ltv,
      luasBangunan,
      pendapatan,
      rekeningBank,
      saldo,
      slik,
      tenor,
      trackRecordPembayaranAngsuran,
      tujuanPembiayaan,
    } = req.body;

    const resInfo1 = handleInfo1(
      umurPemohon,
      umurPemohonTenor,
      statusPerkawinan,
      pendidikan
    );

    const resInfo2 = handleInfo2(alamat, kepemilikan, lamaMenempati);

    const resInfo3 = handleInfo3(
      kategoriPerusahaan,
      jabatan,
      lamaBekerja,
      pendapatan
    );
  }
};
