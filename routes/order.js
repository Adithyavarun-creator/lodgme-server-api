const express = require("express");
const verifyUser = require("../utils/verifyUser");
const { createOrder } = require("../controllers/orderController");

const router = express.Router();

//verifyUser;
router.post("/create-order", verifyUser, createOrder);
router.get("/order/:id", verifyUser, getUserOrder);

module.exports = router;
