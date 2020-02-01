const express = require("express");
const router = express.Router();

const uploadController = require("../../controllers/api/uploadController");

router.post(
  "/upload/image",
  (req, res, next) => uploadController.upload(req, res, next)
  // (req, res) => uploadController.rename(req, res)
  // (req, res) => uploadController.resize(req, res)
);

module.exports = router;
