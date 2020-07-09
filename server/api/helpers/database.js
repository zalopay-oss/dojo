let util = require("util");

const mongoose = require("mongoose");
let config = require("../../config/development.json");
module.exports = {
  connectDatabase,
};

function connectDatabase() {
  mongoose
    .connect(config.uriMongo, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
    .then(
      () => {
        console.log("Connect to mongo database is success!");
      },
      (err) => {
        console.log("Connect to mongo database is failed!");
        console.log(err);
      }
    );
}
