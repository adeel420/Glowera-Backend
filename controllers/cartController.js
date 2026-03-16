const Cart = require("../models/cartModel");

exports.create = async (req, res) => {
  try {
    const { user, products } = req.body;

    if (!user || !products) {
      return res
        .status(400)
        .json({ message: "User and products are required" });
    }

    // check if cart already exists
    let cart = await Cart.findOne({ user });

    if (cart) {
      products.forEach((newProduct) => {
        const existingProduct = cart.products.find(
          (p) => p.product.toString() === newProduct.product.toString(),
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

      return res.status(200).json({
        message: "Cart updated successfully",
        cart,
      });
    }

    cart = new Cart({
      user,
      products,
    });

    await cart.save();

    res.status(201).json({
      message: "Cart created successfully",
      cart,
    });
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

exports.update = async (req, res) => {
  try {
    const { cartId, productId, quantity } = req.body;

    const cart = await Cart.findById(cartId);

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const product = cart.products.find(
      (p) => p.product.toString() === productId,
    );

    if (!product) {
      return res.status(404).json({ message: "Product not in cart" });
    }

    product.quantity = quantity;

    await cart.save();
    await cart.populate("products.product");

    res.status(200).json({
      message: "Cart updated successfully",
      cart,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const { cartId, productId } = req.body;

    const cart = await Cart.findById(cartId);

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.products = cart.products.filter(
      (p) => p.product.toString() !== productId,
    );

    await cart.save();
    await cart.populate("products.product");

    res.status(200).json({
      message: "Product removed from cart",
      cart,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
};
