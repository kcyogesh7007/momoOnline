const Product = require("../../../models/productModel");
const User = require("../../../models/userModel");

exports.addToCart = async (req, res) => {
  const userId = req.user._id;
  const productId = req.params.id;
  if (!productId) {
    return res.status(400).json({
      message: "Please provide productId",
    });
  }
  const productExist = await Product.findById(productId);
  if (!productExist) {
    return res.status(404).json({
      message: "Product doesnot exist with that id",
    });
  }
  const user = await User.findById(userId);
  user.cart.push(productId);
  await user.save();
  res.status(200).json({
    message: "product added to cart",
  });
};
//getmy  cart
exports.getMyCart = async (req, res) => {
  const userId = req.user._id;
  const user = await User.findById(userId).populate({
    path: "cart",
    select: "-productStatus",
  });
  res.status(200).json({
    message: "Cart fetched successfully",
    data: user.cart,
  });
};

//delete product from cart
exports.deleteItemFromCart = async (req, res) => {
  const userId = req.user._id;
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({
      message: "Please provide id",
    });
  }
  const product = await Product.findById(id);
  if (!product) {
    return res.status(404).json({
      message: "No Product found",
    });
  }
  const user = await User.findById(userId);
  user.cart = user.cart.filter((pId) => pId !== id);
  await user.save();
  res.status(200).json({
    message: "Product deleted successfully",
  });
};
