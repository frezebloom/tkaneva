const express = require("express");
const router = express.Router();

const brandController = require("../../controllers/api/brandController");

router.get("/brand/get", (req, res) => {
  brandController.get(req, res);
});

router.post("/brand/create", (req, res) => {
  brandController.create(req, res);
});

router.put("/brand/update", (req, res) => {
  brandController.update(req, res);
});

router.post("/brand/delete", (req, res) => {
  brandController.delete(req, res);
});

module.exports = router;
