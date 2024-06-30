const { Product } = require("../models/product.model");

const createProduct = async (product) => {
  const {
    name,
    price,
    size,
    category_id,
    categoryDetail_id,
    brand,
    description,
    file,
    additionalImages,
    publicId,
    color,
    sizeOfString,
    sizeOfNumber,
    internalMemory,
    material,
  } = product;
  const newProduct = await Product.create({
    name,
    price,
    size,
    category_id,
    categoryDetail_id,
    brand,
    description,
    file,
    additionalImages,
    publicId,
    color,
    sizeOfString,
    sizeOfNumber,
    internalMemory,
    material,
  });
  console.log(newProduct);
  return newProduct;
};

const getAllProduct = async () => {
  const product = await Product.find().lean();
  return product;
};

const getProductById = async (id) => {
  const product = await Product.findById(id).lean();
  return product;
};

const updateProduct = async (id, body) => {
  const {
    name,
    price,
    size,
    category_id,
    categoryDetail_id,
    brand,
    description,
    file,
    additionalImages,
    publicId,
    color,
    sizeOfString,
    sizeOfNumber,
    internalMemory,
    material,
  } = body;
  const product = await Product.findByIdAndUpdate(
    id,
    {
        name,
        price,
        size,
        category_id,
        categoryDetail_id,
        brand,
        description,
        file,
        additionalImages,
        publicId,
        color,
        sizeOfString,
        sizeOfNumber,
        internalMemory,
        material,
    },
    { new: true }
  );
  await product.save();
  return product;
};

const deleteProduct = async (id) => {
  const product = await Product.findByIdAndDelete(id);
  await product.save();
  return product;
};

module.exports = {
  createProduct,
  getAllProduct,
  updateProduct,
  deleteProduct,
  getProductById,
};
