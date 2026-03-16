const Wishlist = require("../models/wishlistModel");

exports.create = async (req, res) => {
  try {
    const { user, products } = req.body;

    if (!user || !products?.length) {
      return res.status(400).json({ error: "User and product are required" });
    }

    let wishlist = await Wishlist.findOne({ user });

    if (wishlist) {
      const productId = products[0].product;
      const exists = wishlist.products.find(
        (p) => p.product.toString() === productId
      );
      if (!exists) {
        wishlist.products.push({ product: productId });
        await wishlist.save();
      }
    } else {
      wishlist = new Wishlist({ user, products });
      await wishlist.save();
    }

    await wishlist.populate("products.product");
    res.status(200).json({ message: "Added to wishlist", data: wishlist });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const wishlist = await Wishlist.findOne({ user: userId }).populate("products.product");
    res.status(200).json({ data: wishlist });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.remove = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    const wishlist = await Wishlist.findOne({ user: userId });
    if (!wishlist) return res.status(404).json({ error: "Wishlist not found" });

    wishlist.products = wishlist.products.filter(
      (p) => p.product.toString() !== productId
    );
    await wishlist.save();
    await wishlist.populate("products.product");

    res.status(200).json({ message: "Removed from wishlist", data: wishlist });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
};
