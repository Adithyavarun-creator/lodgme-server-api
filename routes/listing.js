const express = require("express");
const { addListing } = require("../controllers/listingController");
const { verifyUser } = require("../utils/verifyUser");

const router = express.Router();

//verifyUser;
router.post("/create-new-listing", addListing);

module.exports = router;
