const Product = require("../../models/productModel");
const Review = require("../../models/reviewModel");

//create review
exports.createReview = async (req, res) => {
  const userId = req.user._id;
  const productId = req.params.id;
  const { message, rating } = req.body;
  if (!message || !rating) {
    return res.status(400).json({
      message: "Please provide message and rating",
    });
  }
  const product = await Product.findById(productId);
  if (!product) {
    return res.status(404).json({
      message: "No product found with that id",
    });
  }
  await Review.create({
    userId,
    productId,
    rating,
    message,
  });
  res.status(201).json({
    message: "Review added successfully",
  });
};

//getmyReview

exports.getMyReview = async (req, res) => {
  const userId = req.user._id;
  const review = await Review.find({ userId });
  if (review.length == 0) {
    return res.status(404).json({
      message: "You havent given review to any product yet",
    });
  }
  res.status(200).json({
    message: "Review fetched successfully",
    data: review,
  });
};

//delete review

exports.deleteReview = async (req, res) => {
  const reviewId = req.params.id;
  const userId = req.user._id;
  if (!reviewId) {
    return res.status(400).json({
      message: "Please provide reviewId",
    });
  }
  const review = await Review.findById(reviewId);

  const ownerReviewId = review.userId;
  if (ownerReviewId !== userId) {
    return res.status(400).json({
      message: "You dont have permission to this",
    });
  }
  await Review.findByIdAndDelete(reviewId);
  res.status(200).json({
    message: "Review deleted successfully",
  });
};
