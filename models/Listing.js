// const { ObjectId } = require("mongodb");
// const mongoose = require("mongoose");

// const listingSchema = mongoose.Schema(
//   {
//     title: {
//       type: String,
//       text: true,
//     },
//     facilities: {
//       type: String,
//       text: true,
//     },
//     type: {
//       type: String,
//       text: true,
//     },
//     locatedCountry: {
//       type: String,
//       text: true,
//     },
//     amenitiesIncluded: {
//       type: Array,
//       default: [],
//     },
//     amenitiesNotIncluded: {
//       type: Array,
//       default: [],
//     },
//     houseAddress: {
//       type: String,
//       text: true,
//     },
//     houseImages: {
//       type: Array,
//       default: [],
//     },
//     beds: {
//       type: Number,
//       default: 1,
//     },
//     baths: {
//       type: Number,
//       default: 1,
//     },
//     livingRoom: {
//       type: Number,
//       default: 1,
//     },
//     noOfpersons: {
//       type: Number,
//       default: 1,
//     },
//     availableFrom: {
//       type: Date,
//     },
//     availableTill: {
//       type: Date,
//     },
//     pricePerNight: {
//       type: Number,
//     },
//     description: {
//       type: String,
//       trim: true,
//     },
//     postedBy: {
//       type: ObjectId,
//       ref: "User",
//     },

//     reviews: [
//       {
//         rating: {
//           type: Number,
//         },
//         reviewDescription: {
//           type: String,
//         },
//         reviewBy: {
//           type: ObjectId,
//           ref: "User",
//         },
//         reviewerFirstname: {
//           type: String,
//         },
//         reviewerLastname: {
//           type: String,
//         },
//         reviewerCountry: {
//           type: String,
//         },
//         reviewedAt: {
//           type: Date,
//           default: new Date(),
//         },
//       },
//     ],
//     mapLocation: [
//       {
//         lat: {
//           type: Number,
//           // default: 56.9581514,
//         },
//         lng: {
//           type: Number,
//           // default: 24.1399615,
//         },
//       },
//     ],
//   },
//   {
//     timestamps: true,
//   }
// );

// module.exports = mongoose.model("Listing", listingSchema);

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
    city: {
      type: String,
      text: true,
    },
    houseAddress: {
      type: String,
      text: true,
    },
    // mapLocation: [
    //   {
    //     lat: {
    //       type: Number,
    //       default: 48.85,
    //     },
    //     lng: {
    //       type: Number,
    //       default: 2.29,
    //     },
    //   },
    // ],
    latitude: {
      type: Number,
    },
    longitude: {
      type: Number,
    },
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
