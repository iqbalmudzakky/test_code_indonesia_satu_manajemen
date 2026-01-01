const { ObjectId } = require("mongodb");
const db = require("../config/mongoDB");

module.exports = class UserDetailModel {
  static getCollection() {
    return db.collection("user_details");
  }

  static async getUserByNoAplikasi(noAplikasi) {
    const agg = [
      {
        $match: { noAplikasi: Number(noAplikasi) },
      },
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "scoringResult",
        },
      },
      {
        $unwind: {
          path: "$scoringResult",
        },
      },
      {
        $project: {
          "scoringResult._id": false,
          "scoringResult.nama": false,
          "scoringResult.tempatLahir": false,
          "scoringResult.tanggalLahir": false,
          "scoringResult.jenisKelamin": false,
          "scoringResult.alamat": false,
          "scoringResult.kodePos": false,
          "scoringResult.noAplikasi": false,
        },
      },
    ];
    const collection = this.getCollection();
    const userDetail = await collection.aggregate(agg).next();
    return userDetail;
  }

  static async addUserDetailById(userId, noAplikasi) {
    const collection = this.getCollection();

    const userDetailData = {
      userId: new ObjectId(userId),
      noAplikasi: Number(noAplikasi),
      alamat: "",
      appraisal: "",
      dsr: "",
      jabatan: "",
      kategoriPerusahaan: "",
      kepemilikan: "",
      kepemilikanKartuKredit: "",
      lamaBekerja: "",
      lamaMenempati: "",
      ltv: "",
      luasBangunan: "",
      pendapatan: "",
      pendidikan: "",
      rekeningBank: "",
      saldo: "",
      slik: "",
      statusPerkawinan: "",
      tenor: "",
      trackRecordPembayaranAngsuran: "",
      tujuanPembiayaan: "",
      umurPemohon: "",
      umurPemohonTenor: "",
    };
    const result = await collection.insertOne(userDetailData);
    return result;
  }

  static async updateUserDetailByNoAplikasi(noAplikasi, updateData) {
    const collection = this.getCollection();
    const result = await collection.updateOne(
      { noAplikasi: Number(noAplikasi) },
      {
        $set: updateData,
      }
    );
    return result;
  }

  static async deleteUserDetailByNoAplikasi(noAplikasi) {
    const collection = this.getCollection();
    const result = await collection.deleteOne({
      noAplikasi: Number(noAplikasi),
    });
    return result;
  }
};
