const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 8000;
const cors = require("cors");
app.use(express.json());
const dotenv = require("dotenv");
const userRouter = require("./controllers/user.controller");
const productRouter = require("./controllers/product.controller");
const fileRouter = require("./controllers/uploadFile.controller");
const productOrderRouter = require("./controllers/productOrder.controller");
const orderRouter = require("./controllers/order.controller");
const profileRouter = require("./controllers/profile.controller");

app.use(cors());
mongoose
  .connect(
    "mongodb+srv://h1403lovea0711:14032003@cluster0.jqrbnu2.mongodb.net/"
  )
  .then(() => {
    console.log("mongodb is connect");
  })
  .catch((error) => {
    console.log("error:", error);
  });
app.use("/user", userRouter);
app.use("/product", productRouter);
app.use("/upload", fileRouter);
app.use('/profile',profileRouter)
app.use("/product-order",productOrderRouter);
app.use("/order",orderRouter)
dotenv.config();
// Route để xử lý tải lên file ảnh

app.listen(port, () => {
  console.log("connect to server");
});
