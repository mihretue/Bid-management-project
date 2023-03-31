const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  fName: {
    type: String,
    required: true,
  },
  lName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },pass: {
    type: String,
    required: true,
  }
});

const User = mongoose.model("User", UserSchema);


module.exports = User;