const upload = require("../CloudinaryConfig");
const cloudinary = require("cloudinary").v2;

// Middleware upload ảnh lên Cloudinary
const uploadImageToCloudinary = (req, res, next) => {
  // Sử dụng Multer với cấu hình storage đã được định nghĩa
  const uploads = upload.single("file");
  console.log("req.body",req.body);
  uploads(req, res, (err) => {
    if (err) {
      return res.status(500).json({ message: "Failed to upload image" });
    }
    // Nếu không có lỗi, thực hiện upload ảnh lên Cloudinary
    cloudinary.uploader.upload(req.body.file, (error, result) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ message: "Failed to upload image to Cloudinary" });
      }
      // Log req sau khi file đã được upload
      // console.log(req);
      // Nếu upload thành công, lấy đường dẫn và public_id của ảnh từ kết quả và gán vào req để sử dụng sau này
      req.body.file = result.secure_url;
      req.body.publicId = result.public_id;
      next(); // Chuyển tiếp sang middleware hoặc controller tiếp theo
    });
  });
};

module.exports = uploadImageToCloudinary;
