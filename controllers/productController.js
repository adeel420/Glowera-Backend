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
      colors,
      stock,
    } = req.body;

    if (
      !title ||
      !subtitle ||
      !description ||
      !exactPrice ||
      !category ||
      stock === undefined
    ) {
      return res
        .status(400)
        .json({ error: "All required fields must be provided" });
    }

    const categoryExists = await Category.findById(category);
    if (!categoryExists) {
      return res.status(404).json({ error: "Category not found" });
    }

    let images = [];
    if (req.files && req.files.length > 0) {
      images = req.files.map((file) => file.path);
    }

    const parsedColors = colors ? JSON.parse(colors) : [];

    const product = new Product({
      title,
      subtitle,
      description,
      exactPrice,
      discountPrice: discountPrice || 0,
      discountPercentage: discountPercentage || 0,
      category,
      colors: parsedColors,
      images,
      stock,
    });

    const response = await product.save();
    const populatedProduct = await response.populate("category");
    res
      .status(201)
      .json({
        message: "Product created successfully",
        data: populatedProduct,
      });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message || "Internal server error" });
  }
};

exports.all = async (req, res) => {
  try {
    const response = await Product.find().populate("category");
    res
      .status(200)
      .json({ message: "Products fetched successfully", data: response });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message || "Internal server error" });
  }
};

exports.getById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: "Product ID is required" });
    }
    const response = await Product.findById(id).populate("category");
    if (!response) {
      return res.status(404).json({ error: "Product not found" });
    }
    res
      .status(200)
      .json({ message: "Product fetched successfully", data: response });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message || "Internal server error" });
  }
};

exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: "Product ID is required" });
    }

    const data = req.body;

    if (req.files && req.files.length > 0) {
      data.images = req.files.map((file) => file.path);
    }

    if (data.colors && typeof data.colors === "string") {
      data.colors = JSON.parse(data.colors);
    }

    const updatedProduct = await Product.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    }).populate("category");

    if (!updatedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    res
      .status(200)
      .json({ message: "Product updated successfully", data: updatedProduct });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message || "Internal server error" });
  }
};

exports.deleted = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: "Product ID is required" });
    }
    const response = await Product.findByIdAndDelete(id);
    if (!response) {
      return res.status(404).json({ error: "Product not found" });
    }
    res
      .status(200)
      .json({ message: "Product deleted successfully", data: response });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message || "Internal server error" });
  }
};

exports.getByCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    if (!categoryId) {
      return res.status(400).json({ error: "Category ID is required" });
    }
    const response = await Product.find({ category: categoryId }).populate(
      "category",
    );
    res
      .status(200)
      .json({ message: "Products fetched successfully", data: response });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message || "Internal server error" });
  }
};

exports.getByColor = async (req, res) => {
  try {
    const { colorName } = req.params;
    if (!colorName) {
      return res.status(400).json({ error: "Color name is required" });
    }
    const response = await Product.find({
      "colors.name": { $regex: colorName, $options: "i" },
    }).populate("category");
    res
      .status(200)
      .json({ message: "Products fetched successfully", data: response });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message || "Internal server error" });
  }
};
