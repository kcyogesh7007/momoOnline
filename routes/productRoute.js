const {
  createProduct,

  updateProduct,
  deleteProduct,
} = require("../controller/admin/product/productController");
const {
  getProduct,
  getProducts,
} = require("../controller/global/globalController");
const isAuthenticated = require("../middleware/isAuthenticated");
const isRestrictTo = require("../middleware/isRestrictTo");
const upload = require("../middleware/multerConfig");
const catchAsync = require("../services/catchAsync");

const router = require("express").Router();

router
  .route("/products")
  .post(
    isAuthenticated,
    isRestrictTo("admin"),
    upload.single("productImage"),
    catchAsync(createProduct),
  )
  .get(isAuthenticated, catchAsync(getProducts));

router
  .route("/products/:id")
  .get(isAuthenticated, catchAsync(getProduct))
  .patch(
    isAuthenticated,
    isRestrictTo("admin"),
    upload.single("productImage"),
    catchAsync(updateProduct),
  )
  .delete(isAuthenticated, isRestrictTo("admin"), catchAsync(deleteProduct));

module.exports = router;
