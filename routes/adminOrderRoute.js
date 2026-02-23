const {
  getAllOrder,
  updateOrderStatus,
  deleteOrder,
  updatePaymentStatus,
  getSingleOrder,
} = require("../controller/admin/order/orderController");
const isAuthenticated = require("../middleware/isAuthenticated");
const isRestrictTo = require("../middleware/isRestrictTo");

const router = require("express").Router();

router
  .route("/orders")
  .get(isAuthenticated, isRestrictTo("admin"), catchAsync(getAllOrder));
router
  .route("/orders/paymentstatus/:id")
  .patch(
    isAuthenticated,
    isRestrictTo("admin"),
    catchAsync(updatePaymentStatus),
  );
router
  .route("/orders/:id")
  .get(isAuthenticated, isRestrictTo("admin"), catchAsync(getSingleOrder))
  .patch(isAuthenticated, isRestrictTo("admin"), catchAsync(updateOrderStatus))
  .delete(isAuthenticated, isRestrictTo("admin"), catchAsync(deleteOrder));

module.exports = router;
