const express = require("express");
const { create, all, remove } = require("../controllers/newsLetterController");
const router = express.Router();

router.post("/", create);
router.get("/", all);
router.delete("/", remove);

module.exports = router;
