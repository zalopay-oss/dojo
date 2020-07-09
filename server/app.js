"use strict";

var SwaggerExpress = require("swagger-express-mw");
const express = require("express");
var app = require("express")();
const path = require("path");
const { connectDatabase } = require("./api/helpers/database");
module.exports = app; // for testing

var config = {
  appRoot: __dirname, // required config
};

SwaggerExpress.create(config, function (err, swaggerExpress) {
  if (err) {
    throw err;
  }

  // install middleware
  swaggerExpress.register(app);
  app.use(express.static(path.join(__dirname, "build")));
  var port = process.env.PORT || 8645;
  app.listen(port);
  connectDatabase();
  if (swaggerExpress.runner.swagger.paths["/hello"]) {
    console.log(
      "try this:\ncurl http://127.0.0.1:" + port + "/hello?name=Scott"
    );
  }
});
