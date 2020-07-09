const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    unique: true,
    required: true,
  },
  // 1: Admin
  // 2: User
  role: {
    type: Number,
    required: true,
  },
  createdTime: {
    type: Number,
    required: true,
  },
  isActive: {
    type: Boolean,
    required: true,
  },
});

const User = mongoose.model("User", UserSchema);

module.exports = {
  User,
  UserSchema,
};
