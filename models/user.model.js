const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  fullName: {
    require: true,
    type: String,
  },
  userName: {
    require: true,
    type: String,
  },
  place: [{
    type: String,
    require: true,
  }],
  password: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  phone: {
    type: Number,
    require: true,
  },
  isAdmin: {
    type: Boolean,
  },
  profileId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"profile"
  }
});

const User = mongoose.model("user", userSchema);
module.exports = { User, userSchema };
