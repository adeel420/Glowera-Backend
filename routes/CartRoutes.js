const express = require("express");
const {
  create,
  getById,
  update,
  deleteProduct,
  clearCart,
} = require("../controllers/cartController");
const router = express.Router();

router.post("/", create);
router.get("/:userId", getById);
router.put("/", update);
router.delete("/", deleteProduct);
router.post("/clear", clearCart);

module.exports = router;
