"use strict";
var util = require("util");
const { validate } = require("../helpers/token");
const {
  userLogin,
  userQuery,
  userCreate,
  userUpdate,
  userRemove,
} = require("../services/user");
const { responseSuccess } = require("../helpers/exception");

module.exports = {
  login,
  query,
  create,
  update,
  remove,
};

function login(req, res) {
  let request = req.swagger.params.request.value;
  let username = request.username;
  let password = request.password;

  userLogin(username, password).then(function (value) {
    return responseSuccess(value, res);
  });
}

function query(req, res) {
  let params = req.swagger.params;
  let token = params.token.value;
  let username = params.username.value;
  if (!validate(token, "userQuery", res)) return;
  let query = {};
  if (username !== undefined) {
    query["username"] = username;
  }
  userQuery(query).then(function (value) {
    return responseSuccess(value, res);
  });
}

function create(req, res) {
  let request = req.swagger.params.request.value;
  let { username, role, token } = request;
  if (!validate(token, "userCreate", res)) return;

  let users = [
    {
      username: username,
      role: role,
      createdTime: Date.now(),
      isActive: true,
    },
  ];

  userCreate(users).then(function (value) {
    return responseSuccess(value, res);
  });
}

function update(req, res) {
  let request = req.swagger.params.request.value;
  let { username, role, token, _id, isActive } = request;
  if (!validate(token, "userUpdate", res)) return;

  let users = {
    _id: _id,
    username: username,
    role: role,
    updatedTime: Date.now(),
    isActive: isActive,
  };

  userUpdate(users).then(function (value) {
    return responseSuccess(value, res);
  });
}

function remove(req, res) {
  let request = req.swagger.params.request.value;
  let { token, _id } = request;
  if (!validate(token, "userRemove", res)) return;

  userRemove(_id).then(function (value) {
    return responseSuccess(value, res);
  });
}
