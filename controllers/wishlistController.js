const Product = require("../models/productModel");
const User = require("../models/userModel");
const Wishlist = require("../models/wishlistModel");

exports.create = async (req, res) => {
  try {
    const { user, products } = req.body;
    const userId = await User.findById(user);
    if (!userId) {
      return res.status(400).json({ error: "user not found" });
    }
    const productId = await Product.findById(products);
    if (!productId) {
      return res.status(400).json({ error: "product not found" });
    }
    const response = await Wishlist({
      user: userId,
      products: productId,
    });
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.all = async (req, res) => {
  try {
    const response = await Wishlist.find()
      .populate("user")
      .populate("products");
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.deleted = async (req, res) => {
  try {
    const { id } = req.params.id;
    const response = await Wishlist.findByIdAndDelete(id);
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
};
