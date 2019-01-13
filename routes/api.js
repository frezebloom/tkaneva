const express = require("express");
const router = express.Router();

const userController = require("../controllers/api/userController.js");

router.post("/api", (req, res) => {
  userController.render(req, res);
});

module.exports = router;
