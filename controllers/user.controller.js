const express = require("express");
const {
  createUser,
  getAllUser,
  updateUser,
  deleteUser,
} = require("../services/user.service");
const { userMiddleware } = require("../middleware/user.middleware");
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

userRouter.put("/update-user:id", userMiddleware, async (req, res) => {
  const id = req.params.id;
  const user = await updateUser(id, req.body);
  res.send(user);
});

userRouter.delete("/delete-user:id", userMiddleware, async (req, res) => {
  const id = req.params.id;
  const user = await deleteUser(id);
  res.send(user);
});

module.exports = userRouter;
