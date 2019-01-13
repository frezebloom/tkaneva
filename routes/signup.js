const express = require("express");
const router = express.Router();

const signupController = require("../controllers/signupController.js");

router.get("/signup", (req, res) => {
  signupController.render(req, res);
});

module.exports = router;
