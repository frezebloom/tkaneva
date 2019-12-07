const express = require("express");
const router = express.Router();

const superUserController = require("../../controllers/api/superUserController");

router.post("/superuser/user/create", (req, res) => {
  superUserController.createSuperUser(req, res);
});

router.post("/superuser/user-group/create", (req, res) => {
  superUserController.createSuperUserGroup(req, res);
});

module.exports = router;
