const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
  {
    billingName: {
      type: String,
      text: true,
    },
    billingEmail: {
      type: String,
      text: true,
    },
    billingPhonenumber: {
      type: Number,
      text: true,
    },
    billingAddress: {
      type: String,
      text: true,
    },
    totalPrice: {
      type: Number,
    },
    nopersons: {
      type: Number,
    },
    startDate: {
      type: Date,
    },
    endDate: {
      type: Date,
    },
    stayingDays: {
      type: Number,
    },
    beds: {
      type: Number,
    },
    baths: {
      type: Number,
    },
    liveingRoom: {
      type: Number,
    },
    country: {
      type: String,
    },
    listingBooked: {
      type: String,
    },
    bookedBy: {
      type: ObjectId,
      ref: "User",
    },
    houseDetails: {
      type: ObjectId,
      ref: "Listing",
    },
    paymentMode: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", orderSchema);
