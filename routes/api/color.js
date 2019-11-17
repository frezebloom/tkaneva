const express = require("express");
const router = express.Router();

const colorController = require("../../controllers/api/colorController");

router.get("/color/get", (req, res) => {
  colorController.get(req, res);
});

router.post("/color/create", (req, res) => {
  colorController.create(req, res);
});

router.put("/color/update", (req, res) => {
  colorController.update(req, res);
});

router.post("/color/delete", (req, res) => {
  colorController.delete(req, res);
});

module.exports = router;
