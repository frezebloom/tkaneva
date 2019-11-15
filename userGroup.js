const express = require("express");
const router = express.Router();

const userGroupController = require("../../controllers/api/userGroupController.js");

router.get("/user-group/get", (req, res) => {
  userGroupController.get(req, res);
});

router.post("/user-group/create", (req, res) => {
  userGroupController.create(req, res);
});

router.put("/user-group/update", (req, res) => {
  userGroupController.update(req, res);
});

router.post("/user-group/delete", (req, res) => {
  userGroupController.delete(req, res);
});

module.exports = router;
