const Order = require("../models/Order");
const errorHandler = require("../utils/error");

const createOrder = async (req, res, next) => {
  try {
    const listing = await Order.create(req.body);
    return res.status(201).json(listing);
  } catch (error) {
    next(error);
  }
};

const getUserOrder = async (req, res, next) => {
  if (req.user.id === req.params.id) {
    try {
      const order = await Order.find({ bookedBy: req.params.id });
      res.status(200).json(order);
    } catch (error) {
      next(error);
    }
  } else {
    return next(errorHandler(401, "You can only view your own listings!"));
  }
};

module.exports = { createOrder, getUserOrder };
