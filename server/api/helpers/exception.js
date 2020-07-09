let util = require("util");

const SUCCESS_CODE = 200;
const INVALID_CODE = 400;
const NOT_PERMISSION_CODE = 403;

const TOKEN_INVALID = {
  code: INVALID_CODE,
  message: "Token is invalid.",
};

const EXCEPTION_DATABASE = {
  code: INVALID_CODE,
  message: "Exception to connect database.",
};

const DATA_NOT_FOUND = {
  code: INVALID_CODE,
  message: "Data not found.",
};

const HAVE_NOT_PERMISSION_ACCESS_DOJO = {
  code: NOT_PERMISSION_CODE,
  message: "User does not have permission access to ZaloPay Dojo.",
};

const HAVE_NOT_PERMISSION = {
  code: NOT_PERMISSION_CODE,
  message: "User does not have permission.",
};

const DISABLED_USER = {
  code: INVALID_CODE,
  message:
    "Your account has been disabled, please contact your system administrator for more information",
};

const CANNOT_VERIFY_TOKEN = {
  code: INVALID_CODE,
  message:
    "Your account has been disabled, please contact your system administrator for more information",
};

const INVALID_USER = {
  code: INVALID_CODE,
  message: "User name or password is incorrect!",
};

function getResponseMessage(model, action) {
  return {
    code: SUCCESS_CODE,
    message: action + " " + model + " is successful.",
  };
}

function responseSuccess(value, res) {
  return res.status(value["status"]).json(value["response"]);
}

module.exports = {
  SUCCESS_CODE,
  INVALID_CODE,
  NOT_PERMISSION_CODE,
  TOKEN_INVALID,
  EXCEPTION_DATABASE,
  DATA_NOT_FOUND,
  HAVE_NOT_PERMISSION_ACCESS_DOJO,
  DISABLED_USER,
  CANNOT_VERIFY_TOKEN,
  INVALID_USER,
  HAVE_NOT_PERMISSION,
  getResponseMessage,
  responseSuccess,
};
