const cloudinary = require("cloudinary").v2;
const { Product } = require("../models/product.model");

const deleteProductImage = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (!product.file) {
      return res.status(400).json({ message: "Product has no image" });
    }

    // Lấy public ID từ đường dẫn ảnh
    const publicId = product.file.split("/").pop().split(".")[0];

    // Xóa ảnh từ Cloudinary
    await cloudinary.uploader.destroy(publicId);

    // Cập nhật đường dẫn ảnh trong cơ sở dữ liệu thành null
    product.file = null;
    await product.save();

    res.status(200).json({ message: "Product image deleted", product });
  } catch (err) {
    console.error("Error deleting product image:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = deleteProductImage;
