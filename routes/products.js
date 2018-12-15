const express = require("express");
const router = express.Router();

const products = require("../controllers/productsController.js");

router.get("/", (req, res) => {
  products.render(req, res);
});

module.exports = router;
