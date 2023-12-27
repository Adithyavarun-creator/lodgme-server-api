const Listing = require("../models/Listing");
const errorHandler = require("../utils/error");

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

module.exports = {
  addListing,
  searchResultListings,
  getListing,
  getUserListings,
};
