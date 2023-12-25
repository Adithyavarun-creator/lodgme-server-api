const express = require("express");
const {
  addListing,
  searchResultListings,
  getListing,
} = require("../controllers/listingController");
const { verifyUser } = require("../utils/verifyUser");

const router = express.Router();

//verifyUser;
router.post("/create-new-listing", addListing);
router.post("/search-listings", searchResultListings);
router.get("/get/:id", getListing);

module.exports = router;
