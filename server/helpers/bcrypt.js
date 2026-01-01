const bcrypt = require("bcryptjs");

module.exports = {
  hashPassword: (password) => {
    const hashPassword = bcrypt.hashSync(password, 10);
    return hashPassword;
  },
  comparePassword: (password, hashedPassword) => {
    return bcrypt.compareSync(password, hashedPassword);
  },
};
