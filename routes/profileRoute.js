const {
  deleteProfile,
  getProfile,
  updateProfile,
  changePassword,
} = require("../controller/user/profile/profileController");
const isAuthenticated = require("../middleware/isAuthenticated");
const catchAsync = require("../services/catchAsync");

const router = require("express").Router();

router
  .route("/")
  .get(isAuthenticated, catchAsync(getProfile))
  .patch(isAuthenticated, catchAsync(updateProfile))
  .delete(isAuthenticated, catchAsync(deleteProfile));

router
  .route("/changePassword")
  .patch(isAuthenticated, catchAsync(changePassword));

module.exports = router;
