const express = require("express");
const router = express.Router();

const productsController = require("../controllers/productsController.js");

router.get("/", (req, res) => {
  productsController.render(req, res);
});

module.exports = router;
