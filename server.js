const express = require("express");
const app = express();
const bodyParser = require("body-parser");
require("dotenv").config();
const db = require("./db");
const passport = require("./middleware/auth");
const cors = require("cors");

// Routes
const userRoutes = require("./routes/UserRoutes");
const categoryRoutes = require("./routes/CategoryRoutes");
const productRoutes = require("./routes/ProductRoutes");
const wishlistRoutes = require("./routes/WishlistRoutes");
const cartRoutes = require("./routes/CartRoutes");
const contactRoutes = require("./routes/ContactRoutes");
const newsLetterRoutes = require("./routes/NewsLetterRoutes");
const accountRoutes = require("./routes/AccountRoutes");

// Packages
app.use(cors());
const PORT = process.env.PORT || 8080;
app.use(bodyParser.json());
app.use(passport.initialize());
const authMiddleware = passport.authenticate("local", { session: false });

// Routes
app.use("/api/user", userRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/newsletter", newsLetterRoutes);
app.use("/api/account", accountRoutes);

app.listen(PORT, () => {
  console.log(`Listening the port ${PORT}`);
});
