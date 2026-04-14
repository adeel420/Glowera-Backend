const Order = require("../models/orderModel");
const transporter = require("../config/nodemailer");
const { Order_Confirmation_User_Template, Order_Confirmation_Admin_Template, Order_Status_Update_Template } = require("../emailTemplate");

exports.create = async (req, res) => {
  try {
    const { user, products, billing, paymentMethod, paymentProof, totalAmount } = req.body;

    if (!user || !products?.length || !billing || !paymentMethod || !totalAmount) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const order = new Order({ user, products, billing, paymentMethod, paymentProof, totalAmount });
    await order.save();
    await order.populate("products.product");

    // Email to customer
    try {
      await transporter.sendMail({
        from: process.env.ADMIN_EMAIL,
        to: billing.email,
        subject: "Order Confirmed - Glowera ✅",
        html: Order_Confirmation_User_Template
          .replace(/{name}/g, `${billing.firstName} ${billing.lastName}`)
          .replace(/{orderId}/g, order._id.toString())
          .replace(/{paymentMethod}/g, paymentMethod === "cod" ? "Cash on Delivery" : "Online Payment")
          .replace(/{totalAmount}/g, totalAmount)
          .replace(/{address}/g, `${billing.address}, ${billing.city}`)
          .replace(/{date}/g, new Date().toLocaleDateString("en-PK", { dateStyle: "long" })),
      });
    } catch (mailErr) {
      console.error("Error sending confirmation email to customer:", mailErr);
    }

    // Email to admin
    try {
      await transporter.sendMail({
        from: process.env.ADMIN_EMAIL,
        to: process.env.ADMIN_EMAIL,
        subject: "New Order Received - Glowera 🛍️",
        html: Order_Confirmation_Admin_Template
          .replace(/{name}/g, `${billing.firstName} ${billing.lastName}`)
          .replace(/{email}/g, billing.email)
          .replace(/{phone}/g, billing.phone)
          .replace(/{orderId}/g, order._id.toString())
          .replace(/{paymentMethod}/g, paymentMethod === "cod" ? "Cash on Delivery" : "Online Payment")
          .replace(/{totalAmount}/g, totalAmount)
          .replace(/{address}/g, `${billing.address}, ${billing.city}`)
          .replace(/{date}/g, new Date().toLocaleDateString("en-PK", { dateStyle: "long" })),
      });
    } catch (mailErr) {
      console.error("Error sending confirmation email to admin:", mailErr);
    }

    res.status(201).json({ message: "Order placed successfully", data: order });
  } catch (err) {
    console.error("Order Creation Error:", err);
    res.status(500).json({ error: err.message || "Internal server error" });
  }
};

exports.getByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const orders = await Order.find({ user: userId }).populate("products.product").sort({ createdAt: -1 });
    res.status(200).json({ data: orders });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getAll = async (req, res) => {
  try {
    const orders = await Order.find().populate("products.product").populate("user", "name email").sort({ createdAt: -1 });
    res.status(200).json({ data: orders });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;

    const order = await Order.findByIdAndUpdate(orderId, { status }, { new: true }).populate("products.product");
    if (!order) return res.status(404).json({ error: "Order not found" });

    // Email to customer on status update
    await transporter.sendMail({
      from: process.env.ADMIN_EMAIL,
      to: order.billing.email,
      subject: `Order Update - ${status.charAt(0).toUpperCase() + status.slice(1)} | Glowera`,
      html: Order_Status_Update_Template
        .replace(/{name}/g, `${order.billing.firstName} ${order.billing.lastName}`)
        .replace(/{orderId}/g, order._id.toString())
        .replace(/{status}/g, status.charAt(0).toUpperCase() + status.slice(1))
        .replace(/{date}/g, new Date().toLocaleDateString("en-PK", { dateStyle: "long" })),
    });

    res.status(200).json({ message: "Order status updated", data: order });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.remove = async (req, res) => {
  try {
    const { orderId } = req.body;
    await Order.findByIdAndDelete(orderId);
    res.status(200).json({ message: "Order deleted" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
};
