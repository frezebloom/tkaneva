const express = require("express");
const router = express.Router();

const userController = require("../../controllers/api/userController");
const tokenMiddleware = require("../../middlewares/token");

router.get(
  "/user/get",
  (req, res, next) => tokenMiddleware.checkToken(req, res, next),
  (req, res) => userController.get(req, res)
);

router.post(
  "/user/create",
  (req, res, next) => tokenMiddleware.checkToken(req, res, next),
  (req, res) => userController.create(req, res)
);

router.put(
  "/user/update",
  (req, res, next) => tokenMiddleware.checkToken(req, res, next),
  (req, res) => userController.update(req, res)
);

router.post(
  "/user/delete",
  (req, res, next) => tokenMiddleware.checkToken(req, res, next),
  (req, res) => userController.delete(req, res)
);

module.exports = router;
