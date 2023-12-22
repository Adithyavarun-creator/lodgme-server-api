const express = require("express");
const {
  addListing,
  searchResultListings,
} = require("../controllers/listingController");
const { verifyUser } = require("../utils/verifyUser");

const router = express.Router();

//verifyUser;
router.post("/create-new-listing", addListing);
router.post("/search-listings", searchResultListings);

module.exports = router;
