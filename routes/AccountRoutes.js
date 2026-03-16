const express = require("express");
const { get, save } = require("../controllers/accountController");
const router = express.Router();

router.get("/", get);
router.post("/", save);

module.exports = router;
