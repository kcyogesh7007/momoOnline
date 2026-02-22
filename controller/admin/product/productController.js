const Product = require("../../../models/productModel");

exports.createProduct = async (req, res) => {
  const {
    productName,
    productDescription,
    productStatus,
    productStockQty,
    productPrice,
  } = req.body;
  if (
    !productName ||
    !productDescription ||
    !productStatus ||
    !productPrice ||
    !productStockQty
  ) {
    return res.status(400).json({
      message:
        "Please provide productName,productDescription,productStatus,productPrice and productStockQty",
    });
  }
  const product = await Product.create({
    productName,
    productDescription,
    productStatus,
    productPrice,
    productStockQty,
  });
  res.status(201).json({
    message: "Product created successfully",
    data: product,
  });
};
