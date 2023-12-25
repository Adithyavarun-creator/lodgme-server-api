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
      text: true,
    },
    amenitiesNotIncluded: {
      type: Array,
      text: true,
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
    // postedBy: {
    //   type: ObjectId,
    //   ref: "User",
    // },
    publishedUser: {
      type: String,
    },
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
