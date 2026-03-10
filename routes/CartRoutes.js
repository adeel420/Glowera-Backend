const express = require("express");
const {
  create,
  getById,
  update,
  deleteProduct,
} = require("../controllers/cartController");
const router = express.Router();

router.post("/", create);
router.get("/:userId", getById);
router.put("/", update);
router.delete("/", deleteProduct);

module.exports = router;
