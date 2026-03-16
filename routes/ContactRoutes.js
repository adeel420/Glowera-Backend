const express = require("express");
const { create, all, remove } = require("../controllers/contactController");
const router = express.Router();

router.post("/", create);
router.get("/", all);
router.delete("/:id", remove);

module.exports = router;
