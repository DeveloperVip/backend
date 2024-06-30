const mongoose = require("mongoose");
const commentSchema = mongoose.Schema({
  comment: { type: String },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
});

const Comment = mongoose.model("comment", commentSchema);
module.exports = { Comment, commentSchema };
