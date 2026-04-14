const Cart = require("../models/cartModel");

exports.create = async (req, res) => {
  try {
    const { user, products } = req.body;

    if (!user || !products) {
      return res.status(400).json({ message: "User and products are required" });
    }

    let cart = await Cart.findOne({ user });

    if (cart) {
      products.forEach((newProduct) => {
        // Same product + same color = quantity badhao, warna naya item add karo
        const existingProduct = cart.products.find(
          (p) =>
            p.product.toString() === newProduct.product.toString() &&
            p.color?.name === newProduct.color?.name
        );

        if (existingProduct) {
          existingProduct.quantity += newProduct.quantity || 1;
        } else {
          cart.products.push({
            product: newProduct.product,
            quantity: newProduct.quantity || 1,
            color: newProduct.color,
          });
        }
      });

      await cart.save();
      await cart.populate("products.product");

      return res.status(200).json({ message: "Cart updated successfully", cart });
    }

    cart = new Cart({ user, products });
    await cart.save();
    await cart.populate("products.product");

    res.status(201).json({ message: "Cart created successfully", cart });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getById = async (req, res) => {
  try {
    const { userId } = req.params;

    const cart = await Cart.findOne({ user: userId })
      .populate("products.product")
      .populate("user");

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    res.status(200).json(cart);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// itemId (_id of cart.products subdocument) se update karo
exports.update = async (req, res) => {
  try {
    const { cartId, itemId, quantity } = req.body;

    const cart = await Cart.findById(cartId);

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const item = cart.products.id(itemId);

    if (!item) {
      return res.status(404).json({ message: "Item not in cart" });
    }

    item.quantity = quantity;

    await cart.save();
    await cart.populate("products.product");

    res.status(200).json({ message: "Cart updated successfully", cart });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// itemId se delete karo
exports.deleteProduct = async (req, res) => {
  try {
    const { cartId, itemId } = req.body;

    const cart = await Cart.findById(cartId);

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.products = cart.products.filter(
      (p) => p._id.toString() !== itemId
    );

    await cart.save();
    await cart.populate("products.product");

    res.status(200).json({ message: "Product removed from cart", cart });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Order confirm hone par cart empty karo
exports.clearCart = async (req, res) => {
  try {
    const { userId } = req.body;

    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.products = [];
    await cart.save();

    res.status(200).json({ message: "Cart cleared successfully", cart });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
};
