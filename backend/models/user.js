const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    fName: {
      type: String,
      required: true,
      lowercase: true,
    },
    lName: {
      type: String,
      required: true,
      lowercase: true,
    },
    uName: {
      type: String,
      required: true,
      lowercase: true,
    },
    bDay: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      lowercase: true,
    },
    pBody: {
      type: String,
      required: false,
      default: "No",
      lowercase: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
    },
    pass: {
      type: String,
      required: true,
    },
    approved: {
      type: Boolean,
      required: true,
      default: false,
    },
    status: {
      type: String,
      required: true,
      default: "not-approved",
    },
    regTime: {
      type: String,
      required: true,
    },
  },
  { collection: "Users" }
);

const User = mongoose.model("userModel", UserSchema);

module.exports = User;
