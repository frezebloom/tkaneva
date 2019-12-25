const express = require("express");
const router = express.Router();

const productController = require("../../controllers/api/productController");
const tokenMiddleware = require("../../middlewares/token");

router.get("/product/get", (req, res) => {
  productController.get(req, res);
});

router.post(
  "/product/create",
  (req, res, next) => tokenMiddleware.checkToken(req, res, next),
  (req, res) => productController.create(req, res)
);

router.put(
  "/product/update",
  (req, res, next) => tokenMiddleware.checkToken(req, res, next),
  (req, res) => productController.update(req, res)
);

router.post(
  "/product/delete",
  (req, res, next) => tokenMiddleware.checkToken(req, res, next),
  (req, res) => productController.delete(req, res)
);

module.exports = router;
