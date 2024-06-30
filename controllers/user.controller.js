const express = require("express");
const {
  createUser,
  getAllUser,
  updateUser,
  deleteUser,
  loginUser,
} = require("../services/user.service");
const { userMiddleware, authUser, authPassword, authAdmin } = require("../middleware/user.middleware");
const { User } = require("../models/user.model");
const { createProfile } = require("../services/profile.service");
const userRouter = express.Router();

userRouter.post('/create-user', async (req, res) => {
  console.log("here");
  console.log("🚀 ~ userRouter.post ~ req:", req.body);
  const user = await createUser(req.body);
  res.send(user);
});

userRouter.get("/", async (req, res) => {
  const user = await getAllUser();
  res.send(user);
});

userRouter.put("/update-user/:id", userMiddleware, async (req, res) => {
  const id = req.params.id;
  const user = await updateUser(id, req.body);
  res.send(user);
});

userRouter.put("/password-user/:id", userMiddleware, authPassword, async (req, res) => {
  const id = req.params.id;
  const user = await updateUser(id, req.body);
  res.send(user);
});

userRouter.delete("/delete-user:id", userMiddleware, async (req, res) => {
  const id = req.params.id;
  const user = await deleteUser(id);
  res.send(user);
});


userRouter.post("/login",authUser,authPassword, async (req, res) => {
  // get username and password from request
  const token=await loginUser(req.body);
  console.log("🚀 ~ userRouter.post ~ token:", token)
  // find user from database
   res.send(token);
  // create payload
  // create token
  // return token to client
  // if user not exists
});

userRouter.post("/login-admin",authUser,authAdmin,authPassword, async (req, res) => {
  // get username and password from request
  const token=await loginUser(req.body);
  // find user from database
  res.send(token);
  // create payload
  // create token
  // return token to client
  // if user not exists
});

module.exports = userRouter;
