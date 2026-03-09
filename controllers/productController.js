const Category = require("../models/categoryModel");
const Product = require("../models/productModel");

exports.create = async (req, res) => {
  try {
    const {
      title,
      subtitle,
      description,
      exactPrice,
      discountPrice,
      discountPercentage,
      category,
      stock,
    } = req.body;

    const categoryId = await Category.findById(category);

    let images = [];
    if (req.file) {
      images = req.file.path;
    }

    const products = new Product({
      title,
      subtitle,
      description,
      exactPrice,
      discountPrice,
      discountPercentage,
      category: categoryId,
      images,
      stock,
    });

    const response = await products.save();
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.all = async (req, res) => {
  try {
    const response = await Product.find().populate("category");
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getById = async (req, res) => {
  try {
    const { id } = req.params.id;
    const response = await Product.findById(id).populate("category");
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.update = async (req, res) => {
  try {
    const { id } = req.params.id;
    const data = req.body;
    if (req.file) {
      data.images = req.file.path;
    }
    const updatedProduct = await Product.findByIdAndUpdate(id, data, {
      new: true,
    });
    const response = await updatedProduct.save();
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.deleted = async (req, res) => {
  try {
    const { id } = req.params.id;
    const response = await Product.findByIdAndDelete(id);
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
};
