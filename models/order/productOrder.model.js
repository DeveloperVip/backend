const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Định nghĩa schema cho sản phẩm trong đơn hàng
const ProductOrderSchema = new Schema({
  user: {type: Schema.Types.ObjectId, ref: 'user' },
  productId: { type: Schema.Types.ObjectId, ref: 'product' }, // Tham chiếu đến sản phẩm
  quantity: { type: Number, default: 1 }, // Số lượng sản phẩm, mặc định là 1
  price:{type:Number,require:true},
  order: {type: Schema.Types.ObjectId, ref: 'order'}
});

const ProductOrder = mongoose.model('ProductOrder', ProductOrderSchema);

module.exports = ProductOrder;
