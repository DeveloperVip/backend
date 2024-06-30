const cloudinary = require("cloudinary").v2;
const { Product } = require("../models/product.model");

const updateProductImage = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const { newImageUrl } = req.body;

    // Cập nhật đường dẫn ảnh mới trong cơ sở dữ liệu
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      { file: newImageUrl },
      { new: true }
    );
    
    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product image updated", product: updatedProduct });
  } catch (err) {
    console.error("Error updating product image:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = updateProductImage;
