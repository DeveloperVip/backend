const bcrypt = require("bcrypt");
const { User } = require("../models/user.model");
const jwt = require("jsonwebtoken");
const { createProfile } = require("./profile.service");

//create user
const createUser = async (user) => {
  console.log("🚀 ~ createUser ~ user:", user);
  const { fullName, userName, place, password, email, phone } = user;
  const originalPlace = [];
  await originalPlace.push(place);
  const hashPassword = await bcrypt.hash(password, 14);
  console.log("🚀 ~ createUser ~ hashPassword:", hashPassword);
  const newUser = await User.create({
    fullName,
    userName,
    place: originalPlace,
    password: hashPassword,
    email,
    phone,
    isAdmin: false,
  });
  console.log("🚀 ~ createUser ~ newUser:", newUser);
  const profile = await createProfile(newUser._id);
  profile.save();
  return newUser;
};

//get user
const getAllUser = async () => {
  const user = await User.find().lean();
  return user;
};

//get user by id
const getUserById = async (id) => {
  const user = await User.findById(id).lean();
  return user;
};

//update user
const updateUser = async (id, body) => {
  const { fullName, place, newPassword, email, phone } = body;

  // Tìm người dùng cần cập nhật
  const user = await User.findById(id);

  // Cập nhật các trường không phải là mảng place
  if (fullName !== undefined) user.fullName = fullName;

  if (newPassword !== undefined) {
    const hashnewPassword = await bcrypt.hash(newPassword, 14);
    user.password = hashnewPassword;
  }
  if (email !== undefined) user.email = email;
  if (phone !== undefined) user.phone = phone;

  // Cập nhật mảng place nếu có
  if (place) {
    const { add, remove } = place;
    if (add) {
      add.forEach(async (p) => await addPlaceToUser(id, p));
    }
    if (remove) {
      remove.forEach(async (p) => await removePlaceFromUser(id, p));
    }
  }

  await user.save();
  return user;
};

const addPlaceToUser = async (userId, newPlace) => {
  const user = await User.findByIdAndUpdate(
    userId,
    { $addToSet: { place: newPlace } }, // Sử dụng $addToSet để thêm place nếu nó chưa tồn tại
    { new: true }
  );
  return user;
};
const removePlaceFromUser = async (userId, placeToRemove) => {
  const user = await User.findByIdAndUpdate(
    userId,
    { $pull: { place: placeToRemove } }, // Sử dụng $pull để xóa place
    { new: true }
  );
  return user;
};
//delete user
const deleteUser = async (id) => {
  const user = await User.findByIdAndDelete(id);
  await user.save();
  return user;
};

const loginUser = async (user) => {
  const payLoad = {
    userName: user.userName,
    fullName: user.fullName,
    place: user.place,
    email: user.email,
    phone: user.phone,
    isAdmin: user.isAdmin,
  };

  const token = jwt.sign(payLoad, "hunghoang", { expiresIn: "1h" });
  return token;
};

module.exports = {
  createUser,
  getAllUser,
  updateUser,
  deleteUser,
  loginUser,
};
