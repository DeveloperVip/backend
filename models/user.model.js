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
  place: {
    type: String,
    require: true,
  },
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
});

const User = mongoose.model("user", userSchema);
module.exports = {User,userSchema};
