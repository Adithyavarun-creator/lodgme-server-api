const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");

const listingSchema = mongoose.Schema(
  {
    title: {
      type: String,
      text: true,
    },
    facilities: {
      type: String,
      text: true,
    },
    type: {
      type: String,
      text: true,
    },
    locatedCountry: {
      type: String,
      text: true,
    },
    amenitiesIncluded: {
      type: Array,
      default: ["Geyser", "Air Conditioning", "Kitchen"],
    },
    amenitiesNotIncluded: {
      type: Array,
      default: ["Smoking", "Pets", "Drugs"],
    },
    houseAddress: {
      type: String,
      text: true,
    },
    houseImages: {
      type: Array,
      default: [],
    },
    beds: {
      type: Number,
      default: 1,
    },
    baths: {
      type: Number,
      default: 1,
    },
    livingRoom: {
      type: Number,
      default: 1,
    },
    noOfpersons: {
      type: Number,
      default: 1,
    },
    availableFrom: {
      type: Date,
    },
    availableTill: {
      type: Date,
    },
    pricePerNight: {
      type: Number,
    },
    description: {
      type: String,
      trim: true,
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
    mapLocation: [
      {
        lat: {
          type: Number,
          // default: 56.9581514,
        },
        lng: {
          type: Number,
          // default: 24.1399615,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Listing", listingSchema);
