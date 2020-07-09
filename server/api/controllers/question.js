"use strict";
var util = require("util");
const { validate } = require("../helpers/token");
const {
  questionQuery,
  questionCreate,
  questionUpdate,
  questionRemove,
} = require("../services/question");
const { responseSuccess } = require("../helpers/exception");

module.exports = {
  query,
  create,
  remove,
};

function query(req, res) {
  let params = req.swagger.params;
  let token = params.token.value;
  let category = params.category.value;
  let level = params.level.value;
  if (!validate(token, "questionQuery", res)) return;
  let query = {};
  if (category !== undefined) {
    query["category"] = category;
  }
  if (level !== undefined) {
    query["level"] = level;
  }

  questionQuery(query).then(function (value) {
    return responseSuccess(value, res);
  });
}

function create(req, res) {
  let request = req.swagger.params.request.value;
  let { questions, token } = request;
  if (!validate(token, "questionCreate", res)) return;

  let insert = [];
  questions.map((question) => {
    insert.push(buildQuestion(question));
  });
  questionCreate(insert).then(function (value) {
    return responseSuccess(value, res);
  });
}

function buildQuestion(question) {
  return {
    category: question.category,
    level: question.level,
    content: question.content,
    hint: question.hint,
    hash: question.content,
    campaign: "2020.T6",
  };
}

function remove(req, res) {
  let request = req.swagger.params.request.value;
  let { token, _id } = request;
  if (!validate(token, "questionRemove", res)) return;

  questionRemove(_id).then(function (value) {
    return responseSuccess(value, res);
  });
}
