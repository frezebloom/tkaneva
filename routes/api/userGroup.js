const express = require("express");
const router = express.Router();

const userGroupController = require("../../controllers/api/userGroupController");
const tokenMiddleware = require("../../middlewares/token");

router.get(
  "/user-group/get",
  (req, res, next) => tokenMiddleware.checkToken(req, res, next),
  (req, res) => userGroupController.get(req, res)
);

router.post(
  "/user-group/create",
  (req, res, next) => tokenMiddleware.checkToken(req, res, next),
  (req, res) => userGroupController.create(req, res)
);

router.put(
  "/user-group/update",
  (req, res, next) => tokenMiddleware.checkToken(req, res, next),
  (req, res) => userGroupController.update(req, res)
);

router.post(
  "/user-group/delete",
  (req, res, next) => tokenMiddleware.checkToken(req, res, next),
  (req, res) => userGroupController.delete(req, res)
);

module.exports = router;
