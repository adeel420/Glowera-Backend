const express = require("express");
const { create, all, deleted } = require("../controllers/wishlistController");
const router = express.Router();

router.post("/", create);
router.get("/", all);
router.get("/:id", deleted);

module.exports = router;
