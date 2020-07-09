"use strict";

var util = require("util");
const {
  DATA_NOT_FOUND,
  EXCEPTION_DATABASE,
  SUCCESS_CODE,
  INVALID_CODE,
  getResponseMessage,
} = require("../helpers/exception");
const { Question } = require("../models/question");
const { generateToken } = require("../helpers/token");
let config = require("../../config/development.json");

const MODEL = "Question";

module.exports = {
  questionQuery,
  questionCreate,
  questionUpdate,
  questionRemove,
};

function questionQuery(request) {
  return new Promise((resolve, reject) => {
    Question.find(request, (err, questions) => {
      if (err) {
        console.log(err);
        return resolve({ status: INVALID_CODE, response: EXCEPTION_DATABASE });
      }
      if (questions === null)
        return resolve({ status: INVALID_CODE, response: DATA_NOT_FOUND });
      return resolve({
        status: SUCCESS_CODE,
        response: {
          code: SUCCESS_CODE,
          data: questions,
        },
      });
    });
  });
}

function questionCreate(request) {
  return new Promise((resolve, reject) => {
    Question.insertMany(request, (err) => {
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

function questionUpdate(request) {
  return new Promise((resolve, reject) => {
    Question.update({ _id: request["_id"] }, request, (err) => {
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

function questionRemove(_id) {
  return new Promise((resolve, reject) => {
    Question.findByIdAndDelete(_id, (err) => {
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
