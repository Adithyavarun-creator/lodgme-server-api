const express = require("express");
const { createOrder, getUserOrder } = require("../controllers/OrderController");
const verifyUser = require("../utils/verifyUser");

const router = express.Router();

//verifyUser;
router.post("/create-order", verifyUser, createOrder);
router.get("/order/:id", verifyUser, getUserOrder);

module.exports = router;
