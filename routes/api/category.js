const express = require("express");
const router = express.Router();

const categoryController = require("../../controllers/api/categoryController");

router.get("/category/get", (req, res) => {
  categoryController.get(req, res);
});

router.post("/category/create", (req, res) => {
  categoryController.create(req, res);
});

router.put("/category/update", (req, res) => {
  categoryController.update(req, res);
});

router.post("/category/delete", (req, res) => {
  categoryController.delete(req, res);
});

module.exports = router;
