const router = require("express").Router();
const isAuthenticated = require("../middleware/isAuthenticated");
const catchAsync = require("../services/catchAsync");
const {
  addToCart,
  getMyCart,
  deleteItemFromCart,
} = require("../controller/user/cart/cartController");

router
  .route("/:id")
  .post(isAuthenticated, catchAsync(addToCart))
  .delete(isAuthenticated, catchAsync(deleteItemFromCart));
router.route("/").get(isAuthenticated, catchAsync(getMyCart));

module.exports = router;
