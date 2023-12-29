const express = require("express");
const verifyUser = require("../utils/verifyUser");
const { createOrder, getUserOrder } = require("../controllers/OrderController");

const router = express.Router();

//verifyUser;
router.post("/create-order", verifyUser, createOrder);
router.get("/order/:id", verifyUser, getUserOrder);

module.exports = router;
