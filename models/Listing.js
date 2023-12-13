const mongoose = require("mongoose");

const listingSchema = mongoose.Schema(
  {
    title: {
      type: String,
      text: true,
    },
    subtitle: {
      type: String,
      text: true,
    },
    amenitiesIncluded: {
      type: Array,
      text: true,
    },
    amenitiesNotIncluded: {
      type: Array,
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
    pricePerNight: {
      type: Number,
    },
    description: {
      type: String,
      trim: true,
    },
    publishedUser: {
      type: String,
    },
    mapLocation: [
      {
        lat: {
          type: Number,
          default: 56.9581514,
        },
        lng: {
          type: Number,
          default: 24.1399615,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Listing", listingSchema);
