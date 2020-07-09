let util = require("util");
let jwt = require("jsonwebtoken");
const {
  HAVE_NOT_PERMISSION,
  TOKEN_INVALID,
  NOT_PERMISSION_CODE,
  INVALID_CODE,
} = require("./exception");
const ZALOPAY_DOJO_PRIVATE_KEY = "ZALOPAYDOJO_PRIVATE_KEY";
const ROLE = {
  // Admin
  1: [
    "userQuery",
    "userCreate",
    "userUpdate",
    "userRemove",
    "questionCreate",
    "questionQuery",
    "questionRemove",
  ],

  // 2: User
  2: ["questionQuery"],
};
module.exports = {
  generateToken,
  getUsername,
  validate,
  getUser,
};

function validate(token, method, res) {
  let user = checkToken(token);
  if (!user.isValid) {
    res.status(INVALID_CODE).json(TOKEN_INVALID);
    return false;
  }
  if (!checkPermission(method, user.role)) {
    res.status(NOT_PERMISSION_CODE).json(HAVE_NOT_PERMISSION);
    return false;
  }
  return true;
}

function generateToken(username, role) {
  return jwt.sign(
    {
      username: username,
      role: role,
      exp: Date.now() + 86400000,
    },
    ZALOPAY_DOJO_PRIVATE_KEY
  );
}

function checkToken(token) {
  try {
    let decoded = jwt.verify(token, ZALOPAY_DOJO_PRIVATE_KEY);
    return {
      username: decoded.username,
      role: parseInt(decoded.role),
      isValid: true,
      isExpired: Date.now() > decoded.exp,
    };
  } catch (err) {
    return {
      username: "",
      role: 0,
      isValid: false,
      isExpired: true,
    };
  }
}

function checkPermission(method, role) {
  return ROLE[role].indexOf(method) !== -1;
}

function getUsername(token) {
  try {
    let decoded = jwt.verify(token, ZALOPAY_DOJO_PRIVATE_KEY);
    return decoded.username;
  } catch (err) {
    return null;
  }
}

function getUser(token) {
  return checkToken(token);
}
