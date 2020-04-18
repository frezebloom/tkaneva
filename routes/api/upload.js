const express = require("express");
const router = express.Router();

const uploadController = require("../../controllers/api/uploadController");

router.get("/upload/get", (req, res) => {
  uploadController.get(req, res);
});

router.post("/upload/image", (req, res, next) =>
  uploadController.upload(req, res, next)
);

module.exports = router;
