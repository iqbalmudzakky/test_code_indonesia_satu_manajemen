const db = require("../config/mongoDB");

module.exports = class UserModel {
  static getCollection() {
    return db.collection("users");
  }

  static async getAllUsers(limit, skip) {
    const collection = this.getCollection();
    const users = await collection
      .find()
      .skip(Number(skip))
      .limit(Number(limit))
      .toArray();
    const page = Math.floor(skip / limit) + 1;
    const totalPages = Math.ceil((await collection.countDocuments()) / limit);
    return { users, page, totalPages };
  }

  static async getUserByNama(nama) {
    const collection = this.getCollection();
    const user = await collection.findOne({ nama });
    return user;
  }

  static async getUserByNoAplikasi(noAplikasi) {
    const collection = this.getCollection();
    const user = await collection.findOne({ noAplikasi: Number(noAplikasi) });
    return user;
  }

  static async addUser(userData) {
    const collection = this.getCollection();

    // handle unique nama
    const existingUser = await this.getUserByNama(userData.nama);
    if (existingUser) {
      throw { status: 400, message: "Nama sudah terdaftar" };
    }

    // handle noAplikasi auto increment
    const user = await collection
      .find()
      .sort({ noAplikasi: -1 })
      .limit(1)
      .toArray();
    const noAplikasi = user.length > 0 ? user[0].noAplikasi + 1 : 1;
    const summaryScore = "";
    const riskLevel = "";

    userData.noAplikasi = noAplikasi;
    userData.summaryScore = summaryScore;
    userData.riskLevel = riskLevel;

    const result = await collection.insertOne(userData);
    // kembalikan id dan noAplikasi
    return { id: result.insertedId, noAplikasi };
  }

  static async updateUserByNoAplikasi(noAplikasi, summaryScore, riskLevel) {
    const collection = this.getCollection();
    const result = await collection.updateOne(
      { noAplikasi: Number(noAplikasi) },
      {
        $set: {
          summaryScore,
          riskLevel,
        },
      }
    );
    return result;
  }

  static async deleteUserByNoAplikasi(noAplikasi) {
    const collection = this.getCollection();
    const result = await collection.deleteOne({
      noAplikasi: Number(noAplikasi),
    });
    return result;
  }
};
