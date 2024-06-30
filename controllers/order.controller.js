const express = require("express");
const { userMiddleware } = require("../middleware/user.middleware");
const {
  createOrder,
  getOrderById,
  getOrdersByUserId,
  updateOrderStatus,
  cancelOrder,
  UpdateInfoOrder,
  UpdateStatusDelivery,
  createOrderNew,
} = require("../services/order/order.service");
const { User } = require("../models/user.model");

const orderRouter = express.Router();

// Tạo một đơn hàng mới
orderRouter.post("/create", userMiddleware, async (req, res) => {
  console.log("here", req.body);
  try {
    const { productOrders } = req.body || [];
    const userId = req.user.userId;
    const user =await User.findById(userId);
    const address = user?.place[0] || null;
    const order = await createOrder(userId, productOrders, address);
    return res.status(201).json(order);
  } catch (error) {
    console.error("Error creating order:", error);
    return res.status(500).json({ message: "Server error" });
  }
});

// Tạo một đơn hàng mới sau khi thanh toán xong
orderRouter.post("/create-new-order", userMiddleware, async (req, res) => {
  try {console.log("🚀 ~ orderRouter.post ~ req.body:", req.body)
    const {status} = req.body
    
    const userId = req.user.userId;
    const user = await User.findById(userId);
    console.log("🚀 ~ orderRouter.post ~ user:", user)
    const address = user?.place[0] || null;
    const order = await createOrderNew(userId, address,status);
    return res.status(201).json(order);
  } catch (error) {
    console.error("Error creating order:", error);
    return res.status(500).json({ message: "Server error" });
  }
});

// Lấy tất cả đơn hàng của một người dùng
orderRouter.get("/getOrder", userMiddleware, async (req, res) => {
  console.log("noooheree");
  try {
    const orders = await getOrdersByUserId(req.user.userId);
    console.log("🚀 ~ orderRouter.get ~ req.user.userId:", req.user.userId);
    return res.status(200).json(orders);
  } catch (error) {
    console.error("Error getting orders:", error);
    return res.status(500).json({ message: "Server error" });
  }
});

// Cập nhật trạng thái đơn hàng
orderRouter.put("/update/:orderId", async (req, res) => {
  try {
    const order = await updateOrderStatus(req.params.orderId);
    return res.status(200).json(order);
  } catch (error) {
    console.error("Error updating order status:", error);
    return res.status(500).json({ message: "Server error" });
  }
});

// Cập nhật trạng thái giao đơn hàng
orderRouter.put("/update-status-delivery/:orderId", async (req, res) => {
  try {
    const {status} = req.body
    console.log("🚀 ~ orderRouter.put ~ req.body:", req)
    const order = await UpdateStatusDelivery(req.params.orderId,status);
    return res.status(200).json(order);
  } catch (error) {
    console.error("Error updating order status:", error);
    return res.status(500).json({ message: "Server error" });
  }
});

//cập nhập thông tin đơn hàng
orderRouter.put("/updateInfoOrder/:orderId", async (req, res) => {
  try {
    const data = req.body;
    console.log("🚀 ~ orderRouter.put ~ data:", data);
    const order = await UpdateInfoOrder(req.params.orderId, data);
    return res.status(200).json(order);
  } catch (error) {
    console.error("Error updating order status:", error);
    return res.status(500).json({ message: "Server error" });
  }
});

// Hủy đơn hàng
orderRouter.delete("/delete/:orderId", async (req, res) => {
  try {
    const order = await cancelOrder(req.params.orderId);
    return res.status(200).json(order);
  } catch (error) {
    console.error("Error canceling order:", error);
    return res.status(500).json({ message: "Server error" });
  }
});

module.exports = orderRouter;
