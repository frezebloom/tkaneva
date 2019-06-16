const express = require("express");
const router = express.Router();

const userController = require("../controllers/api/userController.js");
const userGroupController = require("../controllers/api/userGroupController.js");

router.get("/users/get", (req, res) => {
  userController.get(req, res);
});

router.post("/user/create", (req, res) => {
  userController.create(req, res);
});

router.put("/user/update", (req, res) => {
  userController.update(req, res);
});

router.post("/user/delete", (req, res) => {
  userController.delete(req, res);
});

router.post("/user-group/create", (req, res) => {
  userGroupController.create(req, res);
});

module.exports = router;
