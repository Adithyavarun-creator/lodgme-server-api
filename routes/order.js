const express = require("express");
const verifyToken = require("../utils/verifyToken");
const {
  createOrder,
  getUserOrder,
  createGoogleaccountOrder,
  getGoogleUserOrder,
  getFacebookUserOrder,
  createFacebookaccountOrder,
} = require("../controllers/orderController");

const router = express.Router();

router.post("/create-order", verifyToken, createOrder);
router.post("/create-google-order", verifyToken, createGoogleaccountOrder);
router.post("/create-facebook-order", verifyToken, createFacebookaccountOrder);
router.get("/order/:id", verifyToken, getUserOrder);
router.get("/google-orders/:id", verifyToken, getGoogleUserOrder);
router.get("/facebook-orders/:id", verifyToken, getFacebookUserOrder);

module.exports = router;
