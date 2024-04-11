const bcrypt = require("bcrypt");
const { User } = require("../models/user.model");

//create user
const createUser = async (user) => {
  const { fullName, userName, place, password, email, phone } = user;
  const hashPassword = await bcrypt.hash(password, 14);
  const newUser = await User.create({
    fullName,
    userName,
    place,
    password: hashPassword,
    email,
    phone,
  });
  return newUser;
};

//get user
const getAllUser = async () => {
  const user = await User.find().lean();
  return user;
};

//update user
const updateUser = async (id, body) => {
  const { fullName, place, password, email, phone } = body;
  const user = await User.findByIdAndUpdate(
    id,
    {
      fullName,
      place,
      password,
      email,
      phone,
    },
    {
      new: true,
    }
  );
  await user.save();
  return user;
};

//delete user
const deleteUser = async (id) => {
  const user = await User.findByIdAndDelete(id);
  await user.save();
  return user;
};

module.exports = {
    createUser,
    getAllUser,
    updateUser,
    deleteUser
};
