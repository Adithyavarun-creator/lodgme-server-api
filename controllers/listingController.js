const Listing = require("../models/Listing");
const errorHandler = require("../utils/error");
require("dotenv").config();
const stripe = require("stripe")(process.env.REACT_STRIPE_SECRET_KEY);

const addListing = async (req, res, next) => {
  try {
    const listing = await Listing.create(req.body);
    return res.status(201).json(listing);
  } catch (error) {
    next(error);
  }
};

const getListing = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      return next(errorHandler(404, "Listing not found!"));
    }
    res.status(200).json(listing);
  } catch (error) {
    next(error);
  }
};

const searchResultListings = async (req, res, next) => {
  try {
    const { locatedCountry, fromdate, todate, persons } = req.body;

    let result = await Listing.find({
      from: {
        $gte: fromdate,
      },
      to: {
        $lte: todate,
      },
      locatedCountry,
    });
    // console.log(result);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const getUserListings = async (req, res, next) => {
  //console.log(req);
  if (req.user.id === req.params.id) {
    try {
      const listings = await Listing.find({ postedBy: req.params.id });
      res.status(200).json(listings);
    } catch (error) {
      next(error);
    }
  } else {
    return next(errorHandler(401, "You can only view your own listings!"));
  }
};

const stripeCheckoutSession = async (req, res, next) => {
  const { selectedHouse, bookingAmount, mode } = req.body;

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "EUR",
          product_data: {
            name: selectedHouse.title,
          },
          unit_amount: bookingAmount * 100,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${process.env.REACT_FRONTEND_APP}/success`,
    cancel_url: `${process.env.REACT_FRONTEND_APP}/cancel`,
  });
  res.send({
    url: session.url,
  });
};

module.exports = {
  addListing,
  searchResultListings,
  getListing,
  getUserListings,
  stripeCheckoutSession,
};
