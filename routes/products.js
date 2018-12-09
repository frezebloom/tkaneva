const products = require("../controllers/products.js");
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  products.render(req, res);
});

module.exports = router;
