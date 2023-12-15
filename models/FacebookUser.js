const mongoose = require("mongoose");

const FacebookuserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
    },
    email: {
      type: String,
    },
    provider: {
      type: String,
      default: "Facebook",
    },
    hashedPassword: {
      type: String,
    },
    facebookId: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("FacebookUser", FacebookuserSchema);
