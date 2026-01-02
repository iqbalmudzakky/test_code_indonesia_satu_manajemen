const { verifyToken } = require("../helpers/jwt");

module.exports = function authentication(req, res, next) {
  const authHeader = req.headers.authorization;
  console.log("🚀 ~ authentication ~ authHeader:", authHeader);
  try {
    if (!authHeader) {
      throw {
        status: 401,
        message: "Akses tidak diizinkan, header authorization tidak ditemukan.",
      };
    }

    const token = authHeader.split(" ")[1];
    const decoded = verifyToken(token);
    if (!decoded) {
      throw { status: 401, message: "Token tidak valid." };
    }
    req.username = decoded;
    next();
  } catch (err) {
    console.log("🚀 ~ authentication ~ err:", err);
    if (err.status === 401) {
      return res.status(err.status).json({ error: err.message });
    } else {
      return res.status(500).json({ error: "Terjadi kesalahan pada server." });
    }
  }
};
