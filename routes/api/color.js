const express = require("express");
const router = express.Router();

const colorController = require("../../controllers/api/colorController");
const tokenMiddleware = require("../../middlewares/token");

router.get(
  "/color/get",
  (req, res, next) => tokenMiddleware.checkToken(req, res, next),
  (req, res) => colorController.get(req, res)
);

router.post(
  "/color/create",
  (req, res, next) => tokenMiddleware.checkToken(req, res, next),
  (req, res) => colorController.create(req, res)
);

router.put(
  "/color/update",
  (req, res, next) => tokenMiddleware.checkToken(req, res, next),
  (req, res) => colorController.update(req, res)
);

router.post(
  "/color/delete",
  (req, res, next) => tokenMiddleware.checkToken(req, res, next),
  (req, res) => colorController.delete(req, res)
);

module.exports = router;
