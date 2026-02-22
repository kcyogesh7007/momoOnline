const Product = require("../../models/productModel");
const Review = require("../../models/reviewModel");

exports.getProducts = async (req, res) => {
  const products = await Product.find();
  if (products.length == 0) {
    return res.status(404).json({
      message: "No product found",
    });
  }
  res.status(200).json({
    message: "Product fetched successfully",
    data: products,
  });
};

exports.getProduct = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({
      message: "Please provide id",
    });
  }
  const review = await Review.find({ productId: id }).populate({
    path: "userId",
    select: "-userPassword",
  });

  const product = await Product.findById(id);
  if (!product) {
    return res.status(404).json({
      message: "No product found",
    });
  }
  res.status(200).json({
    message: "Product fetched successfully",
    data: {
      product,
      review,
    },
  });
};
