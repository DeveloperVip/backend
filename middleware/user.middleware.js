const express = require("express");
const jwt = require("jsonwebtoken");
const { User } = require("../models/user.model");
const userMiddleware = async (req, res, next) => {
  const request = req.header.authorization;
  console.log("🚀 ~ userMiddleware ~ request:", request);
  const token = request.split(" ")[1];
  try {
    const payload = jwt.verify(token, "hunghoang");
    console.log("🚀 ~ userMiddleware ~ payload:", payload);
    if (test) {
      const select = User.findOne(payload).exec();
      (req.user = { ...payload, userId: select.userId }), next();
    } else return res.status(401).json({ message: "token invalid" });
  } catch (error) {
    return res.status(404).json({message:"transmission error"});
  }
};
module.exports={userMiddleware}
