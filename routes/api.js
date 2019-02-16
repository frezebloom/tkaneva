const express = require("express");
const router = express.Router();

const userController = require("../controllers/api/userController.js");

router.post("/user/create", (req, res) => {
  userController.create(req, res);
});

router.get("/users/get", (req, res) => {
  userController.get(req, res);
});
module.exports = router;
