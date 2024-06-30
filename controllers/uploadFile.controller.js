const express = require('express');
const upload = require('../CloudinaryConfig');
const { Product } = require('../models/product.model');
const fileRouter = express.Router();

// Định nghĩa route để upload file
fileRouter.post('/upload', upload.single('file'), async (req, res) => {
  try {
    // Lấy URL của file đã upload trên Cloudinary từ đối tượng req.file
    const imageURL = req.file.path;
    
    // Tạo một sản phẩm mới với thông tin từ request body và đường dẫn của file ảnh
    const newProduct = new Product({
        name: req.body.name,
        description: req.body.description,
        imageURL: imageURL
      });
  
      // Lưu sản phẩm vào cơ sở dữ liệu
      const savedProduct = await newProduct.save();
      
      // Trả về phản hồi cho client
      res.status(200).json({ message: 'Product created successfully', product: savedProduct });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to upload file to Cloudinary' });
  }
});

module.exports = fileRouter;
