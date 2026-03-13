const express = require("express");
const {
  create,
  all,
  getById,
  update,
  deleted,
  getByCategory,
  getByColor,
} = require("../controllers/productController");
const router = express.Router();
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");
const { jwtAuthMiddleware } = require("../middleware/jwt");
const adminAuthMiddleware = require("../middleware/adminAuth");

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "glowera-products",
    allowed_formats: ["jpg", "jpeg", "png"],
  },
});

const upload = multer({ storage: storage });

// Specific routes first
router.get("/category/:categoryId", getByCategory);
router.get("/color/:colorName", getByColor);

// General routes
router.post("/", upload.array("images", 5), create);
router.get("/", all);
router.get("/:id", getById);
router.put("/:id", upload.array("images", 5), update);
router.delete("/:id", deleted);

module.exports = router;
