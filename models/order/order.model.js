const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'canceled','onTheWay'],
    default: 'pending',
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
    default: 0,
  },
  productOrders: [{
    type: Schema.Types.ObjectId,
    ref: 'ProductOrder',
  }],
  address: {
    type:String,
    default: "",
  },
  deliveryDate: {
    type:Date,
    default: Date.now,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;
