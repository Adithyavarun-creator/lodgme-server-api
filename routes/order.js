const express = require("express");
const verifyToken = require("../utils/verifyToken");
const {
  createOrder,
  getUserOrder,
  createGoogleaccountOrder,
} = require("../controllers/orderController");

const router = express.Router();

router.post("/create-order", verifyToken, createOrder);
router.post("/create-google-order", verifyToken, createGoogleaccountOrder);
router.get("/order/:id", verifyToken, getUserOrder);

module.exports = router;
