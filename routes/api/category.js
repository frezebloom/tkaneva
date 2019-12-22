const express = require("express");
const router = express.Router();

const categoryController = require("../../controllers/api/categoryController");
const tokenMiddleware = require("../../middlewares/token");

router.get(
  "/category/get",
  (req, res, next) => tokenMiddleware.checkToken(req, res, next),
  (req, res) => categoryController.get(req, res)
);

router.post(
  "/category/create",
  (req, res, next) => tokenMiddleware.checkToken(req, res, next),
  (req, res) => categoryController.create(req, res)
);

router.put(
  "/category/update",
  (req, res, next) => tokenMiddleware.checkToken(req, res, next),
  (req, res) => categoryController.update(req, res)
);

router.post(
  "/category/delete",
  (req, res, next) => tokenMiddleware.checkToken(req, res, next),
  (req, res) => categoryController.delete(req, res)
);

module.exports = router;
