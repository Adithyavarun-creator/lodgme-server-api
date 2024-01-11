const express = require("express");
const {
  addListing,
  searchResultListings,
  getListing,
  getUserListings,
  stripeCheckoutSession,
  getAllListings,
  searchFilterListings,
  updateListing,
  deleteListing,
  addReview,
} = require("../controllers/listingController");
const verifyToken = require("../utils/verifyToken");

const router = express.Router();

//verifyUser;
router.post("/create-new-listing", verifyToken, addListing);
router.post("/search-listings", searchResultListings);
router.get("/get", searchFilterListings);
router.get("/get/:id", getListing);
router.get("/listings", getAllListings);
router.get("/listings/:id", verifyToken, getUserListings);
router.delete("/listing/delete/:id", verifyToken, deleteListing);
router.post("/listing-update/:id", verifyToken, updateListing);
router.post("/create-checkout-session", stripeCheckoutSession);
router.post("/add-review", verifyToken, addReview);

module.exports = router;
