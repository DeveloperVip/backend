const express = require("express");
const {
  createProduct,
  getAllProduct,
  updateProduct,
  deleteProduct,
  getProductById,
} = require("../services/product.service");
const { Product } = require("../models/product.model");
const upload = require("../middleware/uploadMiddleware");
const uploadImageToCloudinary = require("../middleware/uploadMiddleware");
const updateImageOnCloudinary = require("../middleware/updateFile.middleware");
const deleteProductImage = require("../middleware/deleteFile.middleware");
const uploadAddImageToCloudinary = require("../middleware/additionalImageUrls.middleware");
const productRouter = express.Router();

// Sử dụng middleware upload trong quá trình tạo sản phẩm
productRouter.post(
  "/create-product",
  uploadImageToCloudinary,
  uploadAddImageToCloudinary,
  async (req, res) => {
    // Truyền đường dẫn của file từ middleware vào req.body
    console.log("req.body", req.body);
    const productItem = { ...req.body };
    const product = await createProduct(productItem);
    console.log(product);
    product.save();
    res.send(product);
  }
);

productRouter.get("/", async (req, res) => {
  const product = await getAllProduct();
  res.send(product);
});

productRouter.get("/:id", async (req, res) => {
  console.log("🚀 ~ productRouter.get ~ req.params:", req.params.id);
  const product = await getProductById(req.params.id);

  res.send(product);
});

productRouter.put(
  "/update-product:id",
  updateImageOnCloudinary,
  async (req, res) => {
    const id = req.params.id;
    const product = await updateProduct(id, req.body);
    res.send(product);
  }
);

productRouter.delete(
  "/delete-product:id",
  deleteProductImage,
  async (req, res) => {
    const id = req.params.id;
    const product = await deleteProduct(id);
    res.send(product);
  }
);

module.exports = productRouter;
