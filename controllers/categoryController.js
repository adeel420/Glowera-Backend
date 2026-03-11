const Category = require("../models/categoryModel");

exports.create = async (req, res) => {
  try {
    const { name } = req.body;
    let image = "";

    if (req.file) {
      image = req.file.path;
    }
    const category = new Category({ name, image });
    const response = await category.save();
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.all = async (req, res) => {
  try {
    const response = await Category.find();
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getById = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await Category.findById(id);
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    if (req.file) data.image = req.file.path;
    const response = await Category.findByIdAndUpdate(id, data, { new: true });
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.deleted = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await Category.findByIdAndDelete(id);
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
};
