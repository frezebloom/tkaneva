const express = require("express");
const router = express.Router();

const authController = require("../controllers/api/authController.js");

router.post("/auth/signup", (req, res) => {
  authController.signup(req, res);
});

router.post("/auth/refresh-tokens", (req, res) => {
  authController.refreshToken(req, res);
});

module.exports = router;
