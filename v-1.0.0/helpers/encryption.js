const bcrypt = require("bcryptjs");

const encrypt = (str) => {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(str, salt);
};

const compare = (plainTxt, hash) => {
  return bcrypt.compareSync(plainTxt, hash);
};

module.exports = { encrypt, compare };
