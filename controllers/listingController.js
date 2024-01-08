const Listing = require("../models/Listing");
const User = require("../models/User");
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

const getAllListings = async (req, res, next) => {
  try {
    const listing = await Listing.find({});
    if (!listing) {
      return next(errorHandler(404, "Listing not found!"));
    }
    res.status(200).json(listing);
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
    // const { postedBy } = listing;
    // const user = await User.findById(postedBy._id);
    // console.log(user);
    //console.log(listing);
    res.status(200).json({ listing });
  } catch (error) {
    next(error);
  }
};

const searchResultListings = async (req, res, next) => {
  try {
    const { locatedCountry, fromdate, todate } = req.body;

    let result = await Listing.find({
      from: {
        $gte: fromdate,
      },
      to: {
        $lte: todate,
      },
      locatedCountry,
    });
    res.json(result);
    // const { locatedCountry, date } = req.body;
    // let result = await Listing.find({
    //   from: {
    //     $gte: new Date(),
    //   },
    //   locatedCountry,
    // });
    // res.json(result);
  } catch (error) {
    next(error);
  }
};

const searchFilterListings = async (req, res, next) => {
  //console.log(req.query);
  try {
    let type = req.query.type;

    if (type === undefined || type === "all") {
      type = {
        $in: ["furnished", "studio", "modern", "flat", "hotel", "hostel"],
      };
    }

    const searchTerm = req.query.searchTerm || "";

    const sort = req.query.sort || "createdAt";

    const order = req.query.order || "desc";

    const listings = await Listing.find({
      locatedCountry: { $regex: searchTerm, $options: "i" },
      type: { $regex: type, $options: "i" },
    }).sort({ [sort]: order });

    //console.log({ listings });
    return res.status(200).json(listings);
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

const updateListing = async (req, res, next) => {
  //client shows undesfined on response but function works properly
  let listing = await Listing.findById(req.params.id);
  if (!listing) {
    return next(errorHandler(404, "Listing not found!"));
  }
  //if (req.user.id !== listing.postedBy) {
  // return next(errorHandler(401, "You can only update your own listings!"));
  //}

  try {
    const updatedListing = await Listing.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    // console.log(updatedListing);
    res.status(200).json(updatedListing);
  } catch (error) {
    next(error);
  }
};

const deleteListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);

  if (!listing) {
    return next(errorHandler(404, "Listing not found!"));
  }

  if (req.user.id !== listing.postedBy) {
    return next(errorHandler(401, "You can only delete your own listings!"));
  }

  try {
    await Listing.findByIdAndDelete(req.params.id);
    res.status(200).json("Listing has been deleted!");
  } catch (error) {
    next(error);
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
    // success_url: `http://localhost:3000/success`,
    // cancel_url: `http://localhost:3000/cancel`,
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
  getAllListings,
  searchFilterListings,
  updateListing,
  deleteListing,
};
