const mongoose = require('mongoose');

const likeSchema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user' }, // Tham chiếu đến người dùng
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'product' }, // Tham chiếu đến sản phẩm
  createdAt: { type: Date, default: Date.now } // Thời điểm người dùng thực hiện "like"
});

const Like = mongoose.model('Like', LikeSchema);

module.exports = {Like,likeSchema};
