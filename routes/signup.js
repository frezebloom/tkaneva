const express = require("express");
const router = express.Router();

const signup = require("../controllers/signupController.js");

router.get("/signup", (req, res) => {
  signup.render(req, res);
});

module.exports = router;
