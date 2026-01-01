const db = require("../config/mongoDB");

module.exports = class UserAccountModel {
  static getCollection() {
    return db.collection("user_accounts");
  }

  static async getUserAccountByUsername(username) {
    const collection = this.getCollection();
    const userAccount = await collection.findOne({ username });
    return userAccount;
  }

  static async addUserAccount(userAccountData) {
    const collection = this.getCollection();
    const result = await collection.insertOne(userAccountData);
    return result;
  }
};
