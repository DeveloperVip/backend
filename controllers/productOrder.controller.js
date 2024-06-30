const express = require("express");
const { User } = require("../models/user.model");
const { Product } = require("../models/product.model.js");
const { userMiddleware } = require("../middleware/user.middleware.js");
const { loginUser } = require("../services/user.service.js");
const {
  createProductOrder,
  updateProductOrder,
  getProductOrderById,
  deleteProductOrder,
} = require("../services/order/productOrder.service.js");
const productOrderRouter = express.Router();

productOrderRouter.post(
  "/create",
  userMiddleware,
  async (req, res) => {
    const userId = req.user.userId;
    console.log("🚀 ~ userId:", req.body)
    const productId = req.body.productId;
    console.log("🚀 ~ productId:", productId)
    try {
      // Tìm user và product theo ID
      const user = await User.findById(userId);
      const product = await Product.findById(productId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      // Tạo mới ProductOrder
      const productOrder = await createProductOrder({
        user: userId,
        product: productId,
        quantity: req.body.quantity,
        price: req.body.price,
        order: req.body.order
      });
      // Lưu vào database
      await productOrder.save();
      return res.status(201).json(productOrder);
    } catch (error) {
      console.error("Error creating product order:", error);
      return res.status(500).json({ message: "Server error" });
    }
  }
);

productOrderRouter.put(
  "/update",
  userMiddleware,
  async (req, res) => {
    console.log("update");
    const userId = req.user.userId;
    console.log("🚀 ~ userId:", req.body)
    try {
      // Tạo mới ProductOrder
      const productOrder = await updateProductOrder({
        id:req?.body?._id,
        data:req?.body
      });
      // Lưu vào database
      return res.status(201).json(productOrder);
    } catch (error) {
      console.error("Error creating product order:", error);
      return res.status(500).json({ message: "Server error" });
    }
  }
);

productOrderRouter.delete(
  "/delete/:productOrderId",
  async (req, res) => {
    console.log("delete");
    const id = req.params.productOrderId
    const orderId = req.body.orderId
    try {
      // Tạo mới ProductOrder
      const productOrder = await deleteProductOrder({id:id,orderId:orderId})
      // Lưu vào database
      return res.status(201).json(productOrder);
    } catch (error) {
      console.error("Error creating product order:", error);
      return res.status(500).json({ message: "Server error" });
    }
  }
);

productOrderRouter.get(
  "/get-product-order-by-id/:id",
  async (req, res) => {
    console.log("getitem");
    const id = req.params.id
    console.log("🚀 ~ userId:", req.params.id)
    try {
      // Tạo mới ProductOrder
      const productOrder = await getProductOrderById(id)
      // Lưu vào database
      return res.status(201).json(productOrder);
    } catch (error) {
      console.error("Error creating product order:", error);
      return res.status(500).json({ message: "Server error" });
    }
  }
);

module.exports = productOrderRouter;
