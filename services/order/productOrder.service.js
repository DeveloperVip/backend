const Order = require("../../models/order/order.model");
const mongoose = require('mongoose');
const ProductOrder = require("../../models/order/productOrder.model");
const { updateOrderStatus } = require("./order.service");
const { ObjectId } = mongoose.Types;

const createProductOrder = async (productOrder) => {
  const { user, product, quantity, price, order } = productOrder;
  const newProductOrder = await ProductOrder.create({
    user,
    productId: product,
    quantity,
    price,
    order,
  });
  console.log("🚀 ~ createProductOrder ~ newProductOrder:", newProductOrder)
  return newProductOrder;
};

const getProductOrder = async () => {
  const productOrder = await ProductOrder.find().lean();
  return productOrder;
};

const getProductOrderById = async (id) => {
  const productOrder = await ProductOrder.findById(id)
    .populate("productId")
    .lean();
  return productOrder;
};

const updateProductOrder = async ({ id, data }) => {
  console.log("🚀 ~ updateProductOrder ~ data:", data);
  const { price, quantity } = data;
  const productOrder = await ProductOrder.findByIdAndUpdate(id, {
    price,
    quantity,
  }).lean();
  console.log("🚀 ~ updateProductOrder ~ productOrder:", productOrder);
  return productOrder;
};

const deleteProductOrder = async ({ id, orderId }) => {
  console.log("🚀 ~ updateProductOrder ~ data:", id);
  const _id = new ObjectId(id)
  const productOrder = await ProductOrder.findByIdAndDelete(id).lean();
  const order = await Order.findById(orderId);
  console.log("🚀 ~ deleteProductOrder ~ order:", order)
  // Xóa productOrderId khỏi mảng productOrders
  order.productOrders = order.productOrders.filter((po) => {
    console.log(po._id.equals(_id));
    console.log("🚀 ~ deleteProductOrder ~ po.toString():", po._id);
    return !po._id.equals(_id);
  });
  console.log(
    "🚀 ~ deleteProductOrder ~ order.productOrders:",
    order.productOrders
  );

  await order.save();
  const recalculation = await updateOrderStatus(orderId);
  recalculation.save();
  console.log("🚀 ~ updateProductOrder ~ productOrder:", productOrder);
  return productOrder;
};

module.exports = {
  deleteProductOrder,
  getProductOrderById,
  updateProductOrder,
  createProductOrder,
  getProductOrder,
};
