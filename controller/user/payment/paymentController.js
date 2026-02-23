const { default: axios } = require("axios");
const Order = require("../../../models/orderModel");
const User = require("../../../models/userModel");

exports.intializeKhaltiPayment = async (req, res) => {
  const { orderId, amount } = req.body;
  if (!orderId || !amount) {
    return res.status(400).json({
      message: "Please provide orderId and amount",
    });
  }
  const data = {
    return_url: "http://localhost:3000/success",
    purchase_order_id: orderId,
    amount: amount,
    website_url: "http://localhost:3000/",
    purchase_order_name: "orderName_" + orderId,
  };
  const response = await axios.post(
    "https://dev.khalti.com/api/v2/epayment/initiate/",
    data,
    {
      headers: {
        Authorization: "key d9610ccfa6404b15ac505d13ede4c170",
      },
    },
  );

  order.paymentDetails.pidx = response.data.pidx;

  await order.save();
  res.status(200).json({
    message: "Payment successful",
    paymentUrl: response.data.payment_url,
  });
};

exports.verifyPidx = async (req, res) => {
  const userId = req.user.id;
  const pidx = req.body.pidx;
  const response = await axios.post(
    "https://dev.khalti.com/api/v2/epayment/lookup/",
    { pidx },
    {
      headers: {
        Authorization: "key d9610ccfa6404b15ac505d13ede4c170",
      },
    },
  );
  if (response.data.status == "Completed") {
    // database ma modification
    let order = await Order.find({ "paymentDetails.pidx": pidx });

    order[0].paymentDetails.method = "khalti";
    order[0].paymentDetails.status = "paid";
    await order[0].save();
    // empty user cart
    const user = await User.findById(userId);
    user.cart = [];
    await user.save();

    res.status(200).json({
      message: "Payment Verified Successfully",
    });
  }
};
