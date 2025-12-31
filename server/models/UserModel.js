const db = require("../config/mongoDB");

module.exports = class UserModel {
  static getCollection() {
    return db.collection("users");
  }

  static async countUsers() {
    const collection = this.getCollection();
    return await collection.countDocuments();
  }
};
