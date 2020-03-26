const express = require("express");
const router = express.Router();

const brandController = require("../../controllers/api/brandController");
const tokenMiddleware = require("../../middlewares/token");

router.get(
  "/brand/get",
  (req, res, next) => tokenMiddleware.checkToken(req, res, next),
  (req, res) => brandController.get(req, res)
);

router.post(
  "/brand/create",
  (req, res, next) => tokenMiddleware.checkToken(req, res, next),
  (req, res) => brandController.create(req, res)
);

router.put(
  "/brand/update",
  (req, res, next) => tokenMiddleware.checkToken(req, res, next),
  (req, res) => brandController.update(req, res)
);

router.post(
  "/brand/delete",
  (req, res, next) => tokenMiddleware.checkToken(req, res, next),
  (req, res) => brandController.delete(req, res)
);

module.exports = router;
