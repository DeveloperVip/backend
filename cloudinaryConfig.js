const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;

// Cấu hình Cloudinary
cloudinary.config({
  cloud_name: 'drmeotcu7', 
  api_key: '274666934972348', 
  api_secret: 'KxPCa-zWgtiJ0XTYiSXvyBNZGeE' 
});

// Cấu hình CloudinaryStorage cho Multer
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "uploads", // Thư mục trên Cloudinary để lưu trữ tệp
    allowed_formats: ["jpg", "jpeg", "png", "gif"], // Định dạng tệp cho phép
    public_id: (req, file) => "computer-filename-using-request", // Định danh public_id của tệp
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
