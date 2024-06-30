const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
  name: { require: true, type: String },
  price: { type: Number, require: true },
  file: {type:String,require:true},
  additionalImages: [String],
  color:{type: mongoose.Schema.Types.Mixed,require:true},
  sizeOfString:{type:String},
  sizeOfNumber:{type:Number},
  internalMemory:{type:String},
  material:{type:String},
  publicId:{type:String},
  size: { type: Number, require: true },
  category_id: { type: String, require: true },
  categoryDetail_id: { type: String, require: true },
  brand:{type:String,require:true},
  description: { type: String, require: true },
  commentId: [{ type:mongoose.Schema.Types.ObjectId,
    ref:"comment"   
   },]
});

const Product = mongoose.model("product", productSchema);
module.exports = { Product, productSchema };
