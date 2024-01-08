const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema(
  {
    rating: {
      type: Number,
      text: true,
    },
    reviewDescription: {
      type: String,
      text: true,
    },
    postedBy: {
      type: ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("review", reviewSchema);
