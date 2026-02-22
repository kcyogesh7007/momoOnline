const Product = require("../../../models/productModel");
const fs = require("fs");

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
    productImage: process.env.BACKEND_URL + filePath,
  });
  res.status(201).json({
    message: "Product created successfully",
    data: product,
  });
};

exports.updateProduct = async (req, res) => {
  const { id } = req.params;
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
        "Please provide productName,productDescription,productStatus,productPrice,id and productStockQty",
    });
  }
  const oldData = await Product.findById(id);
  if (!oldData) {
    return res.status(404).json({
      message: "No Product found with that Id",
    });
  }
  const oldProductImage = oldData.productImage;
  const lengthToCut = process.env.BACKEND_URL.length;
  const finalLength = oldProductImage.slice(lengthToCut);
  if (req.file && req.file.filename) {
    fs.unlink("./uploads/" + finalLength, (err) => {
      if (err) {
        console.log(err.message);
      } else {
        console.log("file deleted successfully");
      }
    });
  }
  const product = await Product.findByIdAndUpdate(
    id,
    {
      productName,
      productDescription,
      productStatus,
      productPrice,
      productStockQty,
      productImage:
        req.file && req.file.filename
          ? process.env.BACKEND_URL + req.file.filename
          : oldProductImage,
    },
    {
      new: true,
    },
  );
  res.status(201).json({
    message: "Product updated successfully",
    data: product,
  });
};
exports.deleteProduct = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({
      message: "Please provide id",
    });
  }
  const oldData = await Product.findById(id);
  if (!oldData) {
    return res.status(400).json({
      message: "No product found with that Id",
    });
  }
  const oldImage = oldData.productImage;
  const lengthToCut = process.env.BACKEND_URL.length;
  const finalPath = oldImage.slice(lengthToCut);
  fs.unlink("./uploads/" + finalPath, (err) => {
    if (err) {
      console.log("Error deleting file", err);
    } else {
      console.log("File deleted successfully");
    }
  });
  await Product.findByIdAndDelete(id);
  res.status(200).json({
    message: "Product deleted successfully",
  });
};
