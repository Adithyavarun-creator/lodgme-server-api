const express = require("express");
const {
  userRegistration,
  userLogin,
  forgotPassword,
  resetPassword,
  verifyUser,
} = require("../controllers/authController");
const { recoverEmail } = require("../utils/recoverEmail");

const router = express.Router();

router.post("/register", userRegistration);
router.post("/login", userLogin);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:id/:token", resetPassword);
router.get("/:id/verify/:token", verifyUser);

module.exports = router;
