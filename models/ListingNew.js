const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");

const listingSchema = mongoose.Schema(
  {
    roomtype: {
      type: String,
      text: true,
    },
    acctype: {
      type: String,
      text: true,
    },
    locatedCountry: {
      type: String,
      text: true,
    },
    houseAddress: {
      type: String,
      text: true,
    },
    mapLocation: [
      {
        lat: {
          type: Number,
          default: 48.85,
        },
        lng: {
          type: Number,
          default: 2.29,
        },
      },
    ],
    postCode: {
      type: Number,
    },
    travellers: {
      type: Number,
      default: 1,
    },
    bedrooms: {
      type: Number,
      default: 1,
    },
    baths: {
      type: Number,
      default: 1,
    },
    bathroom: {
      type: Number,
      default: 1,
    },
    babycots: { type: Boolean, default: false },
    children: { type: Boolean, default: false },

    checkedAmenities: {
      type: Array,
      default: [],
    },
    smoking: { type: Boolean, default: false },
    pets: { type: Boolean, default: false },
    party: { type: Boolean, default: false },
    addbabycot: { type: Boolean, default: false },

    houseImages: {
      type: Array,
      default: [],
    },
    title: {
      type: String,
      text: true,
    },
    description: {
      type: String,
      text: true,
    },
    bookingtype: {
      type: String,
      text: true,
    },

    price: {
      type: Number,
    },

    postedBy: {
      type: ObjectId,
      ref: "User",
    },
    reviews: [
      {
        rating: {
          type: Number,
        },
        reviewDescription: {
          type: String,
        },
        reviewBy: {
          type: ObjectId,
          ref: "User",
        },
        reviewerFirstname: {
          type: String,
        },
        reviewerLastname: {
          type: String,
        },
        reviewerCountry: {
          type: String,
        },
        reviewedAt: {
          type: Date,
          default: new Date(),
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Listing", listingSchema);
