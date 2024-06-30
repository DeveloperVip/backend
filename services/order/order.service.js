const Order = require("../../models/order/order.model");
const mongoose = require("mongoose");
// const ProductOrder = require("../../models/order/productOrder.model");
// const { Product } = require("../../models/product.model");
// const Profile = require("../../models/profile.model");
const { updateOrdersUser } = require("../profile.service");
const ObjectId = mongoose.Types.ObjectId;

// Tạo một đơn hàng mới
const createOrder = async (userId, productOrders, address) => {
  console.log("🚀 ~ createOrder ~ address:", address);
  console.log("🚀 ~ createOrder ~ productOrders:", productOrders);

  // Tìm đơn hàng hiện tại của người dùng
  const order = await Order.findOne({ userId, status: "pending" })
    .populate("productOrders")
    .exec();
  console.log("🚀 ~ createOrder ~ order:", order);
  if (!order) {
    console.log("true");
    // Nếu không có đơn hàng nào đang chờ, tạo đơn hàng mới
    const newOrder = new Order({
      userId,
      status: "pending",
      totalPrice: Number(0),
      address: address,
      productOrders: [],
    });
    await newOrder.save();
    const OrderId = newOrder._id;
    console.log("🚀 ~ createOrder ~ OrderId:", OrderId);
    await updateOrdersUser(userId, { Orders: OrderId });
    return newOrder;
  } else {
    await Promise.all(
      productOrders.map(async (po) => {
        order.productOrders.push(po.productOrderId);
        console.log(
          "🚀 ~ productOrders.map ~ po.productOrderId:",
          po.productOrderId
        );
      })
    );
    await order.save();
    const orderNew = await Order.findOne({ userId, status: "pending" })
      .populate("productOrders")
      .exec();
    console.log("🚀 ~ createOrder ~ order này:", orderNew);

    // Cập nhật tổng giá của đơn hàng
    orderNew.totalPrice = Number(
      orderNew?.productOrders.reduce((sum, po) => {
        console.log(po);
        return sum + Number(po.price);
      }, 0)
    );
    console.log("🚀 ~ createOrder ~ orderNew.totalPrice:", orderNew.totalPrice);
    // Lưu đơn hàng
    await orderNew.save();
    const OrderId = orderNew._id;
    console.log("🚀 ~ createOrder ~ OrderId:", OrderId);
    await updateOrdersUser(userId, { Orders: OrderId });
    return orderNew;
  }
};

//Tạo một đơn hàng mới sau khi thanh toán xong
const createOrderNew = async (userId, address,status) => {
  const order = await Order.findOne({ userId, status: "pending" })
    .populate("productOrders")
    .exec();
  console.log("🚀 ~ createOrder ~ order:", order);
  if (!order) {
    console.log("true");
    // Nếu không có đơn hàng nào đang chờ, tạo đơn hàng mới
    const newOrder = new Order({
      userId,
      status: status,
      totalPrice: Number(0),
      address: address,
      productOrders: [],
    });
    await newOrder.save();
    const OrderId = newOrder._id;
    console.log("🚀 ~ createOrder ~ OrderId:", OrderId);
    await updateOrdersUser(userId, { Orders: OrderId });
    return newOrder;
  }
};

// Lấy thông tin đơn hàng theo ID
const getOrderById = async (orderId) => {
  return Order.findById(orderId).populate("productOrders").exec();
};

// Lấy tất cả đơn hàng của một người dùng
const getOrdersByUserId = async (userId) => {
  const basket = await Order.find({ userId }).populate("productOrders").exec();
  return basket;
};

// Cập nhật trạng thái đơn hàng
const updateOrderStatus = async (orderId) => {
  const order = await Order.findById(orderId).populate("productOrders");
  console.log("🚀 ~ updateOrderStatus ~ order:", order);
  if (!order) {
    throw new Error("Order not found");
  }
  const totalPrice = order.productOrders.reduce((sum, item) => {
    console.log("item", item.price);
    return sum + Number(item.price);
  }, 0);
  console.log("🚀 ~ totalPrice ~ totalPrice:", totalPrice);
  order.totalPrice = totalPrice;
  order.updatedAt = Date.now();
  await order.save();
  return order;
};

//Update info order
const UpdateInfoOrder = async (orderId, data) => {
  const { deliveryDate, address } = data;
  if (address) {
    const order = await Order.findByIdAndUpdate(
      orderId,
      { deliveryDate, address },
      { new: true }
    );
    await order.save();
    return order;
  } else {
    const order = await Order.findByIdAndUpdate(
      orderId,
      { deliveryDate },
      { new: true }
    );
    await order.save();
    return order;
  }
};

//update status delivery
const UpdateStatusDelivery = async (orderId, status) => {
  const order = await Order.findByIdAndUpdate(
    orderId,
    { status },
    { new: true }
  );
  console.log("🚀 ~ updateOrderStatus ~ order:", order);
  await order.save();
  return order;
};

// Hủy đơn hàng
const cancelOrder = async (orderId) => {
  return updateOrderStatus(orderId, "canceled");
};

module.exports = {
  createOrder,
  getOrderById,
  getOrdersByUserId,
  updateOrderStatus,
  UpdateInfoOrder,
  UpdateStatusDelivery,
  createOrderNew,
  cancelOrder,
};
