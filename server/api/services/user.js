"use strict";

var util = require("util");
const {
  DATA_NOT_FOUND,
  DISABLED_USER,
  EXCEPTION_DATABASE,
  HAVE_NOT_PERMISSION_ACCESS_DOJO,
  NOT_PERMISSION_CODE,
  SUCCESS_CODE,
  INVALID_CODE,
  getResponseMessage,
} = require("../helpers/exception");
const { User } = require("../models/user");
const { generateToken } = require("../helpers/token");
const MODEL = "User";

module.exports = {
  userLogin,
  userQuery,
  userCreate,
  userUpdate,
  userRemove,
};

function userLogin(username, password) {
  return new Promise((resolve, reject) => {
        User.findOne({ username, password }, (err, user) => {
          if (err) {
            console.log(err);
            return resolve({
              status: INVALID_CODE,
              response: EXCEPTION_DATABASE,
            });
          }

          if (!user)
            return resolve({
              status: NOT_PERMISSION_CODE,
              response: HAVE_NOT_PERMISSION_ACCESS_DOJO,
            });
          if (!user.isActive)
            return resolve({
              status: NOT_PERMISSION_CODE,
              response: DISABLED_USER,
            });

          let token = generateToken(user.username, user.role);
          return resolve({
            status: SUCCESS_CODE,
            response: {
              code: SUCCESS_CODE,
              data: {
                username: username,
                role: user.role,
                token: token,
              },
            },
          });
        });
      
  });
}

function userQuery(request) {
  return new Promise((resolve, reject) => {
    User.find(request, (err, users) => {
      if (err) {
        console.log(err);
        return resolve({ status: INVALID_CODE, response: EXCEPTION_DATABASE });
      }
      if (users === null)
        return resolve({ status: INVALID_CODE, response: DATA_NOT_FOUND });
      return resolve({
        status: SUCCESS_CODE,
        response: {
          code: SUCCESS_CODE,
          data: users,
        },
      });
    });
  });
}

function userCreate(request) {
  return new Promise((resolve, reject) => {
    User.insertMany(request, (err) => {
      if (err) {
        console.log(err);
        return resolve({ status: INVALID_CODE, response: EXCEPTION_DATABASE });
      }
      return resolve({
        status: SUCCESS_CODE,
        response: getResponseMessage(MODEL, "Create"),
      });
    });
  });
}

function userUpdate(request) {
  return new Promise((resolve, reject) => {
    User.update({ _id: request["_id"] }, request, (err) => {
      if (err) {
        console.log(err);
        return resolve({ status: INVALID_CODE, response: EXCEPTION_DATABASE });
      }
      return resolve({
        status: SUCCESS_CODE,
        response: getResponseMessage(MODEL, "Update"),
      });
    });
  });
}

function userRemove(_id) {
  return new Promise((resolve, reject) => {
    User.findByIdAndDelete(_id, (err) => {
      if (err) {
        console.log(err);
        return resolve({ status: INVALID_CODE, response: EXCEPTION_DATABASE });
      }
      return resolve({
        status: SUCCESS_CODE,
        response: getResponseMessage(MODEL, "Remove"),
      });
    });
  });
}
