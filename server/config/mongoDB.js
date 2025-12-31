const { MongoClient } = require("mongodb");
const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);
const db = client.db("test_code_indonesia_satu_manajemen");

module.exports = db;
