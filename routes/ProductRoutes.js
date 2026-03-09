const express = require("express");
const {
  create,
  all,
  getById,
  update,
  deleted,
} = require("../controllers/productController");
const router = express.Router();
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "chat-app-images",
    allowed_formats: ["jpg", "jpeg", "png"],
  },
});

const upload = multer({ storage: storage });

router.post("/", upload.single("images", 4), create);
router.get("/", all);
router.get("/:id", getById);
router.put("/:id", upload.single("images", 4), update);
router.delete("/:id", deleted);

module.exports = router;
