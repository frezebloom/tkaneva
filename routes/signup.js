const express = require("express");
const router = express.Router();

const signupController = require("../controllers/signupController.js");

router.post("/signup", (req, res) => {
  signupController.signup(req, res);
});

router.post("/token", (req, res) => {
  signupController.token(req, res);
});

module.exports = router;
