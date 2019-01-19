const express = require("express");
const jwt = require("jsonwebtoken");

const router = express.Router();

const signupController = require("../controllers/signupController.js");

router.post("/signup", (req, res) => {
  let { email, password } = req.body;
  //This lookup would normally be done using a database
  if (email === "paul@nanosoft.co.za") {
    if (password === "pass") {
      //the password compare would normally be done using bcrypt.
      const opts = {};
      opts.expiresIn = 30; //token expires in 2min
      const secret = "BURGER"; //normally stored in process.env.secret
      const token = jwt.sign({ email }, secret, opts);
      return res.status(200).json({
        message: "Auth Passed",
        token
      });
    }
  }
  return res.status(401).json({ message: "Auth Failed" });
});

module.exports = router;
