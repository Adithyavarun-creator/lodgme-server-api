const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    firstname: {
      type: String,
      required: [true, "first name is required"],
      trim: true,
      text: true,
    },
    username: {
      type: String,
      required: [true, "username is required"],
      trim: true,
      text: true,
    },
    lastname: {
      type: String,
      required: [true, "last name is required"],
      trim: true,
      text: true,
    },
    homeAddress: {
      type: String,
      required: [true, "Address is required"],
      trim: true,
      text: true,
    },
    email: {
      type: String,
      required: [true, "email is required"],
      trim: true,
    },
    contactnumber: {
      type: Number,
      required: true,
    },
    password: {
      type: String,
      required: [true, "password is required"],
    },
    gender: {
      type: String,
      required: [true, "gender is required"],
    },
    country: {
      type: String,
      required: [true, "country is required"],
      trim: true,
      text: true,
    },
    verified: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
