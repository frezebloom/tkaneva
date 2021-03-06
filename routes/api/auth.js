const express = require("express");
const router = express.Router();

const authController = require("../../controllers/api/authController");

router.post("/auth/signup", (req, res) => {
  authController.signup(req, res);
});

router.post("/auth/refresh-token", (req, res) => {
  authController.refreshToken(req, res);
});

module.exports = router;
