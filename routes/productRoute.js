const {
  createProduct,
  getProducts,
  getProduct,
} = require("../controller/admin/product/productController");
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
    createProduct,
  )
  .get(isAuthenticated, catchAsync(getProducts));

router.route("/products/:id").get(isAuthenticated, catchAsync(getProduct));

module.exports = router;
