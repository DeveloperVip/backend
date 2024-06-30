const Profile = require("../models/profile.model");

// Service để tạo mới profile của người dùng
const createProfile = async (userId) => {
  try {
    console.log(userId);
    const newProfile = await Profile.create({ userId: userId });
    console.log("🚀 ~ createProfile ~ newProfile:", newProfile);
    return newProfile;
  } catch (error) {
    console.error("Error creating profile:", error);
    throw error;
  }
};

// Service để lấy thông tin profile của người dùng
const getProfile = async (userId) => {
  try {
    const profile = await Profile.findOne({ userId })
      .populate("userId")
      .populate("Orders")
    return profile;
  } catch (error) {
    console.error("Error fetching profile:", error);
    throw error;
  }
};

// Service để cập nhật profile của người dùng
const updateProfile = async (id, updateData) => {
  try {
    const updatedProfile = await Profile.findByIdAndUpdate({ id }, updateData, {
      new: true,
    });
    return updatedProfile;
  } catch (error) {
    console.error("Error updating profile:", error);
    throw error;
  }
};

//update data cart user
const updateOrdersUser = async (userId, data) => {
  console.log("🚀 ~ updateOrdersUser ~ data:", data);
  try {
    const profile = await Profile.findOneAndUpdate(
      { userId },
      {
        $addToSet: {
          likedProductsId: data.likedProductsId,
          Orders: data.Orders,
        },
      },
      { new: true }
    );
    return profile;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
// Service để xóa profile của người dùng
const deleteProfile = async (userId) => {
  try {
    const deletedProfile = await Profile.findOneAndDelete({ userId });
    return deletedProfile;
  } catch (error) {
    console.error("Error deleting profile:", error);
    throw error;
  }
};

module.exports = {
  createProfile,
  getProfile,
  updateProfile,
  deleteProfile,
  updateOrdersUser,
};
