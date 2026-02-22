const Product = require("../../../models/productModel");

exports.createProduct = async (req, res) => {
  const file = req.file;
  let filePath;
  if (!file) {
    filePath =
      "https://imgs.search.brave.com/Be69DNsieOGcT9z16q262X4qguboCXizDD-HAdlBXsM/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9jb250/ZW50LnBleGVscy5j/b20vaW1hZ2VzL2Nh/bnZhL2FpLWdlbmVy/YXRlZC1hZC9vZmYt/dGhlbWUvYmFsY29u/eV9saXNpYW50aHVz/X3N0aWxsX2xpZmUt/ZnVsbC5qcGc";
  } else {
    filePath = req.file.filename;
  }
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
    productImage: "http://localhost:3000/" + filePath,
  });
  res.status(201).json({
    message: "Product created successfully",
    data: product,
  });
};

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
  const product = await Product.findById(id);
  if (!product) {
    return res.status(404).json({
      message: "No product found",
    });
  }
  res.status(200).json({
    message: "Product fetched successfully",
    data: product,
  });
};
