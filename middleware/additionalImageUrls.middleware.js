const upload = require("../CloudinaryConfig");
const cloudinary = require("cloudinary").v2;

// Middleware upload ảnh lên Cloudinary
const uploadAddImageToCloudinary = (req, res, next) => {
    const uploads = upload.single("file");
    uploads(req, res, async (error) => {
      if (error) {
        return res.status(500).json({ message: "Failed to upload image" });
      }
  
      const additionalImageUrls = [];
      try {
        for (const file of req.body.additionalImages) {
          const result = await cloudinary.uploader.upload(file);
          additionalImageUrls.push(result.secure_url);
          console.log(
            "🚀 ~ cloudinary.uploader.upload ~ result.secure_url:",
            result.secure_url
          );
        }
  
        req.body.additionalImages = additionalImageUrls;
        next();
      } catch (err) {
        console.error(err);
        return res
          .status(500)
          .json({ message: "Failed to upload image to Cloudinary" });
      }
    });
  };
  
  module.exports = uploadAddImageToCloudinary;
  
