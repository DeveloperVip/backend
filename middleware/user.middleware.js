const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models/user.model");
const userMiddleware = async (req, res, next) => {
  const authorizationHeader = await req.headers.authorization;
  if (!authorizationHeader) {
    return res.status(401).json({ message: "Authorization header is missing" });
  }

  const token = authorizationHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Token is missing" });
  }
  try {
    const payload = jwt.verify(token, "hunghoang");
    console.log("🚀 ~ userMiddleware ~ payload:", payload)
    if (payload) {
      const select = await User.findOne({userName:payload.userName}).exec();
      console.log("🚀 ~ userMiddleware ~ select:", select)

      req.user = { ...payload, userId: select._id,password : select.password };
      return next();
    } else return res.status(401).json({ message: "token invalid" });
  } catch (error) {
    return res.status(404).json({ message: "transmission error" });
  }
};

const authPassword = async (req, res, next) => {
  const { password } = req.body;
  console.log("🚀 ~ authPassword ~ req.body:", req.body)
  const passwordCorrect = await bcrypt.compare(password, req.user.password);
  console.log("🚀 ~ authPassword ~ passwordCorrect:", passwordCorrect)
  if (passwordCorrect) next();
  else return res.status(400).json({ message: "password is incorrect" });
};

const authUser = async (req, res, next) => {
  const { userName } = req.body;
  const user = await User.findOne({ userName }).exec();
  console.log(user);
  if (user) {
    req.user = { password: user.password, isAdmin: user.isAdmin };
    next();
  } else return res.status(400).json({ message: "User does not exist" });
};

const authAdmin = async (req, res, next) => {
  const { isAdmin } = req.user;
  if (isAdmin) {
    // Kiểm tra xem có admin nào khác trong hệ thống hay không
    next(); // Nếu có nhiều hơn một admin, cho phép tiếp tục
  } else {
    return res.status(401).json({ message: "Admin does not exist" });
  }
};

module.exports = { userMiddleware, authUser, authPassword, authAdmin };
