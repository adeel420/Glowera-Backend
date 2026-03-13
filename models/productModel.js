const mongoose = require("mongoose");
const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    exactPrice: {
      type: Number,
      required: true,
    },
    discountPrice: {
      type: Number,
    },
    discountPercentage: {
      type: Number,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    colors: [
      {
        name: {
          type: String,
          required: true,
        },
        hexCode: {
          type: String,
          required: true,
        },
      },
    ],
    images: [
      {
        type: String,
      },
    ],
    stock: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true },
);

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
