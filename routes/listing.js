const express = require("express");
const {
  addListing,
  searchResultListings,
  getListing,
  getUserListings,
  stripeCheckoutSession,
} = require("../controllers/listingController");
const verifyUser = require("../utils/verifyUser");

const router = express.Router();

//verifyUser;
router.post("/create-new-listing", verifyUser, addListing);
router.post("/search-listings", searchResultListings);
router.get("/get/:id", getListing);
router.get("/listings/:id", verifyUser, getUserListings);
router.post("/create-checkout-session", stripeCheckoutSession);

module.exports = router;
