const jwt = require("jsonwebtoken");
const key = process.env.KEY || "!@df78#$g45h%^66tty";
function createToken(payload) {
  return jwt.sign(payload, key, { expiresIn: 60 * 60 });
}

function verifyToken(token) {
  return jwt.verify(token, key);
}

module.exports = { createToken, verifyToken };
