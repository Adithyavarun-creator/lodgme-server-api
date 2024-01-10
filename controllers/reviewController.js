const Listing = require("../models/Listing");
const errorHandler = require("../utils/error");

const addReview = async (req, res, next) => {
  const { rating, reviewDescription, reviewBy, listingId } = req.body;

  try {
    const newReview = await Listing.findByIdAndUpdate(
      listingId,
      {
        $push: {
          reviews: {
            rating,
            reviewDescription,
            reviewBy,
            reviewAt,
          },
        },
      },
      { new: true }
    );
    //.populate("reviews.reviewBy");
    res.status(200).json(newReview.reviews);
  } catch (error) {
    return next(errorHandler(401, "You are not authorized to review !"));
  }
};

module.exports = { addReview };
