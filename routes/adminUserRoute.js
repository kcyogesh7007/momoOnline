const {
  getUsers,
  deleteUser,
} = require("../controller/admin/user/userController");
const isAuthenticated = require("../middleware/isAuthenticated");
const isRestrictTo = require("../middleware/isRestrictTo");
const catchAsync = require("../services/catchAsync");

const router = require("express").Router();

router
  .route("/users")
  .get(isAuthenticated, isRestrictTo("admin"), catchAsync(getUsers));
router
  .route("/users/:id")
  .delete(isAuthenticated, isRestrictTo("admin"), catchAsync(deleteUser));

module.exports = router;
