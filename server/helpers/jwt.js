const jwt = require("jsonwebtoken");

module.exports = {
  generateToken: (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET);
  },

  verifyToken: (token) => {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      return decoded;
    } catch (err) {
      if (err.name === "JsonWebTokenError") {
        return null;
      }
    }
  },
};
