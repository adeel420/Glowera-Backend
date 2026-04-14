const express = require("express");
const router = express.Router();
const { create, getByUser, getAll, updateStatus, remove } = require("../controllers/orderController");
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "glowera-payment-proofs",
        allowed_formats: ["jpg", "jpeg", "png", "pdf"],
    },
});

const upload = multer({ storage: storage });

router.post("/", create);
router.post("/upload-payment-proof", upload.single("file"), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
    }
    res.status(200).json({ url: req.file.path });
});
router.get("/user/:userId", getByUser);
router.get("/all", getAll);
router.put("/status", updateStatus);
router.delete("/", remove);

module.exports = router;
