const express = require("express");
const { addListing } = require("../controllers/listingController");
const { verifyUser } = require("../utils/verifyUser");

const router = express.Router();

// router.post("/register", userRegistration);
// router.post("/login", userLogin);
// router.get("/signout", signOut);
// router.post("/forgot-password", forgotPassword);
// router.post("/reset-password/:id/:token", resetPassword);
// router.get("/:id/verify/:token", verifyUser);
//verifyUser;
router.post("/create-new-listing", addListing);

module.exports = router;
