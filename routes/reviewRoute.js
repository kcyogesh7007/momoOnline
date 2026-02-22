const {
  createReview,

  deleteReview,
  getMyReview,
} = require("../controller/user/reviewController");
const isAuthenticated = require("../middleware/isAuthenticated");
const isRestrictTo = require("../middleware/isRestrictTo");
const catchAsync = require("../services/catchAsync");

const router = require("express").Router();

router.route("/reviews").get(isAuthenticated, catchAsync(getMyReview));

router
  .route("/reviews/:id")
  .post(isAuthenticated, isRestrictTo("admin"), catchAsync(createReview))

  .delete(isAuthenticated, isRestrictTo("admin"), catchAsync(deleteReview));

module.exports = router;
