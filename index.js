const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 3002;
const cors = require("cors");
app.use(express.json());
const dotenv = require("dotenv");
const userRouter = require("./controllers/user.controller");
app.use(cors);
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
dotenv.config();
app.listen(port, () => {
  console.log("connect to server");
});
