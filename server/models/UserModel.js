const db = require("../config/mongoDB");

module.exports = class UserModel {
  static getCollection() {
    return db.collection("users");
  }

  static async getUserByNama(nama) {
    const collection = this.getCollection();
    const user = await collection.findOne({ nama });
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
    const summaryScore = 0;
    const riskLevel = "";

    userData.noAplikasi = noAplikasi;
    userData.summaryScore = summaryScore;
    userData.riskLevel = riskLevel;

    const result = await collection.insertOne(userData);
    // kembalikan id dan noAplikasi
    return { id: result.insertedId, noAplikasi };
  }
};
