const handleInfo1 = require("../helpers/handleInfo1");
const handleInfo2 = require("../helpers/handleInfo2");
const handleInfo3 = require("../helpers/handleInfo3");
const handleInfo4 = require("../helpers/handleInfo4");
const handleInfo5 = require("../helpers/handleInfo5");
const handleInfo6 = require("../helpers/handleInfo6");
const UserDetailModel = require("../models/UserDetailModel");
const UserModel = require("../models/UserModel");

module.exports = class UserController {
  static async getAllUsers(req, res) {
    try {
      const users = await UserModel.getAllUsers();
      console.log("🚀 ~ getAllUsers ~ users:", users);
      res.status(200).json({
        data: users,
      });
    } catch (err) {
      console.log("🚀 ~ getAllUsers ~ err:", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  static async getUserDetailByNoAplikasi(req, res) {
    const { noAplikasi } = req.params;
    try {
      // check data user ada atau tidak
      const user = await UserDetailModel.getUserByNoAplikasi(noAplikasi);
      if (!user) {
        throw { status: 404, message: "User tidak ditemukan" };
      }
      res.status(200).json({
        data: user,
      });
    } catch (err) {
      console.log("🚀 ~ getUserDetailByNoAplikasi ~ err:", err);
      if (err.status === 404) {
        res.status(404).json({ error: err.message });
      } else {
        res.status(500).json({ error: "Internal Server Error" });
      }
    }
  }

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
    const { noAplikasi } = req.params;

    try {
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

      // validasi form, tidak boleh ada value kosong
      if (
        !umurPemohon ||
        !umurPemohonTenor ||
        !statusPerkawinan ||
        !pendidikan ||
        !alamat ||
        !appraisal ||
        !dsr ||
        !jabatan ||
        !kategoriPerusahaan ||
        !kepemilikan ||
        !kepemilikanKartuKredit ||
        !lamaBekerja ||
        !lamaMenempati ||
        !ltv ||
        !luasBangunan ||
        !pendapatan ||
        !rekeningBank ||
        !saldo ||
        !slik ||
        !tenor ||
        !trackRecordPembayaranAngsuran ||
        !tujuanPembiayaan
      ) {
        throw { status: 400, message: "Semua field harus diisi" };
      }

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

      const resInfo4 = handleInfo4(
        rekeningBank,
        saldo,
        trackRecordPembayaranAngsuran,
        slik,
        kepemilikanKartuKredit
      );

      const resInfo5 = handleInfo5(tenor, dsr);

      const resInfo6 = handleInfo6(
        appraisal,
        tujuanPembiayaan,
        ltv,
        luasBangunan
      );

      const totalScore =
        resInfo1 + resInfo2 + resInfo3 + resInfo4 + resInfo5 + resInfo6;
      const updateData = {
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
      };

      // handle computasi score
      const summaryScore = totalScore;
      let riskLevel = "";
      if (summaryScore > 70) {
        riskLevel = "Low Risk";
      } else if (summaryScore > 55) {
        riskLevel = "Medium Risk";
      } else {
        riskLevel = "High Risk";
      }

      // check data user ada atau tidak
      const existingUser = await UserModel.getUserByNoAplikasi(noAplikasi);
      if (!existingUser) {
        throw { status: 404, message: "User tidak ditemukan" };
      }

      // update data collection users
      const resUpdateUser = await UserModel.updateUserByNoAplikasi(
        noAplikasi,
        summaryScore,
        riskLevel
      );

      // update data collection user_details
      const resUserDetail = await UserDetailModel.updateUserDetailByNoAplikasi(
        noAplikasi,
        updateData
      );
      res.status(200).json({
        message: "Berhasil memperbarui data user",
      });
    } catch (err) {
      console.log("🚀 ~ updateUserDetail ~ err:", err);
      if (err.status === 400) {
        res.status(400).json({ error: err.message });
      } else if (err.status === 404) {
        res.status(404).json({ error: err.message });
      } else {
        res.status(500).json({ error: "Internal Server Error" });
      }
    }
  }

  static async deleteUser(req, res) {
    const { noAplikasi } = req.params;
    try {
      // check data user ada atau tidak
      const existingUser = await UserModel.getUserByNoAplikasi(noAplikasi);
      if (!existingUser) {
        throw { status: 404, message: "User tidak ditemukan" };
      }

      // delete user dari collection user_details
      const resDeleteUserDetail =
        await UserDetailModel.deleteUserDetailByNoAplikasi(noAplikasi);

      // delete user dari collection users
      const resDeleteUser = await UserModel.deleteUserByNoAplikasi(noAplikasi);

      res.status(200).json({
        message: "Berhasil menghapus user",
      });
    } catch (err) {
      console.log("🚀 ~ deleteUser ~ err:", err);
      if (err.status === 404) {
        return res.status(404).json({ error: err.message });
      } else {
        res.status(500).json({ error: "Internal Server Error" });
      }
    }
  }
};
