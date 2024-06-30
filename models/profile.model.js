const mongoose = require("mongoose")
const ProfileSchema = new  mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user' }, // Tham chiếu đến người dùng
    likedProductsId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Like' }], // Danh sách các sản phẩm đã thích
    Orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }], // Danh sách các đơn hàng 
  });
  
  const Profile = mongoose.model('profile', ProfileSchema);
  
  module.exports = Profile;