const express = require("express");
const {
  userRegistration,
  userLogin,
  forgotPassword,
  resetPassword,
  verifyUser,
  signOut,
  googleSignIn,
  facebookSignIn,
  updateUser,
  verifyUserPhone,
} = require("../controllers/authController");
const verifyToken = require("../utils/verifyToken");

const router = express.Router();

router.post("/register", userRegistration);
router.post("/login", userLogin);
router.post("/googlesignin", googleSignIn);
router.post("/facebooksignin", facebookSignIn);
router.get("/signout", signOut);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:id/:token", resetPassword);
router.post("/user-phone/:id", verifyUserPhone);
router.get("/:id/verify/:token", verifyUser);
router.post("/update/:id", verifyToken, updateUser);

module.exports = router;
