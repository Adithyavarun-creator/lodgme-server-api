const Listing = require("../models/Listing");

const addListing = async (req, res, next) => {
  try {
    const listing = await Listing.create(req.body);
    return res.status(201).json(listing);
  } catch (error) {
    next(error);
  }
};

const searchResultListings = async (req, res, next) => {
  try {
    const { locatedCountry, fromdate, todate, persons } = req.body;

    let result = await Listing.find({
      locatedCountry,
    });
    // console.log(result);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = { addListing, searchResultListings };
