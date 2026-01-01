const { hashPassword, comparePassword } = require("../helpers/bcrypt");
const { generateToken } = require("../helpers/jwt");
const UserAccountModel = require("../models/UserAccountModel");

module.exports = class AuthController {
  static async register(req, res) {
    const { username, password } = req.body;
    try {
      // check username dan password tidak kosong
      if (!username || !password) {
        throw { status: 400, message: "Username dan password wajib diisi" };
      }

      // check jika username sudah terdaftar
      const existingUser = await UserAccountModel.getUserAccountByUsername(
        username
      );
      if (existingUser) {
        throw { status: 400, message: "Username sudah terdaftar" };
      }

      // hash password
      const hashedPassword = hashPassword(password);

      // simpan ke database
      const newUserAccount = {
        username,
        password: hashedPassword,
      };
      await UserAccountModel.addUserAccount(newUserAccount);
      res.status(201).json({ message: "berhasil mendaftar" });
    } catch (err) {
      console.log("🚀 ~ register ~ err:", err);
      if (err.status === 400) {
        res.status(400).json({ error: err.message });
      } else {
        res.status(500).json({ error: "Internal Server Error" });
      }
    }
  }

  static async login(req, res) {
    const { username, password } = req.body;
    try {
      // check username dan password tidak kosong
      if (!username || !password) {
        throw { status: 400, message: "Username dan password wajib diisi" };
      }

      // check jika username terdaftar
      const userAccount = await UserAccountModel.getUserAccountByUsername(
        username
      );
      if (!userAccount) {
        throw { status: 400, message: "Username atau password salah" };
      }

      // check hash password
      const isPasswordValid = comparePassword(password, userAccount.password);
      if (!isPasswordValid) {
        throw { status: 400, message: "Username atau password salah" };
      }

      // generate token
      const token = generateToken({ username: userAccount.username });
      res.status(200).json({ token });
    } catch (err) {
      console.log("🚀 ~ login ~ err:", err);
      if (err.status === 400) {
        res.status(400).json({ error: err.message });
      } else {
        res.status(500).json({ error: "Internal Server Error" });
      }
    }
  }
};
