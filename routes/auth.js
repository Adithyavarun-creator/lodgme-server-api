const express = require("express");
const {
  userRegistration,
  userLogin,
  forgotPassword,
  resetPassword,
  verifyUser,
  signOut,
} = require("../controllers/authController");

const router = express.Router();

router.post("/register", userRegistration);
router.post("/login", userLogin);
router.get("/signout", signOut);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:id/:token", resetPassword);
router.get("/:id/verify/:token", verifyUser);

module.exports = router;
